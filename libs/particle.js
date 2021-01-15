class Particle
{
    constructor()
    {
        this.pos = createVector(random(width*.95, width),random(height)); 
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxSpeed = random(0.05, 0.35);
        this.color = color(181,244,74, 5); 
    }

    update()
    {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0); 
    }

    applyForce(force)
    {
        this.acc.add(force)
    }

    show()
    {
        stroke(this.color);
        strokeWeight(1);
        point(this.pos.x, this.pos.y);
    }

    edges()
    {
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width; 
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    follow(flowfield)
    {
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);
        let index = x + y * cols;
        let force = flowfield[index];
        this.applyForce(force);
    }
}