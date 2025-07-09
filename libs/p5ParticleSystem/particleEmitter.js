class ParticleEmitter
{
    // Particles
    particles = [];
    maxParticles = 0;
    constructor(maxParticles)
    {
        this.maxParticles = maxParticles;
    }

    DrawParticles(tensorFlowField)
    {
        for (let i = 0; i < this.particles.length; i++) 
        {
            // Add force from flow field 
            this.particles[i].follow(tensorFlowField);
            
            // Update particle velocity
            this.particles[i].update();

            // Detect Edges
            this.particles[i].edges();
            
            // Draw Particle
            this.particles[i].show();
        }
    }

    InitParticles()
    {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles[i] = new Particle();
        }
    }
}