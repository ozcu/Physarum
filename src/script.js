import './style.css'
import p5 from "p5";
import Particle from "./Particle"
import Trailmap from "./Trailmap"



const sketch = p5 => {
  const numFrames = 100;

  // Variables scoped within p5
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;

  console.log(p5.windowWidth,p5.windowHeight)

  let cols,rows,resolution

  resolution = 10

  cols = Math.floor(600 / resolution)
  rows = Math.floor(600 / resolution)
  
  //Array
  function make2DArray(cols,rows){
    let arr = new Array(cols)
    for(let i=0;i<arr.length;i++){
      arr[i] = new Array(rows)
    }
    return arr
  }

  //Init Grid
  let grid = make2DArray(cols,rows)
  for(let i = 0 ; i<cols;i++){
    for(let j = 0; j <rows;j++){
      grid[i][j] = 0
    }
  }

//Init trailmap
  let tm = new Trailmap(
    grid,
    grid,
    0.59
    )

  let particles = []
  let numParticles = 100

  console.log(tm)

  // Setup function
  p5.setup = () => {
    p5.createCanvas(600, 600);

    for(let i=0;i<numParticles;i++){

    //Spawn particles randomly or in circle
    let x =p5.floor(p5.random(100) * cols / 100) //cols - p5.random(3) * p5.cos(p5.radians(p5.random(360)))
    let y =p5.floor(p5.random(100) * rows / 100) //rows - p5.random(3) * p5.sin(p5.radians(p5.random(360)))

    //Init particles
    particles[i] = new Particle(p5.createVector(x,y)) 
    
    //Deposit to grid 
    particles[i].deposit(tm);
    }
    console.log(particles[25])
  };

  // Draw function

  p5.draw = () => {
    p5.background(0);

    for(let i = 0; i < numParticles; i++){
      //SENSE
      particles[i].sense(tm);
      //MOVE
      particles[i].move();
      //DEPOSIT
      particles[i].deposit(tm);
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
