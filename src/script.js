import './style.css'
import p5 from "p5";
import Particle from "./Particle"
import Trailmap from "./Trailmap"



const sketch = p5 => {
  const numFrames = 100;

  // Variables scoped within p5
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;

 
  // make library globally available
  window.p5 = p5;

  let tm = new Trailmap()
  console.log(tm)
  let particles = []
  let numParticles = 1000

  // Setup function
  p5.setup = () => {
    p5.createCanvas(600, 400);

    for(let i=0;i<numParticles;i++){

    //Spawn particles in circle
    let x = p5.width/2 + p5.random(100) * p5.cos(p5.radians(p5.random(360)))
    let y = p5.height/2 + p5.random(100) * p5.sin(p5.radians(p5.random(360)))
    particles[i] = new Particle(x,y) 
    //Initialize trailmap
    particles[i].deposit(tm);
    }
    
  
  };

  // Draw function

  p5.draw = () => {
    p5.background(0);

    for(let i = 0; i < numParticles; i++){
      //SENSE
      particles[i].sense(t);
      //MOVE
      particles[i].move();
      //DEPOSIT
      particles[i].deposit(t);
    }
  

    //Diffuse
    tm.diffuse()
    //Decay
    tm.decay()
    //Render
    tm.draw()

    //var t=0.5*(p5.frameCount-1)/numFrames;
 
  };
};


new p5(sketch)

export default sketch;

p5.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
    
}
