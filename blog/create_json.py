# create_json.py
# Author: Kuang Jiang
# Description: This script will sort all HTML files in the current directory by creation time and create a JSON file with the sorted list.

import os
import glob
import json
from bs4 import BeautifulSoup
from datetime import datetime

def extract_title(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    title_div = soup.find('div', {'class': 'title'})
    return title_div.text.strip() if title_div else None

def extract_publish_time(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    publish_time_span = soup.find('span', {'class': 'publish-time'})
    return publish_time_span.text.strip() if publish_time_span else None

def process_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()
        title = extract_title(html_content)
        publish_time = extract_publish_time(html_content)
        if title and publish_time:
            return {
                'title': title,
                'url': f'/blog/{os.path.basename(file_path)}',
                'publish_time': publish_time
            }
        else:
            return None

def main():
    html_files = glob.glob('*.html')

    # Sort files in descending order based on the content within the <span class='publish-time'> tag
    html_files.sort(key=lambda x: datetime.strptime(extract_publish_time(open(x).read()), '%B %Y') if extract_publish_time(open(x).read()) else datetime.min, reverse=True)

    result = []

    for file_path in html_files:
        entry = process_html_file(file_path)
        if entry:
            result.append(entry)

    # Create JSON file
    with open('blog.json', 'w', encoding='utf-8') as json_file:
        json.dump(result, json_file, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
