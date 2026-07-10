class TensorFlowField
{
    // Noise Increment Step
    xInc = 0.1; 
    yInc = 0.1; 
    zInc = 0.0005;
    
    // Noise offsets
    xoff = 0;
    yoff = 0;  
    zOff = 0;

    // Flow Field
    tensorFlowCols = 0; 
    tensorFlowRows = 0; 
    flowfield = [];
    cellSize = 10;
    
    // DEBUG
    debug = false;

    constructor(debug)
    {
        this.debug = debug;
    }

    Draw()
    {
        if(this.debug)
        {
            this.DrawVectors()
        }
    }

    GenerateFlowField(canvasWidth, canvasHeight)
    {

        this.zOff = random(0, 1000);
        this.tensorFlowCols = ceil(canvasWidth/this.cellSize);  
        this.tensorFlowRows = ceil(canvasHeight/this.cellSize)+1;  

        this.yoff = 0; 
        for (let y = 0; y < this.tensorFlowRows; y++) {
            this.xoff = 0;
            for (let x = 0; x < this.tensorFlowCols; x++) {
                // loop over
                let index = x + y * this.tensorFlowCols
                let r = noise(this.xoff, this.yoff, this.zOff) * TWO_PI;
                let vec = p5.Vector.fromAngle(r);
                this.flowfield[index] = vec;
                this.xoff += this.xInc;
            }
            this.yoff += this.yInc;
        }
        this.zOff += this.zInc;
    }

    DrawVectors()
    {
        for (let y = 0; y < this.tensorFlowRows; y++) {
            for (let x = 0; x < this.tensorFlowCols; x++) {
                let index = x + y * this.tensorFlowCols;
                let vec = this.flowfield[index]; 
                stroke(0,100,0);
                push();
                    strokeWeight(1); 
                    translate(x * this.cellSize, y * this.cellSize);
                    rotate(vec.heading());
                    line(0,0, this.cellSize, 0);
                pop();
            }
        } 
    }
}