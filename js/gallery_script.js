// gallery_script.js
// Author: Kuang Jiang
// Description: This file contains the JavaScript functions for the gallery page.

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndPopulate();
});

async function fetchDataAndPopulate() {
    try {
        const response = await fetch('/gallery/photo_data.json');
        const jsonData = await response.json();
        populatePhotos(jsonData);
    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}

function populatePhotos(data) {
    const featuredContainer = document.getElementById('featured');
    const cyclingContainer = document.getElementById('cycling');
    const travelContainer = document.getElementById('travel');
    const foodContainer = document.getElementById('food');

    // Randomly select three photos for the featured section
    const featuredPhotos = getRandomElements(data, 3);
    insertPhotosInColumns(featuredPhotos, featuredContainer);

    // Categorize the rest of the photos based on the "tag" property
    const cyclingPhotos = [];
    const travelPhotos = [];
    const foodPhotos = [];

    data.forEach((photo, index) => {
        if (photo.tag === 'cycling') {
            cyclingPhotos.push(photo);
        } else if (photo.tag === 'travel') {
            travelPhotos.push(photo);
        } else if (photo.tag === 'food') {
            foodPhotos.push(photo);
        }
    });

    insertPhotosInColumns(shuffleArray(cyclingPhotos), cyclingContainer);
    insertPhotosInColumns(shuffleArray(travelPhotos), travelContainer);
    insertPhotosInColumns(shuffleArray(foodPhotos), foodContainer);
}

function insertPhotosInColumns(photos, container) {
    const columns = 3;
    const columnHeights = new Array(columns).fill(0);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.classList.add('column');
        container.appendChild(column);
    }

    for (let i = 0; i < photos.length; i++) {
        const columnIndex = getShortestColumnIndex(columnHeights);
        const column = container.getElementsByClassName('column')[columnIndex];

        column.innerHTML += createPhotoElement(photos[i]);

        columnHeights[columnIndex] += photos[i].height;
    }
}

function getShortestColumnIndex(columnHeights) {
    let shortestIndex = 0;
    for (let i = 1; i < columnHeights.length; i++) {
        if (columnHeights[i] < columnHeights[shortestIndex]) {
            shortestIndex = i;
        }
    }
    return shortestIndex;
}

function shuffleArray(array) {
    return array.slice().sort(() => 0.5 - Math.random());
}

function createPhotoElement(photo) {
    return `<div class="image-container"><img src="${photo.url}" alt="${photo.title}" class="photo" loading="lazy" onclick="showPopup('${photo.url}')"></div>`;
}

function getRandomElements(array, count) {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function showPopup(imageSrc) {
    document.getElementById('popup-image').src = imageSrc;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}