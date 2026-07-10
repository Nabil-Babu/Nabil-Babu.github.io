# My Portfolio Website

My personal portfolio site. I'm a game programmer in the Toronto area, and this
is where I show the games I've worked on and a bit of who I am. It's hand-coded
in plain HTML, CSS, and JavaScript, as a challenge for myself to learn raw 
and dirty web dev. The landing page runs a live [p5.js](https://p5js.org) 
particle simulation in the background. I am a fan of the library to draw in code.

**Live:** [nabilbabu.com](https://nabilbabu.com) · hosted on GitHub Pages

## The Stack

| Concern        | Choice                         |
| -------------- | ------------------------------ |
| Markup / style | Plain HTML5 + CSS              |
| Behaviour      | Vanilla JavaScript             |
| Simulation     | [p5.js](https://p5js.org)      |
| Hosting        | GitHub Pages + custom domain   |
| Build step     | None                           |

---

## File Structure

```text
Nabil-Babu.github.io/
├─> index.html              
├─> src/                    
│   ├─> css/
│   │   └─> style.css
│   └── js/
│       ├─> main.js                 # p5.js sketch
│       ├─> site.js                 # Page behaviour
│       ├─> projects/               # Project-showcase feature
│       │   ├─> projects.js         # Routing + detail-view rendering
│       │   └─> projects-data.js    # Project content should be JSON?
│       └─> sketch/                 # Creative-coding background
│           ├─> TensorFlowField.js  # Noise-based flow field
│           ├─> typewriter.js       # Typewriter effect, classic 
│           └─> particles/
│               ├─> particle.js
│               └─> particleEmitter.js
├─> vendor/                 
│   └─> p5.min.js           # p5.js library minified
├─> assets/                 
│   ├─> images/
│   │   ├─> icons/          
│   │   ├─> projects/       
│   │   ├─> screenshots/    
│   │   └─> me.jpg
│   └── data/
│       └─> quotes.txt      # Some quotes I like :) 
└─> types/                  # p5.js TypeScript defs
    ├─> p5.d.ts
    └─> p5.global-mode.d.ts
```

## Why Did I Do This?..

I wanted to keep the site small and grow it little by little as learn more about
web development. This also makes it easy to update and add more information whenever
I want. I can also port it to another hosting location or even self-host it
very easily.
---

## Running it locally(if you want...)
If you have Python
```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

Or just use the **Live Server** extension in VS Code, duh

## License
Released under the [MIT License](LICENSE) — © 2021 Nabil Babu.
