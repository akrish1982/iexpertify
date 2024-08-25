import os
from bs4 import BeautifulSoup, Comment

def simplify_html_content(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove existing <style> and <script> tags, comments, and other unwanted tags
    for element in soup(['style', 'script', 'header', 'footer', 'nav', 'aside', 'form', 'button', 'svg']):
        element.decompose()
    
    # Remove all comments
    comments = soup.findAll(string=lambda text: isinstance(text, Comment))
    for comment in comments:
        comment.extract()
    
    # Keep only essential tags: <h1>, <h2>, <h3>, <p>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <ul>, <ol>, <li>
    for tag in soup.find_all(True):
        if tag.name not in ['h1', 'h2', 'h3', 'p', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'ul', 'ol', 'li', 'a']:
            tag.unwrap()  # Replace the tag with its content
        # Ensure <html> and <head> tags exist
    if not soup.html:
        soup.insert(0, soup.new_tag('html'))
    if not soup.head:
        soup.html.insert(0, soup.new_tag('head'))
    # Add link to the external CSS file in <head>
    link_tag = soup.new_tag('link', rel='stylesheet', href='/css/styles.css')
    soup.head.append(link_tag)
    
    # Clean up body attributes
    if soup.body:
        soup.body.attrs = {}
    
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
                    modified_content = simplify_html_content(html_content)
                    
                    # Write the modified content back to the file
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(modified_content)
                    
                    print(f"Processed: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
                    raise

if __name__ == "__main__":
    root_folder = input("Enter the path of the root folder: ")
    process_html_files(root_folder)
    print("Transformation completed!")
