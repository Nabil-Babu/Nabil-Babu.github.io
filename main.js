/// <reference path="TSDef/p5.global-mode.d.ts" />

"use strict";

// Strings
let titleIntroString = "Hello, world...";
let socialsString = "Socials...";
let projectString = "Projects...";
let overviewString = "";
let introMsg = "";
let overviewDataMsg = "";
let quoteString = "";

//Files I/O
let introFromFile;
let overviewFromFile;
let quotesFromFile;

// Cards and Containers (Cards hold containers?)
let mainCardContainer;
let introCard;
let logoCard;
let overviewCard;
let projectCard;
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
let projTitleCont;
let projImgCont;
let raftImgCont;  
let rgirlImgCont;  
let scv66ImgCont;
let quotesCont;  

// p.5 Canvas
let sketchCanvas;

// Social Media Icons and Project Imgs
let linkedinLogo;
let gitHubLogo;
let twitterLogo;
let myPic;
let raftImg;
let rgirlImg;
let scv66Img;

// Social Media links and Steam Links
let linkedInProfile;
let gitHubProfile
let twitterProfile;
let raftSteam;
let rgirlSteam;
let scv66Steam;

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
    quotesFromFile = loadStrings("resources/quotes.txt");
    particleEmitter = new ParticleEmitter(10000);
    tensorFlowField = new TensorFlowField(debug)
}

function setup()
{
    introMsg = introFromFile.join('\n');

    overviewDataMsg = overviewFromFile.join('\n');

    quoteString = quotesFromFile[Math.floor(Math.random() * quotesFromFile.length)];

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

    // Only position if content fits in viewport (desktop behavior)
    if (mainCardContainer.elt.clientHeight < windowHeight - 20) {
        mainCardContainer.position(
            windowWidth/2 - (mainCardContainer.elt.clientWidth/2),
            windowHeight/2 - (mainCardContainer.elt.clientHeight/2)
        );
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
    projectCard = createDiv();
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
    projTitleCont = createDiv("");
    projImgCont = createDiv("");
    raftImgCont = createDiv("");
    rgirlImgCont = createDiv("");
    scv66ImgCont = createDiv("");
    quotesCont = createDiv(quoteString);

    
    // IMG's
    myPic = createImg("imgs/me.jpg");
    linkedinLogo = createImg("imgs/linkedin.png", "");
    gitHubLogo = createImg("imgs/github.png", "");
    twitterLogo = createImg("imgs/twitter.png", "");
    raftImg = createImg("imgs/CloudBazaar.png", "");
    rgirlImg = createImg("imgs/RollerGirl.png", "");
    scv66Img = createImg("imgs/Scaravan66.png", "");

    // Adding Classes to DIVS
    mainCardContainer.class("container")
    introCard.class("defaultCard");
    logoCard.class("defaultCard");
    overviewCard.class("defaultCard");
    projectCard.class("defaultCard");
    socialsLogoContainer.class("logoContainer");
    projImgCont.class("projectImgContainer");
    raftImgCont.class("projectBanner");
    rgirlImgCont.class("projectBanner");
    scv66ImgCont.class("projectBanner");
    titleContainer.class("titleContainer");
    socialsTitleContainer.class("titleContainer");
    projTitleCont.class("titleContainer");
    msgContainer.class("msgContainer");
    overviewMsgContainer.class("msgContainer");
    introContainer.class("introContainer");
    profilePicContainer.class("profilePic");
    linkedInLogoContainer.class("socialLogo");
    githubLogoContainer.class("socialLogo");
    twitterLogoContainer.class("socialLogo");
    quotesCont.class("quotesContainer");
    
    // Setting up hierarchies of DIVS
    mainCardContainer.child(overviewCard);
    mainCardContainer.child(introCard);
    mainCardContainer.child(logoCard);
    mainCardContainer.child(projectCard);
    mainCardContainer.child(quotesCont);
    logoCard.child(socialsTitleContainer);
    logoCard.child(socialsLogoContainer);
    overviewCard.child(profilePicContainer);
    overviewCard.child(overviewMsgContainer);
    projectCard.child(projTitleCont);
    projectCard.child(projImgCont);
    introContainer.child(titleContainer);
    introContainer.child(msgContainer);
    introCard.child(introContainer);
    linkedInLogoContainer.child(linkedinLogo);
    githubLogoContainer.child(gitHubLogo);
    twitterLogoContainer.child(twitterLogo);
    profilePicContainer.child(myPic);
    raftImgCont.child(raftImg);
    rgirlImgCont.child(rgirlImg);
    scv66ImgCont.child(scv66Img);

    // Socials and Project Links MORE DIVS
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

    raftSteam = createA("https://store.steampowered.com/app/2222920/The_Cloud_Bazaar/","");
    raftSteam.attribute("target", "_blank");
    raftSteam.attribute("rel", "noopener noreferrer");
    raftSteam.child(raftImgCont);

    rgirlSteam = createA("https://store.steampowered.com/app/2828540/RollerGirl/","");
    rgirlSteam.attribute("target", "_blank");
    rgirlSteam.attribute("rel", "noopener noreferrer");
    rgirlSteam.child(rgirlImgCont);
    
    scv66Steam = createA("https://store.steampowered.com/app/3238240/Scaravan_66/","");
    scv66Steam.attribute("target", "_blank");
    scv66Steam.attribute("rel", "noopener noreferrer");
    scv66Steam.child(scv66ImgCont);
    
    projImgCont.child(scv66Steam);
    projImgCont.child(rgirlSteam);
    projImgCont.child(raftSteam);
    
    sketchCanvas.position(windowWidth/2-(sketchCanvas.elt.clientWidth/2), windowHeight/2-(sketchCanvas.elt.clientHeight/2));

    let titleTypeWriter = new TypeWriter(
        titleContainer,
        titleIntroString,
        {
            minDelay: 40,
            maxDelay: 90,
            startDelay: 800,  // Wait for slide-in (0.3s delay + 0.5s duration)
            onComplete: () => socialsTypeWriter.start(),
            hideCursorOnComplete: true
        }
    );

    let socialsTypeWriter = new TypeWriter(
        socialsTitleContainer,
        socialsString,
        {
            minDelay: 40,
            maxDelay: 90,
            startDelay: 800,
            onComplete: () => projectTypeWriter.start(),
            hideCursorOnComplete: true
        }
    );

    let projectTypeWriter = new TypeWriter(
        projTitleCont,
        projectString,
        {
            minDelay: 40,
            maxDelay: 90,
            startDelay: 800
        }
    )

    titleTypeWriter.start();
}