"use strict";

// Random quote on load (quote is decorative, so a failed fetch just leaves it empty)
fetch("assets/data/quotes.txt")
    .then(response => response.text())
    .then(text => {
        let quotes = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);
        let quote = quotes[Math.floor(Math.random() * quotes.length)];

    
        let sep = quote.lastIndexOf(" - ");
        let quoteText = sep === -1 ? quote : quote.slice(0, sep);
        let author = sep === -1 ? "" : quote.slice(sep + 3);

        let quoteEl = document.getElementById("quote");
        quoteEl.replaceChildren();

        let textEl = document.createElement("span");
        textEl.className = "quoteText";
        textEl.textContent = quoteText;
        quoteEl.appendChild(textEl);

        if (author) {
            let authorEl = document.createElement("cite");
            authorEl.className = "quoteAuthor";
            authorEl.textContent = "-"+author;
            quoteEl.appendChild(authorEl);
        }
    })
    .catch(() => {});

// Intro heading types itself out on load. (Socials/Projects titles became
// static dossier header-bar labels in the redesign, so their typewriters were
// removed.)
let titleTypeWriter = new TypeWriter(
    document.getElementById("intro-title"),
    "Hello, world...",
    {
        minDelay: 40,
        maxDelay: 90,
        startDelay: 800,  // Wait for slide-in (0.3s delay + 0.5s duration)
        hideCursorOnComplete: true
    }
);

titleTypeWriter.start();
