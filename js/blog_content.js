// blog_content.js
// Author: Kellan Jiang
// Description: Render grouped blog cards for the blog index page.

document.addEventListener("DOMContentLoaded", () => {
    fetchAndPopulateBlogs();
});

async function fetchAndPopulateBlogs() {
    const technicalContainer = document.getElementById("technicalBlogContainer");
    const personalContainer = document.getElementById("personalBlogContainer");

    if (!technicalContainer || !personalContainer) {
        return;
    }

    try {
        const blogDataResponse = await fetch("/blog/blog.json");

        if (!blogDataResponse.ok) {
            throw new Error(`HTTP error! Status: ${blogDataResponse.status}`);
        }

        const blogData = await blogDataResponse.json();
        const technicalBlogs = blogData.filter((blog) => blog.category !== "travel");
        const personalBlogs = blogData.filter((blog) => blog.category === "travel");

        await renderBlogGroup(technicalBlogs, technicalContainer);
        await renderBlogGroup(personalBlogs, personalContainer);
    } catch (error) {
        console.error("Error fetching and populating blogs:", error);
    }
}

async function renderBlogGroup(blogs, container) {
    container.innerHTML = "";

    for (const blog of blogs) {
        const blogCard = await createBlogCard(blog);

        if (blogCard) {
            container.appendChild(blogCard);
        }
    }
}

async function createBlogCard(blog) {
    const htmlDoc = await loadHTML(blog.url);

    if (!htmlDoc) {
        return null;
    }

    const publishTime = htmlDoc.querySelector(".publish-time")?.textContent?.trim() || blog.publish_time || "";
    const blogImage = htmlDoc.querySelector(".image-container img");
    const imageSrc = blogImage ? blogImage.src : "";
    const abstractContent = htmlDoc.querySelector(".abstract-content")?.textContent?.trim() || "";

    const blogSubcontainer = document.createElement("article");
    blogSubcontainer.className = "blog-subcontainer";

    const blogCardLink = document.createElement("a");
    blogCardLink.href = blog.url;
    blogCardLink.className = "blog-subcontainer-link";
    blogCardLink.setAttribute("aria-label", `Open blog post: ${blog.title}`);

    const blogSubcontainerImgElement = document.createElement("div");
    blogSubcontainerImgElement.className = "blog-subcontainer-image";

    const blogImageElement = document.createElement("img");
    blogImageElement.src = imageSrc;
    blogImageElement.alt = blog.title;
    blogImageElement.className = "blog-subcontainer-img";
    blogImageElement.loading = "lazy";
    blogImageElement.decoding = "async";
    blogSubcontainerImgElement.appendChild(blogImageElement);

    const blogSubcontainerTitleElement = document.createElement("div");
    blogSubcontainerTitleElement.className = "blog-subcontainer-title";

    const blogTitleElement = document.createElement("h2");
    blogTitleElement.textContent = blog.title;

    const publishTimeElement = document.createElement("p");
    publishTimeElement.textContent = publishTime;
    publishTimeElement.className = "blog-subcontainer-date";

    blogSubcontainerTitleElement.appendChild(blogTitleElement);
    blogSubcontainerTitleElement.appendChild(publishTimeElement);

    const blogSubcontainerAbstractElement = document.createElement("div");
    blogSubcontainerAbstractElement.className = "blog-subcontainer-abstract";

    const abstractContentElement = document.createElement("p");
    abstractContentElement.textContent = abstractContent;

    blogSubcontainerAbstractElement.appendChild(abstractContentElement);

    blogCardLink.appendChild(blogSubcontainerImgElement);
    blogCardLink.appendChild(blogSubcontainerTitleElement);
    blogCardLink.appendChild(blogSubcontainerAbstractElement);
    blogSubcontainer.appendChild(blogCardLink);

    return blogSubcontainer;
}

async function loadHTML(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    } catch (error) {
        console.error("Error loading HTML:", error);
        return null;
    }
}
