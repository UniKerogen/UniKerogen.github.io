# photo_json.py
# Author: Kuang Jiang
# Description: This script will create a json file with photo data from two folders.

import os
import json
from PIL import Image
import pillow_heif
import random

def get_image_height(image_path):
    image_path2 = os.path.join(os.getcwd(), image_path)
    try:
        with Image.open(image_path) as img:
            normalized_height = int((img.size[1] / img.size[0]) * 1000)
            return normalized_height
    except Exception as e:
        print(f"Error getting height for {image_path}: {str(e)}")
        print(os.getcwd())
        return None

def convert_heic_to_jpg(heic_path, output_directory):
    try:
        print("Converting:", heic_path)
        heif_file = pillow_heif.read_heif(heic_path)
        image = Image.frombytes(
            heif_file.mode,
            heif_file.size,
            heif_file.data,
            "raw",
        )

        jpg_filename = os.path.splitext(os.path.basename(heic_path))[0] + '.jpg'
        jpg_path = os.path.join(output_directory, jpg_filename)
        image.save(jpg_path, format="JPEG")  # Specify the format as "JPEG"

        return jpg_path, image.size[1]  # Return the JPG path and height
    except Exception as e:
        print(f"Error converting {heic_path} to JPG: {str(e)}")
        return None, None
    
def convert_png_to_jpg(png_path, output_directory):
    try:
        print("Converting:", png_path)
        image = Image.open(png_path)
        
        jpg_filename = os.path.splitext(os.path.basename(png_path))[0] + '.jpg'
        jpg_path = os.path.join(output_directory, jpg_filename)
        image.convert("RGB").save(jpg_path, format="JPEG")

        return jpg_path, image.size[1]  # Return the JPG path and height
    except Exception as e:
        print(f"Error converting {png_path} to JPG: {str(e)}")
        return None, None

def create_photo_data(directory, folder_tag):
    photo_data = []
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.heic', '.heif')):
            file_path = os.path.join(directory, filename)
            photo_height = get_image_height(file_path)
            file_path = os.path.join("/gallery/", file_path)
            if photo_height is not None:
                photo_info = {
                    "title": filename,
                    "url": file_path,
                    "tag": folder_tag,
                    "height": photo_height
                }
                photo_data.append(photo_info)
    return photo_data

def resize_jpg_to_limit_size(jpg_path, output_directory, max_size_kb=4500):
    try:
        image = Image.open(jpg_path)

        quality = 95  # Initial quality value
        while os.path.getsize(jpg_path) > max_size_kb * 1024 and quality > 0:
            # Reduce image quality and save
            image.save(jpg_path, format="JPEG", quality=quality)
            quality -= 5

        return jpg_path, image.size[1]  # Return the resized JPG path and height
    except Exception as e:
        print(f"Error resizing {jpg_path}: {str(e)}")
        return None, None

def process_images(directory):
    converted_paths = []
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.heic', '.heif')):
            heic_path = os.path.join(directory, filename)
            jpg_path, photo_height = convert_heic_to_jpg(heic_path, directory)
            
            if jpg_path:
                os.remove(heic_path)
                print(f"Converted {heic_path} to JPG and deleted original.")
                resized_path, resized_height = resize_jpg_to_limit_size(jpg_path, directory)
                
                if resized_path:
                    print(f"Resized {jpg_path} to below 5MB.")
                    converted_paths.append(resized_path)

        if filename.lower().endswith(('.png')):
            png_path = os.path.join(directory, filename)
            jpg_path, photo_height = convert_png_to_jpg(png_path, directory)
            
            if jpg_path:
                os.remove(png_path)
                print(f"Converted {png_path} to JPG and deleted original.")
                resized_path, resized_height = resize_jpg_to_limit_size(jpg_path, directory)
                
                if resized_path:
                    print(f"Resized {jpg_path} to below 5MB.")
                    converted_paths.append(resized_path)

        if filename.lower().endswith(('.jpg', '.jpeg')):
            jpg_path = os.path.join(directory, filename)
            resized_path, resized_height = resize_jpg_to_limit_size(jpg_path, directory)
            
            if resized_path:
                print(f"Resized {jpg_path} to below 5MB.")
                converted_paths.append(resized_path)

    return converted_paths

def main():
    folder1_path = 'cycling'
    folder2_path = 'travel'
    folder3_path = 'food'
    output_json_file = 'photo_data.json'

    converted_paths_folder1 = process_images(folder1_path)
    converted_paths_folder2 = process_images(folder2_path)
    converted_paths_folder3 = process_images(folder3_path)

    photo_data_folder1 = create_photo_data(folder1_path, 'cycling')
    photo_data_folder2 = create_photo_data(folder2_path, 'travel')
    photo_data_folder3 = create_photo_data(folder3_path, 'food')

    all_photo_data = photo_data_folder1 + photo_data_folder2 + photo_data_folder3

    for photo_info, converted_path in zip(all_photo_data, converted_paths_folder1 + converted_paths_folder2 + converted_paths_folder3):
        photo_info["url"] = os.path.join("/gallery/", converted_path)

    random.shuffle(all_photo_data)

    with open(output_json_file, 'w') as json_file:
        json.dump(all_photo_data, json_file, indent=4)

    print(f"Created {output_json_file} with all photo entries.")

if __name__ == "__main__":
    main()