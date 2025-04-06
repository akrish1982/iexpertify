#!/usr/bin/env python3
"""
Sitemap Generator

This script crawls a website directory containing HTML files and generates a sitemap.xml file
that can be submitted to search engines like Google and Bing.

Usage:
    python sitemap_generator.py --website_dir /path/to/website --base_url https://yourdomain.com
"""

import os
import argparse
from datetime import datetime
import re
from urllib.parse import urljoin
from xml.dom import minidom

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Generate a sitemap.xml file for a website.')
    parser.add_argument('--website_dir', required=True, help='Directory containing the website files')
    parser.add_argument('--base_url', required=True, help='Base URL of the website (e.g., https://example.com)')
    parser.add_argument('--output', default='sitemap.xml', help='Output filename (default: sitemap.xml)')
    parser.add_argument('--changefreq', default='weekly', 
                        choices=['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
                        help='Change frequency for the URLs (default: weekly)')
    parser.add_argument('--priority', default='0.8', type=float, 
                        help='Priority of the URLs (0.0 to 1.0, default: 0.8)')
    parser.add_argument('--exclude', default=None, help='Regex pattern to exclude paths')
    return parser.parse_args()

def get_last_modified(file_path):
    """Get the last modified date of a file in W3C format."""
    timestamp = os.path.getmtime(file_path)
    date = datetime.fromtimestamp(timestamp)
    return date.strftime('%Y-%m-%d')

def find_html_files(directory, exclude_pattern=None):
    """Find all HTML files in the given directory and its subdirectories."""
    html_files = []
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.html', '.htm')):
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, directory)
                
                # Skip files matching the exclude pattern
                if exclude_pattern and re.search(exclude_pattern, relative_path):
                    continue
                
                # Convert Windows backslashes to forward slashes for URLs
                relative_path = relative_path.replace('\\', '/')
                
                # Handle index.html files
                if file.lower() == 'index.html' or file.lower() == 'index.htm':
                    directory_path = os.path.dirname(relative_path)
                    if directory_path:
                        relative_path = directory_path + '/'
                    else:
                        relative_path = ''
                
                html_files.append({
                    'path': relative_path,
                    'lastmod': get_last_modified(file_path)
                })
    
    return html_files

def generate_sitemap(html_files, base_url, changefreq='weekly', priority=0.8):
    """Generate a sitemap XML document from the list of HTML files."""
    doc = minidom.getDOMImplementation().createDocument(None, 'urlset', None)
    root = doc.documentElement
    root.setAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    
    for file_info in html_files:
        url_element = doc.createElement('url')
        
        # Create and append loc element
        loc_element = doc.createElement('loc')
        url_path = file_info['path']
        full_url = urljoin(base_url, url_path)
        loc_text = doc.createTextNode(full_url)
        loc_element.appendChild(loc_text)
        url_element.appendChild(loc_element)
        
        # Create and append lastmod element
        lastmod_element = doc.createElement('lastmod')
        lastmod_text = doc.createTextNode(file_info['lastmod'])
        lastmod_element.appendChild(lastmod_text)
        url_element.appendChild(lastmod_element)
        
        # Create and append changefreq element
        changefreq_element = doc.createElement('changefreq')
        changefreq_text = doc.createTextNode(changefreq)
        changefreq_element.appendChild(changefreq_text)
        url_element.appendChild(changefreq_element)
        
        # Create and append priority element
        priority_element = doc.createElement('priority')
        priority_text = doc.createTextNode(str(priority))
        priority_element.appendChild(priority_text)
        url_element.appendChild(priority_element)
        
        # Append the url element to the root
        root.appendChild(url_element)
    
    return doc

def main():
    """Main function."""
    args = parse_arguments()
    
    # Find all HTML files
    html_files = find_html_files(args.website_dir, args.exclude)
    
    # Generate sitemap XML
    sitemap = generate_sitemap(html_files, args.base_url, args.changefreq, args.priority)
    
    # Write the sitemap to file
    with open(args.output, 'w', encoding='utf-8') as f:
        f.write(sitemap.toprettyxml(indent='  '))
    
    print(f"Sitemap generated with {len(html_files)} URLs and saved to {args.output}")
    print(f"You can now submit {args.output} to search engines like Google and Bing.")

if __name__ == '__main__':
    main()