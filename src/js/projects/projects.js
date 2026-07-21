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
        <a href="index.html" class="backLink detailBack">&larr; Back</a>
        <section id="project-main" class="defaultCard">
            <header class="card-header">
                <span class="file-no">Operative File // Project</span>
                <span class="file-status">${project.title}</span>
            </header>
            <div class="card-body">
                <div class="projectGrid">
                    <div class="projectCol">
                        <div class="projectDetailBanner"><img src="${project.bannerImage}" alt="${project.title}"></div>
                        <div class="techStackContainer">
                            <h3 class="subTitle">Tech Stack</h3>
                            <div class="techChips">
                                ${project.techStack.map(item => `<span class="chip">${item}</span>`).join("")}
                            </div>
                        </div>
                    </div>
                    <div class="projectCol">
                        <h3 class="subTitle">Description</h3>
                        <p class="genreSub">${project.genre}</p>
                        <div class="msgContainer">${project.description}</div>
                        <a href="${project.storeLink}" target="_blank" rel="noopener noreferrer" class="storeLink">View on Steam <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>
                    </div>
                </div>
            </div>
        </section>
        <section id="contributions" class="defaultCard">
            <header class="card-header">
                <span class="file-no">Contributions</span>
                <span class="file-status">${project.title}</span>
            </header>
            <div class="card-body">
                <ul class="stackList">
                    ${project.contributions.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>
        </section>
        <section class="defaultCard">
            <header class="card-header">
                <span class="file-no">Gallery</span>
                <span class="file-status">${project.title}</span>
            </header>
            <div class="card-body">
                <div id="gallery">${project.screenshots.map(imglnk => `<img src="${imglnk}" alt="${project.title}">`).join(" ")}</div>
            </div>
        </section>
    `;
}

// Reverses the card-level entrance animation(s), then removes the element from
// layout once they finish reversing. We only touch the card's own slideInFromTop
// (the element itself for home sections, or its direct .defaultCard children for
// the project-detail wrapper) — the cards' delayed inner animations fade out with
// their card rather than being reversed individually.
function hideElement(el) {
    el.inert = true;
    // The project-detail wrapper has no entrance animation of its own, so reverse
    // its cards' animations instead. Every other element animates itself.
    const targets = el.id === "project-detail-view" ? [...el.querySelectorAll(":scope > .defaultCard")] : [el];
    const anims = targets.flatMap(target => target.getAnimations());
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
        // Consider history.replaceState(state, title, url) as an alternative: same
        // signature as pushState, but it OVERWRITES the current history entry instead
        // of adding a new one — useful when you want to update the URL without
        // creating a new Back step (e.g. redirects or in-place state tweaks).
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
