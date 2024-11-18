import os
from pathlib import Path
from anthropic import Anthropic
import anthropic
import html.parser
import re
from bs4 import BeautifulSoup
import time
import logging
from datetime import datetime
import backoff
import json

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('seo_updater.log'),
        logging.StreamHandler()
    ]
)

class HTMLContentUpdater:
    def __init__(self, api_key, repo_path, max_retries=5, initial_wait=1):
        self.anthropic = Anthropic(api_key=api_key)
        self.repo_path = Path(repo_path)
        self.max_retries = max_retries
        self.initial_wait = initial_wait
        
        # Create progress tracking file
        self.progress_file = Path('update_progress.json')
        self.processed_files = self._load_progress()
    
    def _load_progress(self):
        """Load progress from previous runs"""
        if self.progress_file.exists():
            with open(self.progress_file, 'r') as f:
                return json.load(f)
        return []
    def _save_progress(self, file_path):
        """Save progress after processing each file"""
        self.processed_files.append(str(file_path))
        with open(self.progress_file, 'w') as f:
            json.dump(self.processed_files, f)

    @backoff.on_exception(
        backoff.expo,
        (anthropic.InternalServerError, anthropic.RateLimitError),
        max_tries=5,
        max_time=300
    )
    def get_html_files(self):
        """Returns all HTML files in the repository."""
        return list(self.repo_path.glob('**/*.html'))
    
    def extract_main_content(self, html_content):
        """Extract the main content from HTML, preserving important SEO elements."""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Store important SEO meta tags
        meta_tags = soup.find_all('meta')
        title_tag = soup.find('title')
        
        # Find the main content area (adjust selectors based on your HTML structure)
        main_content = soup.find('main') or soup.find('article') or soup.find('div', {'class': 'content'})
        
        return {
            'meta_tags': meta_tags,
            'title': title_tag,
            'main_content': main_content.get_text() if main_content else ''
        }
    def update_html_file(self, file_path, new_content):
        """Update the HTML file with new SEO content while preserving structure."""
        with open(file_path, 'r', encoding='utf-8') as f:
            original_html = f.read()
        
        soup = BeautifulSoup(original_html, 'html.parser')
        new_soup = BeautifulSoup(new_content, 'html.parser')
        
        # Update meta tags
        for meta in new_soup.find_all('meta'):
            if meta.get('name') in ['description', 'keywords']:
                existing_meta = soup.find('meta', {'name': meta.get('name')})
                if existing_meta:
                    existing_meta.replace_with(meta)
                else:
                    soup.head.append(meta)
        
        # Update title
        if new_soup.title:
            if soup.title:
                soup.title.string = new_soup.title.string
            else:
                soup.head.append(new_soup.title)
        
        # Update main content
        main_content = new_soup.find('main') or new_soup.find('article') or new_soup.find('div', {'class': 'content'})
        if main_content:
            target = soup.find('main') or soup.find('article') or soup.find('div', {'class': 'content'})
            if target:
                target.replace_with(main_content)
        
        # Backup original file
        backup_path = file_path.with_suffix('.html.backup')
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(original_html)
        
        # Write updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
    def generate_seo_content(self, original_content, page_url):
        """Generate SEO-optimized content using Claude with retry logic"""
        try:
            prompt = f"""
            Please rewrite the following content with improved SEO while maintaining the same meaning.
            Include appropriate HTML tags, meta descriptions, and title tags.
            Original content from {page_url}:
            
            {original_content}
            
            Please provide:
            1. An SEO-optimized title
            2. A meta description (150-160 characters)
            3. The main content with proper HTML structure and semantic tags
            4. Suggested header tags (h1, h2, etc.)
            5. Internal linking suggestions
            """
            
            response = self.anthropic.messages.create(
                model="claude-3-opus-20240229",
                max_tokens=4000,
                temperature=0.7,
                messages=[{"role": "user", "content": prompt}]
            )
            
            return response.content

        except anthropic.InternalServerError as e:
            logging.error(f"Server error when processing {page_url}: {str(e)}")
            raise
        except anthropic.RateLimitError as e:
            logging.error(f"Rate limit exceeded for {page_url}: {str(e)}")
            raise
        except Exception as e:
            logging.error(f"Unexpected error for {page_url}: {str(e)}")
            raise

    def process_all_files(self):
        """Process all HTML files in the repository with error handling"""
        html_files = self.get_html_files()
        total_files = len(html_files)
        processed = 0
        errors = []

        for file_path in html_files:
            if str(file_path) in self.processed_files:
                logging.info(f"Skipping already processed file: {file_path}")
                continue

            try:
                logging.info(f"Processing {file_path} ({processed + 1}/{total_files})")
                
                # Create backup first
                backup_path = self._create_backup(file_path)
                logging.info(f"Created backup at {backup_path}")
                
                # Read current content
                with open(file_path, 'r', encoding='utf-8') as f:
                    current_html = f.read()
                
                # Extract content and generate new SEO version
                content_parts = self.extract_main_content(current_html)
                new_content = self.generate_seo_content(content_parts['main_content'], str(file_path))
                
                # Update the file
                self.update_html_file(file_path, new_content)
                
                # Save progress
                self._save_progress(file_path)
                
                processed += 1
                logging.info(f"✓ Successfully updated {file_path}")
                
                # Adaptive rate limiting
                wait_time = self._calculate_wait_time(processed)
                time.sleep(wait_time)
                
            except Exception as e:
                error_msg = f"Error processing {file_path}: {str(e)}"
                logging.error(error_msg)
                errors.append(error_msg)
                
                # Try to restore from backup if something went wrong
                self._restore_from_backup(file_path)
                continue

        # Final summary
        self._generate_summary_report(total_files, processed, errors)

    def _create_backup(self, file_path):
        """Create a timestamped backup of the original file"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_path = file_path.with_suffix(f'.{timestamp}.backup')
        with open(file_path, 'r', encoding='utf-8') as source:
            with open(backup_path, 'w', encoding='utf-8') as target:
                target.write(source.read())
        return backup_path

    def _restore_from_backup(self, file_path):
        """Restore from the most recent backup if available"""
        backups = list(Path(file_path.parent).glob(f'{file_path.stem}*.backup'))
        if backups:
            most_recent = max(backups, key=os.path.getctime)
            with open(most_recent, 'r', encoding='utf-8') as source:
                with open(file_path, 'w', encoding='utf-8') as target:
                    target.write(source.read())
            logging.info(f"Restored {file_path} from backup {most_recent}")

    def _calculate_wait_time(self, processed_count):
        """Calculate adaptive wait time based on processing history"""
        base_wait = self.initial_wait
        if processed_count > 10:
            base_wait *= 1.5
        if processed_count > 20:
            base_wait *= 2
        return base_wait

    def _generate_summary_report(self, total, processed, errors):
        """Generate a summary report of the update process"""
        report = f"""
        SEO Update Summary Report
        ------------------------
        Total files: {total}
        Successfully processed: {processed}
        Failed: {len(errors)}
        
        Error Details:
        {chr(10).join(errors) if errors else "No errors occurred"}
        """
        
        with open('seo_update_report.txt', 'w') as f:
            f.write(report)
        
        logging.info(report)

# Example usage
if __name__ == "__main__":
    API_KEY = "ADD_KEY_HERE"
    REPO_PATH = "/Users/ananth/code/iexpertify/temp/temp-testing"
    
    updater = HTMLContentUpdater(API_KEY, REPO_PATH)
    updater.process_all_files()