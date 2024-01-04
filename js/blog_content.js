// blog_content.js
// Author: Kuang Jiang
// Description: This file contains the javascript code for the blog page.

document.addEventListener("DOMContentLoaded", function () {
    // Call the function to fetch and populate blogs (default: page 1)
    fetchAndPopulateBlogs();
});

// Function to fetch blog content and populate the blog-container
async function fetchAndPopulateBlogs(page = 1, itemsPerPage = 10) {
    const blogContainer = document.getElementById("blogContainer");

    try {
        // Simulate fetching data from the /blog directory
        const blogDataResponse = await fetch("/blog/blog.json");
        
        if (!blogDataResponse.ok) {
            throw new Error(`HTTP error! Status: ${blogDataResponse.status}`);
        }

        const blogData = await blogDataResponse.json();

        // Sort the blogData array in descending order based on time
        // blogData.sort((a, b) => new Date(b.time) - new Date(a.time));

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleBlogs = blogData.slice(startIndex, endIndex);

        blogContainer.innerHTML = ""; // Clear existing content

        // Load each HTML file and extract information
        for (const blog of visibleBlogs) {
            const blogSubcontainer = document.createElement("div");
            blogSubcontainer.className = "blog-subcontainer";

            // Load HTML content
            const htmlDoc = await loadHTML(blog.url);

            // Extracting data from HTML content
            if (htmlDoc) {
                // Time
                const publishTime = htmlDoc.querySelector('.publish-time').textContent;

                // Image
                const blogImage = htmlDoc.querySelector('.image-container img');
                const imageSrc = blogImage ? blogImage.src : '';

                // Abstract
                const abstractContent = htmlDoc.querySelector('.abstract-content').textContent;

                // Creating elements for Image
                const blogSubcontainerImgElement = document.createElement("div");
                blogSubcontainerImgElement.className = "blog-subcontainer-image";

                const blogImageElement = document.createElement("img");
                blogImageElement.src = imageSrc;
                blogImageElement.alt = "Blog Image";
                blogImageElement.className = "blog-subcontainer-img";
                blogSubcontainerImgElement.appendChild(blogImageElement);

                // Creating elements for title
                const blogSubcontainerTitleElement = document.createElement("div");
                blogSubcontainerTitleElement.className = "blog-subcontainer-title";
                blogSubcontainerTitleElement.style.display = "flex";
                blogSubcontainerTitleElement.style.alignItems = "center";

                const blogTitleElement = document.createElement("h2");
                blogTitleElement.textContent = blog.title;

                const separatorElement = document.createElement("span");
                separatorElement.textContent = " | ";
                separatorElement.style.margin = "0 10px";
                separatorElement.style.fontSize = "20px";

                const publishTimeElement = document.createElement("p");
                publishTimeElement.textContent = `${publishTime}`;
                publishTimeElement.style.fontSize = "13px";

                blogSubcontainerTitleElement.appendChild(blogTitleElement);
                blogSubcontainerTitleElement.appendChild(separatorElement);
                blogSubcontainerTitleElement.appendChild(publishTimeElement);

                // Creating elements for abstract content
                const blogSubcontainerAbstractElement = document.createElement("div");
                blogSubcontainerAbstractElement.className = "blog-subcontainer-abstract";

                const abstractContentElement = document.createElement("p");
                abstractContentElement.textContent = abstractContent;

                blogSubcontainerAbstractElement.appendChild(abstractContentElement);

                // Creating elements for read-more button
                const blogSubcontainerReadMoreElement = document.createElement("p");
                blogSubcontainerReadMoreElement.style.paddingLeft = "3%";

                const blogReadMoreButtonContainer = document.createElement("div");
                blogReadMoreButtonContainer.className = "more_detail-container";

                const blogReadMoreButtonItemContainer = document.createElement("a");
                blogReadMoreButtonItemContainer.href = blog.url;
                blogReadMoreButtonItemContainer.className = "more_detail-item-container";
                blogReadMoreButtonItemContainer.style.textDecoration = "none";

                const blogReadMoreButtonImage = document.createElement("img");
                blogReadMoreButtonImage.src = "/resources/buttons/more_details_button.png";
                blogReadMoreButtonImage.alt = "More Details Button";
                blogReadMoreButtonImage.className = "more_detail-image";

                const blogReadMoreButtonText = document.createElement("span");
                blogReadMoreButtonText.className = "more_detail";
                blogReadMoreButtonText.textContent = "Read More";
                blogReadMoreButtonText.style.fontSize = "14px";

                blogReadMoreButtonItemContainer.appendChild(blogReadMoreButtonImage);
                blogReadMoreButtonItemContainer.appendChild(blogReadMoreButtonText);

                blogReadMoreButtonContainer.appendChild(blogReadMoreButtonItemContainer);

                blogSubcontainerReadMoreElement.appendChild(blogReadMoreButtonContainer);

                // Appending all elements to blogSubcontainer
                blogSubcontainer.appendChild(blogSubcontainerImgElement);
                blogSubcontainer.appendChild(blogSubcontainerTitleElement);
                blogSubcontainer.appendChild(blogSubcontainerAbstractElement);
                blogSubcontainer.appendChild(blogSubcontainerReadMoreElement);

                blogContainer.appendChild(blogSubcontainer);
            }
        }

        // Add page flipper if needed
        if (blogData.length > itemsPerPage) {
            addPageFlipper(blogData.length, page, itemsPerPage);
        }
    } catch (error) {
        console.error("Error fetching and populating blogs:", error);
    }
}

// Function to add page flipper
function addPageFlipper(totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pageFlipperContainer = document.createElement("div");
    pageFlipperContainer.className = "page-flipper";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", () => {
            fetchAndPopulateBlogs(i, itemsPerPage);
        });

        if (i === currentPage) {
            button.classList.add("active");
        }

        pageFlipperContainer.appendChild(button);
    }

    blogContainer.appendChild(pageFlipperContainer);
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