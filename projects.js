"use strict";

function getRequestedProjectId() {
    return new URLSearchParams(window.location.search).get("project");
}

function findProjectById(id) {
    return projectsData.find(project => project.id === id);
}

function renderProjectDetail(project) {
    const view = document.getElementById("project-detail-view");
    view.innerHTML = `
        <a href="index.html" class="backLink">&larr; Back</a>
        <h2 class="titleContainer">${project.title}</h2>
        <div class="projectDetailBanner"><img src="${project.bannerImage}" alt="${project.title}"></div>
        <div class="msgContainer">${project.description}</div>
        <div class="techStackContainer">
            <h3 class="titleContainer">Tech Stack</h3>
            <ul class="techStackList">
                ${project.techStack.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </div>
        <a href="${project.storeLink}" target="_blank" rel="noopener noreferrer" class="storeLink">View on Steam</a>
    `;
}

// Reverses whatever animations are currently on the element (running or
// already finished), then removes it from layout once they finish reversing.
function hideElement(el) {
    el.inert = true;
    const anims = el.getAnimations();
    anims.forEach(anim => anim.reverse());
    return Promise.all(anims.map(anim => anim.finished)).then(() => {
        el.classList.add("layout-collapsed");
    });
}

// Restoring display makes the browser recreate the CSS entrance animation
// from scratch and play it forward — no explicit animation call needed.
function showElement(el) {
    el.classList.remove("layout-collapsed");
    el.inert = false;
}

function isHomeVisible() {
    return !document.querySelector(".home-view").classList.contains("layout-collapsed");
}

function transitionToProject(project) {
    renderProjectDetail(project);
    if (isHomeVisible()) {
        const homeEls = document.querySelectorAll(".home-view");
        Promise.all([...homeEls].map(hideElement)).then(() => {
            showElement(document.getElementById("project-detail-view"));
        });
    }
    // If a project detail view is already showing, the innerHTML swap above is enough.
}

function transitionToHome() {
    const detailEl = document.getElementById("project-detail-view");
    if (detailEl.classList.contains("layout-collapsed")) return;
    hideElement(detailEl).then(() => {
        document.querySelectorAll(".home-view").forEach(showElement);
    });
}

function showProjectDetailInstant(project) {
    renderProjectDetail(project);
    document.querySelectorAll(".home-view").forEach(el => {
        el.classList.add("layout-collapsed");
        el.inert = true;
    });
    const detailEl = document.getElementById("project-detail-view");
    detailEl.classList.remove("layout-collapsed");
    detailEl.inert = false;
}

document.addEventListener("click", (event) => {
    const projectLink = event.target.closest("a[href^='index.html?project=']");
    if (projectLink) {
        const id = new URL(projectLink.href).searchParams.get("project");
        const project = findProjectById(id);
        if (!project) return;
        event.preventDefault();
        history.pushState(null, "", projectLink.getAttribute("href"));
        transitionToProject(project);
        return;
    }

    const backLink = event.target.closest(".backLink");
    if (backLink) {
        event.preventDefault();
        history.pushState(null, "", "index.html");
        transitionToHome();
    }
});

window.addEventListener("popstate", () => {
    const project = findProjectById(getRequestedProjectId());
    if (project) {
        transitionToProject(project);
    } else {
        transitionToHome();
    }
});

const requestedProject = findProjectById(getRequestedProjectId());
if (requestedProject) {
    showProjectDetailInstant(requestedProject);
}
