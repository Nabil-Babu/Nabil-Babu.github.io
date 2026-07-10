/// <reference path="../../types/p5.global-mode.d.ts" />

"use strict";

// Percentage of the Window that is safe to draw on
let windowSafeZone = 1;

// p.5 Canvas
let sketchCanvas;
let canvasWidth;
let canvasHeight;

// Particle Emitter
let particleEmitter;

// Tensor Flow Field
let tensorFlowField;

let debug = false;
let framerate;

function setup()
{
    canvasWidth = windowWidth * windowSafeZone;
    canvasHeight = windowHeight * windowSafeZone;

    sketchCanvas = createCanvas(canvasWidth, canvasHeight);
    sketchCanvas.parent("canvas-container");

    particleEmitter = new ParticleEmitter(10000);
    particleEmitter.InitParticles();

    tensorFlowField = new TensorFlowField(debug);
    tensorFlowField.GenerateFlowField(canvasWidth, canvasHeight);

    if(debug)
    {
        framerate = createP();
        framerate.class("frameRate");
    }

    background('#00060e');
}

function draw()
{
    background('#00060e');

    particleEmitter.DrawParticles(tensorFlowField);
    tensorFlowField.Draw();

    if(debug && frameCount % 4 == 0)
    {
        framerate.html(floor(frameRate()));
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
    tensorFlowField.GenerateFlowField(canvasWidth, canvasHeight);
}
