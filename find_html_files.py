import os

def find_index_html_files(directory, output_file):
    """Find all index.html files in a directory and write their paths to a file."""
    try:
        with open(output_file, 'w') as file:
            for root, _, files in os.walk(directory):
                for filename in files:
                    if filename == "index.html":
                        file_path = os.path.join(root, filename)
                        file.write(file_path + '\n')
        print(f"List of index.html files written to {output_file}")
    except Exception as e:
        print(f"Error occurred: {e}")

# Specify the directory to search and the output file
directory_to_search = "/Users/ananth/code/iexpertify/"
output_file_path = "/Users/ananth/code/iexpertify/list_of_html_files.txt"

find_index_html_files(directory_to_search, output_file_path)
