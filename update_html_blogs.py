from openai import OpenAI
import os
import re

# Set your OpenAI API key
openai_api_key = os.getenv("OPENAI_API_KEY")


def extract_content_after_header(html_content):
    """Extract content after the </header> tag if <body> is not present."""
    match = re.search(r"</header>(.*)", html_content, re.DOTALL | re.IGNORECASE)
    return match.group(1).strip() if match else ""

def extract_body(html_content):
    """Extract the content inside the <body> tag."""
    match = re.search(r"<body[^>]*>(.*?)</body>", html_content, re.DOTALL | re.IGNORECASE)
    return match.group(1) if match else None

def rewrite_content_via_openai(content):
    """Use OpenAI API to rewrite the HTML content."""
    try:
        prompt = f"""
        Rewrite the following HTML content with a focus on clear organization using tables, code snippets, and how-to guides:
        {content}
        """
        client = OpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
        )

        chat_completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": """You are an assistant specializing in improving HTML content.Analyze this article using Google's helpful content standards on expertise, accuracy, transparency, comprehension, and reader value.
                                                Highlight areas that meet or fall short of guidelines.
                                                Give specific, constructive suggestions to enhance depth, citation quality, clarity, and usefulness for readers. 
                                                Also, check whether the following keywords with high impressions are present in my article. If not, add them naturally within the content. Don’t overdo it."""},
                {"role": "user", "content": prompt}
            ],
            max_tokens=2000,
            temperature=0.7
        )
        return chat_completion['choices'][0]['message']['content'].strip()
    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return content

def add_meta_tags(html_content, title, meta_description):
    """Add a <title> and <meta> description to the HTML content."""
    if "<head>" not in html_content:
        html_content = "<head></head>" + html_content
    html_content = re.sub(r"<head>", f"<head><title>{title}</title>\n<meta name=\"description\" content=\"{meta_description}\">\n", html_content, count=1)
    return html_content

def update_index_html(file_path):
    """Read, rewrite, and update the index.html file."""
    try:
        with open(file_path, 'r') as file:
            html_content = file.read()

        # Try to extract the <body> content
        body_content = extract_body(html_content)
        
        if body_content:
            print("Found <body> content.")
        else:
            # Fallback: Look for content after </header>
            print("<body> tag not found. Searching for content after </header>.")
            body_content = extract_content_after_header(html_content)

        if not body_content:
            print(f"No suitable content found in {file_path}")
            return

        # Rewrite the extracted content
        rewritten_content = rewrite_content_via_openai(body_content)

        if body_content:
            # Replace the <body> content in the HTML
            html_content = re.sub(r"<body[^>]*>.*?</body>", f"<body>{rewritten_content}</body>", html_content, flags=re.DOTALL | re.IGNORECASE)
        else:
            # Append the rewritten content after </header> if <body> is not found
            html_content = re.sub(r"(</header>)", f"\\1\n{rewritten_content}", html_content, flags=re.DOTALL | re.IGNORECASE)

        # Add title and meta description
        title = "Enhanced Page Title"
        meta_description = "This page contains enhanced content with tables, code, and how-to guides."
        html_content = add_meta_tags(html_content, title, meta_description)

        # Write the updated content back to the file
        with open(file_path, 'w') as file:
            file.write(html_content)

        print(f"Updated {file_path} successfully.")

    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def process_index_html_list(file_list_path):
    """Read a list of index.html files and process the first one."""
    try:
        with open(file_list_path, 'r') as file:
            file_paths = file.readlines()

        if not file_paths:
            print("No file paths found in the list.")
            return

        # Process the first file in the list
        first_file_path = file_paths[0].strip()
        if os.path.exists(first_file_path):
            update_index_html(first_file_path)
        else:
            print(f"File not found: {first_file_path}")

    except Exception as e:
        print(f"Error reading file list: {e}")

# Specify the path to the file containing the list of index.html paths
file_list_path = "list_of_html_files.txt"

process_index_html_list(file_list_path)
