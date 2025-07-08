class Particle
{
    constructor()
    {
        this.pos = createVector(random(width*.95, width),random(height)); 
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxSpeed = random(0.35, 1.0);
        this.color = color(181,244,74, 50); 
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
        strokeWeight(3);
        point(this.pos.x, this.pos.y);
        //circle(this.pos.x, this.pos.y, 5);
    }

    edges()
    {
        let hitEdge = false;

        if (this.pos.x > width) 
        {
            this.pos.x = 0;
            hitEdge = true;
        }
        
        if (this.pos.x < 0)
        {
            this.pos.x = width;
            hitEdge = true;
        } 

        if (this.pos.y > height)
        {
            this.pos.y = 0;
            hitEdge = true;
        }    
        
        if (this.pos.y < 0)
        {
            this.pos.y = height;
            hitEdge = true;
        }
        
        return hitEdge;
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