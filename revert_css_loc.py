import os

def revert_css_and_icon_paths(html_content):
    # Replace all CSS paths with absolute paths
    updated_content = html_content.replace(
        '<link href="../../../../../../../../../simplecss/styles.css" rel="stylesheet"/>',
        '<link href="/simplecss/styles.css" rel="stylesheet"/>'
    )
    updated_content = updated_content.replace(
        '<link href="../simplecss/styles.css" rel="stylesheet"/>',
        '<link href="/simplecss/styles.css" rel="stylesheet"/>'
    )
    updated_content = updated_content.replace(
        '<link href="simplecss/styles.css" rel="stylesheet"/>',
        '<link href="/simplecss/styles.css" rel="stylesheet"/>'
    )
    
    # Replace all favicon paths with absolute paths
    updated_content = updated_content.replace(
        '<link rel="icon" type="image/x-icon" href="../../favicon.ico">',
        '<link rel="icon" type="image/x-icon" href="/favicon.ico">'
    )
    updated_content = updated_content.replace(
        '<link rel="icon" type="image/x-icon" href="../favicon.ico">',
        '<link rel="icon" type="image/x-icon" href="/favicon.ico">'
    )
    updated_content = updated_content.replace(
        '<link rel="icon" type="image/x-icon" href="favicon.ico">',
        '<link rel="icon" type="image/x-icon" href="/favicon.ico">'
    )
    
    return updated_content

def process_html_files_in_folder(root_folder):
    # Walk through the directory tree
    for foldername, subfolders, filenames in os.walk(root_folder):
        for filename in filenames:
            if filename.endswith('.html'):
                file_path = os.path.join(foldername, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        html_content = file.read()
                    
                    # Revert CSS and icon paths to absolute paths
                    modified_content = revert_css_and_icon_paths(html_content)
                    
                    # Write the modified content back to the file
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(modified_content)
                    
                    print(f"Processed: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    root_folder = os.path.dirname(os.path.abspath(__file__))
    process_html_files_in_folder(root_folder)
    print("CSS and icon path reversion completed!")
