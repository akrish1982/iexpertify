import os
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup, NavigableString, Tag

head = '''<html><head><link href="/simplecss/styles.css" rel="stylesheet"/>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3040480045347797" crossorigin="anonymous"></script>
<script src="https://topmate-embed.s3.ap-south-1.amazonaws.com/v1/topmate-embed.js" user-profile="https://topmate.io/embed/profile/ananth_tirumanur?theme=D5534D" btn-style='{"backgroundColor":"#000","color":"#fff","border":"1px solid #000"}' embed-version="v1" button-text="Let's Connect" position-right="30px" position-bottom="30px" custom-padding="0px" custom-font-size="16px" custom-font-weight="500" custom-width="200px" async defer></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VS67BGEQZW"></script>
<script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-VS67BGEQZW');</script>
</head><body><header><nav><ul><li><a href="https://www.iexpertify.com/">iExpertify</a></li><li><a href="https://www.iexpertify.com/free-utilities/">Free Utilities</a></li></ul></nav></header>'''

footer = '''<footer>
<h3>Meet Ananth Tirumanur. Hi there 👋</h3>
<h4>I work on projects in data science, big data, data engineering, data modeling, software engineering, and system design.</h4>
<ul>
    <li>👨‍💻 All of my projects are available at <a href="https://github.com/akrish1982">https://github.com/akrish1982</a></li>
    <li>💬 Ask me about <strong>Data engineering, SQL, Databases, Data pipelines, Data infrastructure</strong></li>
    <li>📄 My work history: <a href="https://www.linkedin.com/in/ananthtirumanur/">https://www.linkedin.com/in/ananthtirumanur/</a></li>
    <li>⚡ Fun fact: Marathoner & Casual Birding enthusiast</li>
</ul>
<h3>Connect with me:</h3>
<ul>
    <li>Twitter: <a href="https://twitter.com/akrish82">@akrish82</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/ananthtirumanur/">https://linkedin.com/in/ananthtirumanur/</a></li>
</ul>
<h3>My Resources:</h3>
<ul>
    <li>LinkedIn Newsletter: <a href="https://www.linkedin.com/newsletters/data-engineering-with-aws-7096111313352880128/">Data Engineering with AWS</a></li>
    <li>Udemy Course: <a href="https://www.udemy.com/course/aws-certified-data-engineer-associate-practice-test/learn/quiz/6218524#overview">AWS Certified Data Engineer Associate Practice Test</a></li>
    <li>Python Crash Course: <a href="https://akrish82.gumroad.com/l/python-crash-course">Python Crash Course on Gumroad</a></li>
</ul>
<h3>Languages and Tools:</h3>
<p>AWS, Bash, Docker, Elasticsearch, Git, Grafana, Hadoop, Hive, EMR, Glue, Athena, Lambda, Step Functions, Airflow/MWAA, DynamoDB, Kafka, Kubernetes, Linux, MariaDB, MySQL, Pandas, PostgreSQL, Python, Redis, Scala, SQLite</p>
</footer>
</body></html>'''

