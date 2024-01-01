// show_all.js
// Author: Kuang Jiang
// This script is used to show the experience section regarding work in about.html

document.addEventListener("DOMContentLoaded", function () {
    // By default, show all experience
    showExperience('all');

    // Scroll to target section if redirected
    scrollToHashSection()
});

// Define the async function to load HTML
async function loadHTML(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
    } catch (error) {
        console.error('Error loading HTML:', error);
        return null;
    }
}

// Function to disable a button by ID
function disableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.classList.add('disabled');
        button.style.pointerEvents = 'none'; // Disable click events
    }
}

// Function to enable buttons by IDs
function enableButtons(buttonIds) {
    buttonIds.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.remove('disabled');
            button.style.pointerEvents = 'auto'; // Enable click events
        }
    });
}

// Function to get rows based on the specified experience type
function getRowsByExperience(container, experienceType) {
    switch (experienceType) {
        case 'all':
            // Disable the 'overall-button' and enable other buttons
            disableButton('overall-button');
            enableButtons(['experience-button', 'projects-button', 'education-button']);
            return container.querySelectorAll(".row");

        case 'work':
            // Disable the 'experience-button' and enable other buttons
            disableButton('experience-button');
            enableButtons(['overall-button', 'projects-button', 'education-button']);
            return container.querySelectorAll(".row#work");

        case 'education':
            // Disable the 'education-button' and enable other buttons
            disableButton('education-button');
            enableButtons(['experience-button', 'projects-button', 'overall-button']);
            return container.querySelectorAll(".row#education");

        case 'project':
            // Disable the 'projects-button' and enable other buttons
            disableButton('projects-button');
            enableButtons(['experience-button', 'overall-button', 'education-button']);
            return container.querySelectorAll(".row#project");

        default:
            // Disable the 'overall-button' and enable other buttons
            disableButton('overall-button');
            enableButtons(['experience-button', 'projects-button', 'education-button']);
            return container.querySelectorAll(".row");
    }
}

function sortRowsDescending(rows) {
    return Array.from(rows).sort((a, b) => {
        const idA = parseInt(a.querySelector('.year').id);
        const idB = parseInt(b.querySelector('.year').id);
        return idB - idA;
    });
}

function showExperience(experienceType) {
    // Load all_experience.html using the loadHTML function
    loadHTML('../html/all_experience.html')
        .then(tempContainer => {
            if (tempContainer) {
                // Query elements based on the specified experience type
                const rows = getRowsByExperience(tempContainer, experienceType);

                // Get the container in about.html
                const experienceContainer = document.getElementById("experience");

                // Clear existing content in the container
                experienceContainer.innerHTML = '';

                // Additional Insertion
                switch (experienceType) {
                    case 'all':
                        break;
                    case 'work':
                    case 'project':
                    case 'education':
                        const specialRow = tempContainer.querySelectorAll(".row#special")
                        specialRow.forEach(row => {
                            experienceContainer.appendChild(row.cloneNode(true));
                        })
                        break;
                    default:
                        break;
                }

                // Sort the rows in descending order
                const sortedRows = sortRowsDescending(rows);

                // Insert the queried and sorted elements into the container
                sortedRows.forEach(row => {
                    experienceContainer.appendChild(row.cloneNode(true));
                });

                // Check if result is empty
                if (experienceContainer.innerHTML === '') {
                    // The experienceContainer is empty
                    console.log("experienceContainer is empty");
                }
            }
        });
}

function changeExperience(experienceType) {
    const existingContent = document.getElementById('experience');

    // Add a dissolving effect to the existing content
    existingContent.style.transition = 'opacity 0.8s';
    existingContent.style.opacity = 0;

    // Load new content after a short delay
    setTimeout(function () {
        showExperience(experienceType); // Assuming showExperience is defined elsewhere
        existingContent.style.transition = 'opacity 0.8s';
        existingContent.style.opacity = 1; // Show the new content
    }, 800); // Adjust the delay as needed
}

function scrollToHashSection() {
    const hash = window.location.hash;

    if (hash) {
        const targetElement = document.querySelector(hash);

        if (targetElement) {
            // Scroll to the target section smoothly
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}