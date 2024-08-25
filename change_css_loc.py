import os

def update_css_path(html_content, depth):
    # Calculate the relative path to the CSS file based on the depth
    # Adding one more "../" to the depth for correct path adjustment
    new_path = "../" * (depth + 1) + "simplecss/styles.css"
    
    # Replace the old CSS path with the new relative path
    updated_content = html_content.replace(
        '<link href="simplecss/styles.css" rel="stylesheet"/>',
        f'<link href="{new_path}" rel="stylesheet"/>'
    )
    
    return updated_content

def process_html_files_in_folder(root_folder):
    # Walk through the directory tree
    for foldername, subfolders, filenames in os.walk(root_folder):
        # Calculate the depth by counting the number of slashes in the folder path relative to the root
        relative_path = os.path.relpath(foldername, root_folder)
        depth = relative_path.count(os.sep)
        
        for filename in filenames:
            if filename.endswith('.html'):
                file_path = os.path.join(foldername, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        html_content = file.read()
                    
                    # Update the CSS path based on the folder depth
                    modified_content = update_css_path(html_content, depth)
                    
                    # Write the modified content back to the file
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(modified_content)
                    
                    print(f"Processed: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    root_folder = os.path.dirname(os.path.abspath(__file__))
    process_html_files_in_folder(root_folder)
    print("CSS path update completed!")
