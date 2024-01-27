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

    // Randomly select three photos for the featured section
    const featuredPhotos = getRandomElements(data, 3);
    const featuredPhotoElements = featuredPhotos.map(createPhotoElement);
    insertPhotosInColumns(featuredPhotoElements, featuredContainer);

    // Categorize the rest of the photos based on the "tag" property
    const cyclingPhotos = [];
    const travelPhotos = [];

    data.forEach((photo, index) => {
        const photoElement = createPhotoElement(photo);

        if (photo.tag === 'cycling') {
            cyclingPhotos.push(photoElement);
        } else if (photo.tag === 'travel') {
            travelPhotos.push(photoElement);
        }
    });

    // Randomize the display order for cycling and travel photos
    const randomizedCyclingPhotos = shuffleArray(cyclingPhotos);
    const randomizedTravelPhotos = shuffleArray(travelPhotos);

    insertPhotosInColumns(cyclingPhotos, cyclingContainer);
    insertPhotosInColumns(travelPhotos, travelContainer);
}

function insertPhotosInColumns(photos, container) {
    const columns = 3;
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.classList.add('column');
        container.appendChild(column);
    }

    for (let i = 0; i < photos.length; i++) {
        const columnIndex = i % columns;
        const column = container.getElementsByClassName('column')[columnIndex];
        column.innerHTML += photos[i];
    }
}

function shuffleArray(array) {
    return array.slice().sort(() => 0.5 - Math.random());
}

function createPhotoElement(photo) {
    return `<img src="${photo.url}" alt="${photo.title}" class="photo" onclick="showPopup('${photo.url}')">`;
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