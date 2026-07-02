"use strict";

// Random quote on load (quote is decorative, so a failed fetch just leaves it empty)
fetch("resources/quotes.txt")
    .then(response => response.text())
    .then(text => {
        let quotes = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);
        let quote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById("quote").textContent = quote;
    })
    .catch(() => {});

// Chained title typewriters: intro -> socials -> projects
let projectTypeWriter = new TypeWriter(
    document.getElementById("projects-title"),
    "Projects...",
    {
        minDelay: 40,
        maxDelay: 90,
        startDelay: 800
    }
);

let socialsTypeWriter = new TypeWriter(
    document.getElementById("socials-title"),
    "Socials...",
    {
        minDelay: 40,
        maxDelay: 90,
        startDelay: 800,
        onComplete: () => projectTypeWriter.start(),
        hideCursorOnComplete: true
    }
);

let titleTypeWriter = new TypeWriter(
    document.getElementById("intro-title"),
    "Hello, world...",
    {
        minDelay: 40,
        maxDelay: 90,
        startDelay: 800,  // Wait for slide-in (0.3s delay + 0.5s duration)
        onComplete: () => socialsTypeWriter.start(),
        hideCursorOnComplete: true
    }
);

titleTypeWriter.start();
