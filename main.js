/// <reference path="TSDef/p5.global-mode.d.ts" />

"use strict";

let titleMsg = "im in_Repair..";
let msgFromFile;
let displayMsg = "";
let mainPanel;
let logoPanel;  
let tensorFlowCanvas;

// Social Media Icons
let linkedinLogo;
let gitHubLogo;
let twitterLogo;

// Social Media links
let linkedInProfile;
let gitHubProfile
let twitterProfile;

//Percentage of the Window that has safe to draw on
let windowSafeZone = 1; 

// Default size of the Canvas
let fieldWidth; 
let fieldHeight; 

// Noise Increment Step
let xInc = 0.1; 
let yInc = 0.1; 
let zInc = 0.0005;

// Noise offsets
let xoff = 0;
let yoff = 0;  
let zOff = 0;

// Flow Field Canvas
let scale = 10;
let cols, rows; 
let flowfield = []; 


let framerate; 

// Particles
let particles = [];
let maxParticles = 3000;


function preload()
{
    msgFromFile = loadStrings("resources/blerb.txt");
    
}

function setup()
{
    msgFromFile.forEach(element => {
        displayMsg += element;   
    });
    ResizeFlowField();
    
    tensorFlowCanvas = createCanvas(fieldWidth, fieldHeight);
    tensorFlowCanvas.style("z-index", "-1");
    
    mainPanel = createDiv();
    mainPanel.class("mainPanel");

    logoPanel = createDiv();
    logoPanel.class("logoPanel");
    
    titleMsg = createElement("div", titleMsg);
    titleMsg.class("title")
    displayMsg = createP(displayMsg);
    
    mainPanel.child(titleMsg);
    mainPanel.child(displayMsg);
    mainPanel.child(logoPanel);

    linkedInProfile = createA("https://www.linkedin.com/in/nabil-babu/", "");
    linkedinLogo = createImg("imgs/linkedin.png", "");
    linkedInProfile.child(linkedinLogo);
    logoPanel.child(linkedInProfile);

    gitHubProfile = createA("https://github.com/Nabil-Babu", "");
    gitHubLogo = createImg("imgs/github.png", "");
    gitHubProfile.child(gitHubLogo);
    logoPanel.child(gitHubProfile);

    twitterProfile = createA("https://twitter.com/Nabil_Babu", "");
    twitterLogo = createImg("imgs/twitter.png", "");
    twitterProfile.child(twitterLogo);
    logoPanel.child(twitterProfile);
    
    framerate = createP();
    framerate.class("frameRate"); 
    
    cols = floor(fieldWidth/scale);  
    rows = floor(fieldHeight/scale);  
    
    InitParticles();
    
    background("#222222");
}

function draw()
{
    // background(0, 0, 0);
    // titleMsg.position(windowWidth/2-(titleMsg.elt.clientWidth/2), windowHeight/2);
    // mainMsg.position(windowWidth/2-(mainMsg.elt.clientWidth/2), windowHeight/2+20);
    
    tensorFlowCanvas.position(windowWidth/2-(tensorFlowCanvas.elt.clientWidth/2), windowHeight/2-(tensorFlowCanvas.elt.clientHeight/2));
    mainPanel.position(windowWidth/2-(mainPanel.elt.clientWidth/2), windowHeight/2-(mainPanel.elt.clientHeight/2))
    DrawFlowField();
    DrawParticles();
    framerate.html(floor(frameRate()));
    
    // DrawVectors();
}

function windowResized() {
    ResizeFlowField();
    resizeCanvas(fieldWidth, fieldHeight);
}

function ResizeFlowField()
{
    fieldWidth = windowWidth * windowSafeZone; 
    fieldHeight = windowHeight * windowSafeZone;
}

function DrawFlowField()
{
    yoff = 0; 
    for (let y = 0; y < rows; y++) {
        xoff = 0;
        for (let x = 0; x < cols; x++) {
            // loop over
            let index = x + y * cols
            let r = noise(xoff, yoff, zOff) * TWO_PI;
            let vec = p5.Vector.fromAngle(r);
            flowfield[index] = vec;
            xoff += xInc;
            //DrawVectors(vec);
        }
        yoff += yInc;
    }
    zOff += zInc;
}

function InitParticles()
{
    for (let i = 0; i < maxParticles; i++) {
        particles[i] = new Particle();
    }
}

function DrawParticles()
{
    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);  
        particles[i].update(); 
        particles[i].edges(); 
        particles[i].show();
    }
}

function DrawVectors()
{
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let index = x + y * cols;
            let vec = flowfield[index]; 
            stroke(100);
            push();
                strokeWeight(1); 
                translate(x * scale, y * scale);
                rotate(vec.heading());
                line(0,0, scale, 0);
            pop();
        }
    } 
}

function mouseMoved()
{
    particles.forEach(element => {
        let mouseVec = createVector(mouseX, mouseY);
        let distance = p5.Vector.dist(mouseVec, element.pos);
        if(distance < 200)
        {
            let force = p5.Vector.sub(mouseVec, element.pos);
            force.mult(100);
            element.applyForce(force); 
        } 
    });
}
