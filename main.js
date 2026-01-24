/// <reference path="TSDef/p5.global-mode.d.ts" />

"use strict";

// Strings
let titleIntroString = "Hello, world....";
let socialsString = "Socials....";
let overviewString = "Overview...."
let introMsg = "";
let overviewDataMsg = ""

//Files I/O
let introFromFile;
let overviewFromFile;

// Cards and Containers (Cards hold containers?)
let mainCardContainer;
let introCard;
let logoCard;
let overviewCard;
let overviewMsgContainer;
let introContainer
let titleContainer
let msgContainer;
let socialsTitleContainer
let socialsLogoContainer;
let linkedInLogoContainer;  
let twitterLogoContainer;  
let githubLogoContainer;
let profilePicContainer;  

// p.5 Canvas
let sketchCanvas;

// Social Media Icons and Imgs
let linkedinLogo;
let gitHubLogo;
let twitterLogo;
let myPic;

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
    introFromFile = loadStrings("resources/blerb.txt");
    overviewFromFile = loadStrings("resources/overview.txt");
    particleEmitter = new ParticleEmitter(10000);
    tensorFlowField = new TensorFlowField(debug)
}

function setup()
{
    introMsg = introFromFile.join('\n');

    overviewDataMsg = overviewFromFile.join('\n');

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
    // Making DIVS 
    mainCardContainer = createDiv();
    introCard = createDiv();
    logoCard = createDiv();
    overviewCard = createDiv();
    introContainer = createDiv();
    socialsLogoContainer = createDiv();
    linkedInLogoContainer = createDiv();
    twitterLogoContainer = createDiv();
    githubLogoContainer = createDiv();
    profilePicContainer = createDiv();
    overviewMsgContainer = createDiv(overviewDataMsg);
    titleContainer = createDiv("");
    msgContainer = createDiv(introMsg);
    socialsTitleContainer = createDiv("");
    
    // IMG's
    myPic = createImg("imgs/me.jpg");
    linkedinLogo = createImg("imgs/linkedin.png", "");
    gitHubLogo = createImg("imgs/github.png", "");
    twitterLogo = createImg("imgs/twitter.png", "");

    // Adding Classes to DIVS
    mainCardContainer.class("container")
    introCard.class("defaultCard");
    logoCard.class("defaultCard");
    overviewCard.class("defaultCard");
    socialsLogoContainer.class("logoContainer");
    titleContainer.class("titleContainer");
    socialsTitleContainer.class("titleContainer");
    msgContainer.class("msgContainer");
    overviewMsgContainer.class("msgContainer");
    introContainer.class("introContainer");
    profilePicContainer.class("profilePic");
    linkedInLogoContainer.class("socialLogo");
    githubLogoContainer.class("socialLogo");
    twitterLogoContainer.class("socialLogo");
    
    // Setting up hierarchies of DIVS
    mainCardContainer.child(overviewCard);
    mainCardContainer.child(introCard);
    mainCardContainer.child(logoCard);
    logoCard.child(socialsTitleContainer);
    logoCard.child(socialsLogoContainer);
    introContainer.child(titleContainer);
    introContainer.child(msgContainer);
    introCard.child(introContainer);
    linkedInLogoContainer.child(linkedinLogo);
    githubLogoContainer.child(gitHubLogo);
    twitterLogoContainer.child(twitterLogo);
    profilePicContainer.child(myPic);
    overviewCard.child(profilePicContainer);
    overviewCard.child(overviewMsgContainer);

    // Logo Links MORE DIVS
    linkedInProfile = createA("https://www.linkedin.com/in/nabil-babu/", "");
    linkedInProfile.attribute("target", "_blank");
    linkedInProfile.attribute("rel", "noopener noreferrer");
    linkedInProfile.child(linkedInLogoContainer);
    socialsLogoContainer.child(linkedInProfile);

    gitHubProfile = createA("https://github.com/Nabil-Babu", "");
    gitHubProfile.attribute("target", "_blank");
    gitHubProfile.attribute("rel", "noopener noreferrer");
    gitHubProfile.child(githubLogoContainer);
    socialsLogoContainer.child(gitHubProfile);

    twitterProfile = createA("https://twitter.com/Nabil_Babu", "");
    twitterProfile.attribute("target", "_blank");
    twitterProfile.attribute("rel", "noopener noreferrer");
    twitterProfile.child(twitterLogoContainer);
    socialsLogoContainer.child(twitterProfile);

    sketchCanvas.position(windowWidth/2-(sketchCanvas.elt.clientWidth/2), windowHeight/2-(sketchCanvas.elt.clientHeight/2));
    mainCardContainer.position(windowWidth/2-(mainCardContainer.elt.clientWidth/2), windowHeight/2-(mainCardContainer.elt.clientHeight/2))

    // Initialize TypeWriter for main title
    let titleTypeWriter = new TypeWriter(
        titleContainer,
        titleIntroString,
        {
            minDelay: 40,
            maxDelay: 90,
            startDelay: 800,  // Wait for slide-in (0.3s delay + 0.5s duration)
            onComplete: () => console.log("Title typing complete")
        }
    );

    // Initialize TypeWriter for socials title
    let socialsTypeWriter = new TypeWriter(
        socialsTitleContainer,
        socialsString,
        {
            minDelay: 40,
            maxDelay: 90,
            startDelay: 800
        }
    );

    // Start both animations (parallel typing)
    titleTypeWriter.start();
    socialsTypeWriter.start();
}