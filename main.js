/// <reference path="TSDef/p5.global-mode.d.ts" />

"use strict";

// Strings
let titleMsg = "im in_Repair...";
let msgFromFile;
let displayMsg = "";

// Panels and Containers
let mainPanel;
let titleContainer
let msgContainer;
let logoBanner;  

let sketchCanvas;

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
let canvasWidth; 
let canvasHeight; 

// Particle Emitter
let particleEmitter;

// Tensor Flow Field
let tensorFlowField;

// DEBUG
let debug = false;
let framerate;  

function preload()
{
    msgFromFile = loadStrings("resources/blerb.txt");
    particleEmitter = new ParticleEmitter(10000);
    tensorFlowField = new TensorFlowField(debug)
}

function setup()
{
    msgFromFile.forEach(element => {
        displayMsg += element;   
    });

    canvasWidth = windowWidth * windowSafeZone; 
    canvasHeight = windowHeight * windowSafeZone;
  
    sketchCanvas = createCanvas(canvasWidth, canvasHeight);
    sketchCanvas.style("z-index", "-1");
    
    SetupWelcomeHTML();
    
    framerate = createP();
    framerate.class("frameRate"); 

    particleEmitter.InitParticles();
    tensorFlowField.GenerateFlowField(canvasWidth, canvasHeight);

    background('#00060e');
}

function draw()
{   
    background('#00060e');
    
    particleEmitter.DrawParticles(tensorFlowField);
    tensorFlowField.Draw();
    
    if(debug)
    {
        if(frameCount % 4 == 0)
        {
            framerate.html(floor(frameRate()));
        }
    }

    if(mouseIsPressed)
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
}

function windowResized() 
{
    canvasWidth = windowWidth * windowSafeZone; 
    canvasHeight = windowHeight * windowSafeZone;
    resizeCanvas(canvasWidth, canvasHeight);
}

function SetupWelcomeHTML() 
{

    mainPanel = createDiv();
    logoBanner = createDiv();
    titleContainer = createDiv(titleMsg);
    msgContainer = createDiv(displayMsg);

    mainPanel.class("mainCard");
    logoBanner.class("logoContainer");
    titleContainer.class("titleContainer");
    msgContainer.class("msgContainer");
    
    mainPanel.child(titleContainer);
    mainPanel.child(msgContainer);
    mainPanel.child(logoBanner);

    linkedInProfile = createA("https://www.linkedin.com/in/nabil-babu/", "");
    linkedInProfile.attribute("target", "_blank");
    linkedInProfile.attribute("rel", "noopener noreferrer");
    linkedinLogo = createImg("imgs/linkedin.png", "");
    linkedInProfile.child(linkedinLogo);
    logoBanner.child(linkedInProfile);

    gitHubProfile = createA("https://github.com/Nabil-Babu", "");
    gitHubProfile.attribute("target", "_blank");
    gitHubProfile.attribute("rel", "noopener noreferrer");
    gitHubLogo = createImg("imgs/github.png", "");
    gitHubProfile.child(gitHubLogo);
    logoBanner.child(gitHubProfile);

    twitterProfile = createA("https://twitter.com/Nabil_Babu", "");
    twitterProfile.attribute("target", "_blank");
    twitterProfile.attribute("rel", "noopener noreferrer");
    twitterLogo = createImg("imgs/twitter.png", "");
    twitterProfile.child(twitterLogo);
    logoBanner.child(twitterProfile);

    sketchCanvas.position(windowWidth/2-(sketchCanvas.elt.clientWidth/2), windowHeight/2-(sketchCanvas.elt.clientHeight/2));
    mainPanel.position(windowWidth/2-(mainPanel.elt.clientWidth/2), windowHeight/2-(mainPanel.elt.clientHeight/2))
}