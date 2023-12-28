
// script.js
// Author:  Kuang Jiang
// Description: This is the script file for the index.html file.  It contains the functions that are called by the index.html file.

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

updateCopyrightYear();

// Set up an interval to update the year every minute
setInterval(updateCopyrightYear, 60000); // 60000 milliseconds = 1 minute

