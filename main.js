/// <reference path="TSDef/p5.global-mode.d.ts" />

"use strict";

let titleMsg = "im in_Repair..";
let msgFromFile;
let displayMsg = "";
let mainPanel;
let logoPanel;  
let tensorFlowCanvas;
let clearBackground = true;
let updateParticles = true;

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
let tensorFlowCols, tensorFlowRows; 
let flowfield = []; 
let framerate; 

// Particle Emitter
let particleEmitter;

// DEBUG
let debug = false; 

function preload()
{
    msgFromFile = loadStrings("resources/blerb.txt");
    debug = true;
    particleEmitter = new ParticleEmitter(12000);
}

function setup()
{
    msgFromFile.forEach(element => {
        displayMsg += element;   
    });
    ResizeFlowField();
  
    tensorFlowCanvas = createCanvas(fieldWidth, fieldHeight);
    tensorFlowCanvas.style("z-index", "-1");
    
    SetupWelcomeHTML();
    
    framerate = createP();
    framerate.class("frameRate"); 
    
    tensorFlowCols = floor(fieldWidth/scale);  
    tensorFlowRows = floor(fieldHeight/scale);  

    particleEmitter.InitParticles();

    GenerateFlowField();
    background("#222222");
}

function draw()
{   
    if(clearBackground)
    {
        background("#222222");
    }
    
    particleEmitter.DrawParticles(flowfield);

    if(debug)
    {
        //DrawVectors();
        if(frameCount % 10 == 0)
        {
            framerate.html(floor(frameRate()));
            console.log(floor(frameRate()));
        }
    }
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

function GenerateFlowField()
{
    yoff = 0; 
    for (let y = 0; y < tensorFlowRows; y++) {
        xoff = 0;
        for (let x = 0; x < tensorFlowCols; x++) {
            // loop over
            let index = x + y * tensorFlowCols
            let r = noise(xoff, yoff, zOff) * TWO_PI;
            let vec = p5.Vector.fromAngle(r);
            flowfield[index] = vec;
            xoff += xInc;
        }
        yoff += yInc;
    }
    zOff += zInc;
}

function DrawVectors()
{
    for (let y = 0; y < tensorFlowRows; y++) {
        for (let x = 0; x < tensorFlowCols; x++) {
            let index = x + y * tensorFlowCols;
            let vec = flowfield[index]; 
            stroke(0,100,0);
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
    particleEmitter.particles.forEach(element => {
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

function SetupWelcomeHTML() {
    mainPanel = createDiv();
    mainPanel.class("mainPanel");

    logoPanel = createDiv();
    logoPanel.class("logoPanel");

    titleMsg = createElement("div", titleMsg);
    titleMsg.class("title");
    displayMsg = createP(displayMsg);

    mainPanel.child(titleMsg);
    mainPanel.child(displayMsg);
    mainPanel.child(logoPanel);

    linkedInProfile = createA("https://www.linkedin.com/in/nabil-babu/", "");
    linkedInProfile.attribute("target", "_blank");
    linkedInProfile.attribute("rel", "noopener noreferrer");
    linkedinLogo = createImg("imgs/linkedin.png", "");
    linkedInProfile.child(linkedinLogo);
    logoPanel.child(linkedInProfile);

    gitHubProfile = createA("https://github.com/Nabil-Babu", "");
    gitHubProfile.attribute("target", "_blank");
    gitHubProfile.attribute("rel", "noopener noreferrer");
    gitHubLogo = createImg("imgs/github.png", "");
    gitHubProfile.child(gitHubLogo);
    logoPanel.child(gitHubProfile);

    twitterProfile = createA("https://twitter.com/Nabil_Babu", "");
    twitterProfile.attribute("target", "_blank");
    twitterProfile.attribute("rel", "noopener noreferrer");
    twitterLogo = createImg("imgs/twitter.png", "");
    twitterProfile.child(twitterLogo);
    logoPanel.child(twitterProfile);

    tensorFlowCanvas.position(windowWidth/2-(tensorFlowCanvas.elt.clientWidth/2), windowHeight/2-(tensorFlowCanvas.elt.clientHeight/2));
    mainPanel.position(windowWidth/2-(mainPanel.elt.clientWidth/2), windowHeight/2-(mainPanel.elt.clientHeight/2))
}