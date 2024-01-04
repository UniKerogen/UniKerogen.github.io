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

def process_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()
        title = extract_title(html_content)
        if title:
            return {
                'title': title,
                'url': f'/blog/{os.path.basename(file_path)}'
            }
        else:
            return None

def main():
    html_files = glob.glob('*.html')

    # Sort files based on creation time
    html_files.sort(key=lambda x: os.path.getctime(x))

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