def extract_body_content(url_path):
    """
    Given a URL path, find the corresponding local HTML file and extract its body content,
    removing header, footer elements, and the body tags themselves.
    
    Args:
        url_path (str): The URL path (e.g., 'https://www.iexpertify.com/learn/netezza-query-plan-analysis/')
        
    Returns:
        str: The cleaned body content without header, footer, and body tags if file exists, None otherwise
    """
    # Parse the URL to get the path
    parsed_url = urlparse(url_path)
    path = parsed_url.path.strip('/')
    
    # Construct local file path
    local_path = f"{path}/index.html"
    
    # Check if file exists
    if not os.path.exists(local_path):
        return None
    
    # Read the file
    try:
        with open(local_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
            
        # Parse HTML and extract body content
        soup = BeautifulSoup(html_content, 'html.parser')
        body_tag = soup.body
        
        if body_tag:
            # Remove header elements - common classes/IDs for headers
            headers = body_tag.select('header, .header, #header, .site-header, #site-header, nav, .navbar, .navigation, .main-navigation')
            for header in headers:
                header.decompose()
                
            # Remove footer elements - common classes/IDs for footers
            footers = body_tag.select('footer, .footer, #footer, .site-footer, #site-footer, .bottom-bar, .copyright')
            for footer in footers:
                footer.decompose()
            
            # Return only the inner HTML content of the body tag
            return ''.join(str(content) for content in body_tag.contents)
        else:
            return None
    except Exception as e:
        return None
    
def read_urls(file_path):
    """Reads URLs from a file and filters those starting with 'https://www.'"""
    with open(file_path, 'r') as file:
        urls = [line.strip() for line in file if line.strip().startswith("https://www.")]
    return urls

def call_ollama_api(prompt):
    """Calls ollama API to generate HTML content."""
    # Ollama API endpoint
    api_url = "http://localhost:11434/api/generate"
    
    # Request payload
    payload = {
        "model": "llama3",
        "prompt": prompt,
        "stream": False
    }
    
    # Make the API call
    response = requests.post(api_url, json=payload)
    
    if response.status_code == 200:
        result = response.json()
        return result["response"]
    else:
        raise Exception(f"Ollama API request failed with status code {response.status_code}: {response.text}")

def generate_content(url_path):
    """Calls local Ollama API to generate HTML content only."""
    # Prompt construction
    prompt = f"Generate an <body> portion HTML article for the topic: {url_path}. Include structured content with headings, code samples, tables, and illustrations where applicable. Ensure the content is human-like and informative. Return only <body> element of valid HTML content."
    result = call_ollama_api(prompt)
    return result


def rewrite_content(url_path):
    """Calls local Ollama API to rewrite the content."""
    #Read the content from the URL
    old_content = extract_body_content(url_path)
    prompt = f"Rewrite an <body> portion HTML article for the topic: {url_path}.Ensure the content is human-like and informative. NOTE ONLY Return only <body> element of valid HTML content without <body> and </body> tags. Please rewrite: {old_content} "
    result = call_ollama_api(prompt)
    return result

def old_save_content(url, rewritten, content):
    """Saves the generated content to a corresponding HTML file with a predefined header and footer."""
    parsed_url = urlparse(url)
    local_path = parsed_url.path.strip('/')  # Remove leading and trailing slashes
    file_path = os.path.join(local_path, "index.html")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(head + rewritten + content + footer)
    print(f"Content saved: {file_path}")

def is_empty_tag(tag):
    """
    Returns True if a tag is considered empty (only whitespace or nothing inside).
    """
    if not isinstance(tag, Tag):
        return False
    # If all contents are whitespace or empty tags
    return not tag.contents or all(
        isinstance(child, NavigableString) and not child.strip()
        or (isinstance(child, Tag) and is_empty_tag(child))
        for child in tag.contents
    )

def remove_empty_tags(soup):
    """
    Recursively removes empty tags from the soup.
    """
    for tag in soup.find_all():
        for child in list(tag.children):
            if isinstance(child, Tag):
                remove_empty_tags(child)
        if is_empty_tag(tag):
            tag.decompose()

def run_basic_html_sanity_check(soup):
    """
    Print basic HTML structure sanity checks.
    """
    html_count = len(soup.find_all('html'))
    head_count = len(soup.find_all('head'))
    body_count = len(soup.find_all('body'))

    if html_count != 1:
        print(f"[Warning] Found {html_count} <html> tags.")
    if head_count != 1:
        print(f"[Warning] Found {head_count} <head> tags.")
    if body_count != 1:
        print(f"[Warning] Found {body_count} <body> tags.")

def save_content(url, rewritten, content):
    """
    Saves the generated content to a corresponding HTML file with a predefined header and footer.
    Cleans up the HTML by merging body tags, removing stray text nodes, stripping empty tags,
    and checking basic structure.
    """
    parsed_url = urlparse(url)
    local_path = parsed_url.path.strip('/')
    file_path = os.path.join(local_path, "index.html")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    # Handle case when rewritten is None
    if rewritten is None:
        final_content = head + content + footer
    else:
        # Extract content from body tags using BeautifulSoup
        rewritten_soup = BeautifulSoup(rewritten, 'html.parser')
        content_soup = BeautifulSoup(content, 'html.parser')
        
        # Get inner content without the body tags
        rewritten_inner = ''.join(str(item) for item in rewritten_soup.body.contents) if rewritten_soup.body else ''
        content_inner = ''.join(str(item) for item in content_soup.body.contents) if content_soup.body else ''
        
        # Combine with header and footer
        final_content = head + rewritten_inner + content_inner + footer

    # Re-parse final_content to clean and validate HTML structure
    soup = BeautifulSoup(final_content, 'html.parser')

    # Merge multiple <body> tags if any
    bodies = soup.find_all('body')
    if len(bodies) > 1:
        main_body = bodies[0]
        for extra_body in bodies[1:]:
            for child in extra_body.contents:
                main_body.append(child)
            extra_body.decompose()

    # Remove top-level stray text nodes
    for element in list(soup.contents):
        if isinstance(element, NavigableString) and element.strip():
            element.extract()

    # Remove empty tags recursively
    remove_empty_tags(soup)

    # Run basic HTML sanity checks
    run_basic_html_sanity_check(soup)

    # Convert back to string
    final_content = str(soup)

    # Save to file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(final_content)

    print(f"Content saved: {file_path}")


def new_save_content(url, rewritten, content):
    """
    Saves the generated content to a corresponding HTML file with a predefined header and footer.
    Properly handles HTML body tags to ensure valid HTML with only one body.
    """
    parsed_url = urlparse(url)
    local_path = parsed_url.path.strip('/')
    file_path = os.path.join(local_path, "index.html")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    # Handle case when rewritten is None
    if rewritten is None:
        final_content = head + content + footer
    else:
        # Extract content from body tags using BeautifulSoup
        rewritten_soup = BeautifulSoup(rewritten, 'html.parser')
        content_soup = BeautifulSoup(content, 'html.parser')
        
        # Get inner content without the body tags
        rewritten_inner = ''.join(str(item) for item in rewritten_soup.body.contents) if rewritten_soup.body else ''
        content_inner = ''.join(str(item) for item in content_soup.body.contents) if content_soup.body else ''
        
        # Combine with header and footer
        final_content = head + rewritten_inner + content_inner + footer
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(final_content)
    
    print(f"Content saved: {file_path}")

def main():
    url_file = "/Users/ananth/code/iexpertify/url_list.txt"
    urls = read_urls(url_file)
    for url in urls[:2]:
        url_path = urlparse(url).path.strip('/')
        print(f"Generating content for: {url_path}")
        rewritten = rewrite_content(url_path)
        content = generate_content(url_path)
        new_save_content(url, rewritten, content)

if __name__ == "__main__":
    main()
