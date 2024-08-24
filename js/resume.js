// resume.js
// Author: Kuang Jiang
// Description: This file contains the javascript code for the resume page.

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

function changeResume(section) {
    // Reference to preview and text columns
    const previewColumn = document.querySelector('.resume-container .preview-column');
    const textColumn = document.querySelector('.resume-container .text-column');

    let newImageSrc = '';
    let newHeading = '';
    let newDescription1 = '';
    let newDescription2 = '';
    let newDescription3 = '';
    let newDownloadLink = '';

    switch(section) {
        case 'software':
            newImageSrc = '/resources/buttons/sdk_icon.png';
            newHeading = 'Software Engineer';
            newDescription1 = '&#x2022; Developed and optimized complex software solutions, improving system efficiency by 30%.';
            newDescription2 = '&#x2022; Automated deployment pipelines using CI/CD tools, reducing release time by 50%.';
            newDescription3 = '&#x2022; Led cross-functional teams in software development projects, ensuring timely delivery and high code quality.';
            newDownloadLink = '/resources/files/Kellan Jiang - Software Engineer.pdf';
            disableButton('software-button');
            enableButtons(['ml-button', 'data-button', 'full-stack-button', 'ba-button']);
            break;
        case 'ml':
            newImageSrc = '/resources/buttons/robot_icon.png';
            newHeading = 'Machine Learning Engineer';
            newDescription1 = '&#x2022; Designed and trained machine learning models, achieving over 90% accuracy in predictive tasks.';
            newDescription2 = '&#x2022; Integrated AI-driven image recognition systems, enhancing data processing capabilities.';
            newDescription3 = '&#x2022; Utilized TensorFlow and PyTorch for deep learning model development and deployment.';
            newDownloadLink = '/resources/files/Kellan Jiang - ML Engineer.pdf';
            disableButton('ml-button');
            enableButtons(['software-button', 'data-button', 'full-stack-button', 'ba-button']);
            break;
        case 'data':
            newImageSrc = '/resources/buttons/database_icon.png';
            newHeading = 'Data Engineer';
            newDescription1 = '&#x2022; Built and managed ETL pipelines using Python and Java, streamlining data processing.';
            newDescription2 = '&#x2022; Optimized database architecture and query performance, improving data retrieval speed by 40%.';
            newDescription3 = '&#x2022; Developed dynamic data visualizations and interactive dashboards using Tableau and Power BI, enabling real-time insights and improving operational efficiency by 15%.';
            newDownloadLink = '/resources/files/Kellan Jiang - Data Engineer.pdf';
            disableButton('data-button');
            enableButtons(['software-button', 'ml-button', 'full-stack-button', 'ba-button']);
            break;
        case 'full-stack':
            newImageSrc = '/resources/buttons/code_icon.png';
            newHeading = 'Full Stack Developer';
            newDescription1 = '&#x2022; Developed and maintained full-stack applications using JavaScript, Python, and SQL.';
            newDescription2 = '&#x2022; Designed responsive user interfaces, enhancing user experience and increasing engagement by 25%.';
            newDescription3 = '&#x2022; Implemented RESTful APIs and integrated third-party services, expanding application functionality.';
            newDownloadLink = '/resources/files/Kellan Jiang - Full Stack Developer.pdf';
            disableButton('full-stack-button');
            enableButtons(['software-button', 'ml-button', 'data-button', 'ba-button']);
            break;
        case 'ba':
            newImageSrc = '/resources/buttons/analytics_icon.png';
            newHeading = 'Business Analyst';
            newDescription1 = '&#x2022; Collaborated with stakeholders to gather and document requirements, ensuring project alignment.';
            newDescription2 = '&#x2022; Conducted data analysis and visualization using Tableau and Power BI to support business decisions.';
            newDescription3 = '&#x2022; Mapped business processes and optimized workflows, resulting in a 15% increase in operational efficiency.';
            newDownloadLink = '/resources/pdfs/ba_resume.pdf';
            disableButton('ba-button');
            enableButtons(['software-button', 'ml-button', 'data-button', 'full-stack-button']);
            break;
        default:
            // Default to software if no match is found
            newImageSrc = '/resources/buttons/sdk_icon.png';
            newHeading = 'Software Engineer';
            newDescription1 = '&#x2022; Developed and optimized complex software solutions, improving system efficiency by 30%.';
            newDescription2 = '&#x2022; Automated deployment pipelines using CI/CD tools, reducing release time by 50%.';
            newDescription3 = '&#x2022; Led cross-functional teams in software development projects, ensuring timely delivery and high code quality.';
            newDownloadLink = '/resources/files/Kellan Jiang - Software Engineer.pdf';
            disableButton('software-button');
            enableButtons(['ml-button', 'data-button', 'full-stack-button', 'ba-button']);
            break;
    }

    // Ensure the elements are visible and set up for transition
    previewColumn.style.opacity = 1;
    textColumn.style.opacity = 1;
    previewColumn.style.transition = 'opacity 0.3s ease-in-out';
    textColumn.style.transition = 'opacity 0.3s ease-in-out';

    // Fade out current content
    previewColumn.style.opacity = 0;
    textColumn.style.opacity = 0;

    // Use requestAnimationFrame to ensure class change is processed before content update
    requestAnimationFrame(() => {
        // Wait for fade-out transition to complete before updating content
        setTimeout(() => {
            // Update the image in the preview column
            previewColumn.innerHTML = `<img src="${newImageSrc}" style="filter: brightness(80%); width: 100%">`;

            // Update the content in the text column
            textColumn.innerHTML = `
                <h2>${newHeading}</h2>
                <div class="dot-dash-line" style="margin-top: 2px; margin-bottom: -2px"></div>
                <p style="margin-bottom: -2px; line-height: 1.3;">${newDescription1}</p>
                <p style="margin-bottom: -2px; line-height: 1.3;">${newDescription2}</p>
                <p style="margin-bottom: -2px; line-height: 1.3;">${newDescription3}</p>
                <div class="download-container" style="margin-top: 10px;">
                    <a href="${newDownloadLink}" class="download-item-container" style="cursor: pointer;">
                        <img src="/resources/buttons/download_button.png" alt="Download Button" class="download-image" style="width: 15px;">
                        <div class="download">Download</div>
                    </a>
                </div>
            `;

            // Fade in new content
            previewColumn.style.opacity = 1;
            textColumn.style.opacity = 1;
        }, 600); // Match this timeout with the CSS transition duration
    });
}

function toggleResumeButton() {
    const arrowIcon = document.getElementById('resume-arrow-icon');
    arrowIcon.classList.toggle('downward');
}

window.addEventListener('load', function() {
    changeResume('software');
});