class Particle
{
    // Public Fields
    pos;
    vel;
    acc;
    maxSpeed = 0;
    color1;
    color2;
    enableColorLerp = true;
    
    // Private Fields
    #activeColor;

    constructor()
    {
        this.pos = createVector(random(width*.99, width),random(height*0.05, height-(height*0.05))); 
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxSpeed = random(0.15, 0.9);
        this.color1 = color('#fee9017c');
        this.color2 = color("#54c1e675");
        this.#activeColor = this.color1;
    }

    update()
    {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        if(this.enableColorLerp)
        {
            this.#activeColor = lerpColor(this.color2, this.color1, this.pos.x/width);
        }
    }

    applyForce(force)
    {
        this.acc.add(force)
    }

    show()
    {
        stroke(this.#activeColor);
        strokeWeight(3);
        point(this.pos.x, this.pos.y);
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

    follow(tensorFlowField)
    {
        let x = floor(this.pos.x / tensorFlowField.cellSize);
        let y = floor(this.pos.y / tensorFlowField.cellSize);
        let index = x + y * tensorFlowField.tensorFlowCols;
        let force = tensorFlowField.flowfield[index];
        this.applyForce(force);
    }
}