import os
from openai import OpenAI
from urllib.parse import urlparse

# Set OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(
    api_key = api_key,
) 

def read_urls(file_path):
    """Reads URLs from a file and filters those starting with 'https://www.'"""
    with open(file_path, 'r') as file:
        urls = [line.strip() for line in file if line.strip().startswith("https://www.")]
    return urls[:2]

# def generate_content(url_path):
#     """Calls OpenAI API to generate HTML content only."""
#     prompt = f"Generate an HTML article for the topic: {url_path}. Include structured content with headings, code samples, tables, and illustrations where applicable. Ensure the content is human-like and informative. Return only <body> element of valid HTML content."
#     completion = client.chat.completions.create(
#         messages=[
#             {
#                 "role": "user",
#                 "content": prompt,
#             }
#         ],
#         model="gpt-4o-mini",
#     )
#     return completion.choices[0].message.content

import json
import requests

def generate_content(url_path):
    """Calls local Ollama API to generate HTML content only."""
    
    # Ollama API endpoint
    api_url = "http://localhost:11434/api/generate"
    
    # Prompt construction
    prompt = f"Generate an HTML article for the topic: {url_path}. Include structured content with headings, code samples, tables, and illustrations where applicable. Ensure the content is human-like and informative. Return only <body> element of valid HTML content."
    
    # Request payload
    payload = {
        "model": "llama3", # You can change this to any model you have pulled in Ollama
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

def save_content(url, content):
    """Saves the generated content to a corresponding HTML file with a predefined header and footer."""
    parsed_url = urlparse(url)
    local_path = parsed_url.path.strip('/')  # Remove leading and trailing slashes
    file_path = os.path.join(local_path, "index.html")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    header = '''<html><head><link href="/simplecss/styles.css" rel="stylesheet"/>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3040480045347797" crossorigin="anonymous"></script>
<script src="https://topmate-embed.s3.ap-south-1.amazonaws.com/v1/topmate-embed.js" user-profile="https://topmate.io/embed/profile/ananth_tirumanur?theme=D5534D" btn-style='{"backgroundColor":"#000","color":"#fff","border":"1px solid #000"}' embed-version="v1" button-text="Let's Connect" position-right="30px" position-bottom="30px" custom-padding="0px" custom-font-size="16px" custom-font-weight="500" custom-width="200px" async defer></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VS67BGEQZW"></script>
<script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-VS67BGEQZW');</script>
</head><body><header><nav><ul><li><a href="https://www.iexpertify.com/">iExpertify</a></li><li><a href="https://www.iexpertify.com/free-utilities/">Free Utilities</a></li></ul></nav></header>'''
    
    footer = '''<h3>Meet Ananth Tirumanur. Hi there 👋</h3>
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
    </body></html>'''
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(header + content + footer)
    print(f"Content saved: {file_path}")

def main():
    url_file = "/Users/ananth/code/iexpertify/url_list.txt"
    urls = read_urls(url_file)
    
    for url in urls[:10]:
        url_path = urlparse(url).path.strip('/')
        print(f"Generating content for: {url_path}")
        content = generate_content(url_path)
        save_content(url, content)

if __name__ == "__main__":
    main()
