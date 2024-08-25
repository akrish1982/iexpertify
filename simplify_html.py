import os
from bs4 import BeautifulSoup

def simplify_html_styles(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove existing <style> tags
    for style in soup.find_all('style'):
        style.decompose()
    
    # Add link to the external CSS file in <head>
    if soup.head:
        link_tag = soup.new_tag('link', rel='stylesheet', href='/simplecss/styles.css')
        soup.head.append(link_tag)
    else:
        head_tag = soup.new_tag('head')
        link_tag = soup.new_tag('link', rel='stylesheet', href='/simplecss/styles.css')
        head_tag.append(link_tag)
        soup.html.insert(0, head_tag)
    
    return str(soup)

def process_html_files(root_folder):
    for foldername, subfolders, filenames in os.walk(root_folder):
        for filename in filenames:
            if filename.endswith('.html'):
                file_path = os.path.join(foldername, filename)
                with open(file_path, 'r', encoding='utf-8') as file:
                    html_content = file.read()
                
                try:
                    # Simplify the HTML styles
                    modified_content = simplify_html_styles(html_content)
                    
                    # Write the modified content back to the file
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(modified_content)
                    
                    print(f"Processed: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    root_folder = input("Enter the path of the root folder: ")
    process_html_files(root_folder)
    print("Transformation completed!")
