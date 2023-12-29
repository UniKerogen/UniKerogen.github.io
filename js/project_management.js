
// project_management.js
// Author: Kuang Jiang
// Description: JavaScript code for sorting and arranging projects

// Function to load HTML content
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

// Function to execute after HTML is loaded
async function main() {
    // Load all_projects.html content
    const allProjectsHTML = await loadHTML('../html/all_projects.html');

    if (allProjectsHTML) {
        // Get all project containers from the loaded HTML
        var projects = allProjectsHTML.querySelectorAll(".project-container");

        // Sort the projects based on the year in descending order
        projects = Array.from(projects).sort(function (a, b) {
            var yearA = parseInt(a.querySelector(".arrow-pointer").textContent);
            var yearB = parseInt(b.querySelector(".arrow-pointer").textContent);
            return yearB - yearA;
        });

        // Clear existing content in #sorted-projects-container
        var sortedProjectsContainer = document.getElementById("sorted-projects-container");
        sortedProjectsContainer.innerHTML = "";

        // Append sorted projects to the container
        projects.forEach(function (project, index) {
            // Create a new row for every three projects
            if (index % 3 === 0) {
                var row = document.createElement("div");
                row.className = "project-row";
                sortedProjectsContainer.appendChild(row);
            }

            // Append the project container to the current row
            sortedProjectsContainer.lastElementChild.appendChild(project.cloneNode(true));
        });
    }
}

// Call the main function when the DOM is ready
document.addEventListener("DOMContentLoaded", main);