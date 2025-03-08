import os
from urllib.parse import urlparse

def read_urls(file_path):
    """Reads URLs from a file and filters those starting with 'https://www.'"""
    with open(file_path, 'r') as file:
        urls = [line.strip() for line in file if line.strip().startswith("https://www.")]
    return urls

def check_local_file(url):
    """Checks if the corresponding index.html file exists for a given URL."""
    parsed_url = urlparse(url)
    local_path = parsed_url.path.strip('/')  # Remove leading and trailing slashes
    file_path = os.path.join(local_path, "index.html")
    return os.path.exists(file_path)

def main():
    url_file = "url_list.txt"
    urls = read_urls(url_file)
    
    for url in urls:
        if check_local_file(url):
            # print(f"Found: {url}")
            pass
        else:
            print(f"Not Found: {url}")

if __name__ == "__main__":
    main()
