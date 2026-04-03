// resume.js
// Author: Kellan Jiang
// Description: Resume selector logic for HTML-based resume variants.

function disableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.classList.add("disabled");
        button.style.pointerEvents = "none";
    }
}

function enableButtons(buttonIds) {
    buttonIds.forEach((buttonId) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.remove("disabled");
            button.style.pointerEvents = "auto";
        }
    });
}

function changeResume(section) {
    const previewColumn = document.querySelector(".resume-container .preview-column");
    const textColumn = document.querySelector(".resume-container .text-column");

    let newImageSrc = "";
    let newHeading = "";
    let newDescription1 = "";
    let newDescription2 = "";
    let newDescription3 = "";
    let newResumeLink = "";

    switch (section) {
        case "data":
            newImageSrc = "/resources/buttons/database_icon.png";
            newHeading = "Data Engineer";
            newDescription1 = "&#x2022; Emphasizes <hl>Dagster</hl>-based workflow ownership, structured <hl>data modeling</hl>, partitioned processing, and production-minded pipeline design.";
            newDescription2 = "&#x2022; Highlights <hl>observability</hl>, <hl>validation</hl>, retries, and backend integration across <hl>FastAPI</hl>, <hl>Amazon RDS</hl>, <hl>Docker</hl>, and <hl>Terraform</hl>.";
            newDescription3 = "&#x2022; Optimized for one-page recruiter scan with current experience focused on Kachan Research, DingSheng, and data-relevant projects.";
            newResumeLink = "/resume/data-engineer.html";
            disableButton("data-button");
            enableButtons(["full-stack-button"]);
            break;
        case "full-stack":
            newImageSrc = "/resources/buttons/code_icon.png";
            newHeading = "Full-Stack Engineer";
            newDescription1 = "&#x2022; Emphasizes <hl>FastAPI</hl> backend ownership, admin platform workflows, API integration, reporting features, and maintainable application logic.";
            newDescription2 = "&#x2022; Highlights frontend and product-facing implementation using <hl>JavaScript</hl>, <hl>React</hl>, <hl>HTML</hl>, <hl>CSS</hl>, and data-backed service integration.";
            newDescription3 = "&#x2022; Optimized for one-page recruiter scan with current experience focused on Kachan Research, DingSheng, and product-oriented projects.";
            newResumeLink = "/resume/full-stack-engineer.html";
            disableButton("full-stack-button");
            enableButtons(["data-button"]);
            break;
        default:
            newImageSrc = "/resources/buttons/database_icon.png";
            newHeading = "Data Engineer";
            newDescription1 = "&#x2022; Emphasizes <hl>Dagster</hl>-based workflow ownership, structured <hl>data modeling</hl>, partitioned processing, and production-minded pipeline design.";
            newDescription2 = "&#x2022; Highlights <hl>observability</hl>, <hl>validation</hl>, retries, and backend integration across <hl>FastAPI</hl>, <hl>Amazon RDS</hl>, <hl>Docker</hl>, and <hl>Terraform</hl>.";
            newDescription3 = "&#x2022; Optimized for one-page recruiter scan with current experience focused on Kachan Research, DingSheng, and data-relevant projects.";
            newResumeLink = "/resume/data-engineer.html";
            disableButton("data-button");
            enableButtons(["full-stack-button"]);
            break;
    }

    previewColumn.style.opacity = 1;
    textColumn.style.opacity = 1;
    previewColumn.style.transition = "opacity 0.3s ease-in-out";
    textColumn.style.transition = "opacity 0.3s ease-in-out";

    previewColumn.style.opacity = 0;
    textColumn.style.opacity = 0;

    requestAnimationFrame(() => {
        setTimeout(() => {
            previewColumn.innerHTML = `<img src="${newImageSrc}" decoding="async" class="resume-preview-image is-placeholder">`;

            textColumn.innerHTML = `
                <h2>${newHeading}</h2>
                <div class="dot-dash-line resume-divider"></div>
                <p class="resume-summary-line">${newDescription1}</p>
                <p class="resume-summary-line">${newDescription2}</p>
                <p class="resume-summary-line">${newDescription3}</p>
                <div class="download-container resume-download-container">
                    <a href="${newResumeLink}" class="download-item-container">
                        <img src="/resources/buttons/file_icon.png" alt="Resume Button" class="download-image">
                        <div class="download">Open Resume</div>
                    </a>
                </div>
            `;

            previewColumn.style.opacity = 1;
            textColumn.style.opacity = 1;
        }, 300);
    });
}

window.addEventListener("load", () => {
    changeResume("data");
});
