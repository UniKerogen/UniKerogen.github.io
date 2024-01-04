
// script.js
// Author:  Kuang Jiang
// Description: This is the script file for the index.html file.  It contains the functions that are called by the index.html file.

document.addEventListener("DOMContentLoaded", function () {

    // Load the global header
    loadGlobalHeader();

    // Update the current year in the footer
    updateCopyrightYear();
    // Set up an interval to update the year every minute
    setInterval(updateCopyrightYear, 60000); // 60000 milliseconds = 1 minute
});


// Script for back-to-top button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.back-to-top').classList.add('show');
    } else {
        document.querySelector('.back-to-top').classList.remove('show');
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Script for copyright update
// Function to update the copyright text with the current year
function updateCopyrightYear() {
    var currentYear = new Date().getFullYear();
    var copyrightElement = document.getElementById("copyright");
    copyrightElement.textContent = "Copyright © 2015-" + currentYear + " Kuang Jiang. All rights reserved.";
}

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

// Function to execute after HTML is loaded
async function loadGlobalHeader() {
    // Load all_projects.html content
    const headerHTML = await loadHTML('/html/global_header.html');

    if (headerHTML) {
        // Get all project containers from the loaded HTML
        var globalHeader = headerHTML.querySelectorAll(".header-container");

        // Clear existing content in #sorted-projects-container
        var headerContainer = document.getElementById("globalHeader");
        headerContainer.innerHTML = "";

        // Add the loaded HTML to the page
        globalHeader.forEach(function (header) {
            headerContainer.appendChild(header);
        });
    }
}
