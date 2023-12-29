
// project_management.js
// Author: Kuang Jiang
// Description: JavaScript code for sorting and arranging projects

document.addEventListener("DOMContentLoaded", function () {
    // Get all project containers and convert to an array
    var projects = document.querySelectorAll(".project-container");

    // Sort the projects based on the year in descending order
    projects = Array.from(projects).sort(function (a, b) {
        var yearA = parseInt(a.querySelector(".arrow-pointer").textContent);
        var yearB = parseInt(b.querySelector(".arrow-pointer").textContent);
        return yearB - yearA;
    });

    // Clear existing content
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
});