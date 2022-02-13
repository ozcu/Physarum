import './style.css'
import p5 from "p5";
import Particle from "./Particle"
import Trailmap from "./Trailmap"



const sketch = p5 => {

  // Variables scoped within p5
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;

  console.log(p5.windowWidth,p5.windowHeight)

  let cols,rows,resolution

  resolution = 5

  cols = Math.floor(1200 / resolution)
  rows = Math.floor(600 / resolution)

  console.log(cols,rows)

  //Slider Setup

  let depositSlider = p5.createSlider(20, 800, 170, 10);
  depositSlider.position(10, 600);
  depositSlider.style('width', '80px');

  let maxSpeedSlider = p5.createSlider(1, 20, 5.8, 0.1);
  maxSpeedSlider.position(10, 630);
  maxSpeedSlider.style('width', '80px');

  let senseDistSlider = p5.createSlider(1, 20, 7.2, 0.1);
  senseDistSlider.position(10, 660);
  senseDistSlider.style('width', '80px');
  
  //Construct Array
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
  let tm 
  let decayRate = 0.59
    


  let particles = []
  let numParticles = 100

  let depositAmt = 170 //110
  let maxSpeed = 5.8 // 8.8
  let senseDist = 7.2 // 7.2
 
  // Setup function
  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight);


    //Init trailmap
    tm = new Trailmap(
      grid,
      grid,
      decayRate  
      )
      console.log(tm)

    //Init Particles
    for(let i=0;i<numParticles;i++){

    //Spawn particles randomly or in circle
    let x  = cols/2 + p5.random(20) * p5.cos(p5.radians(p5.random(360)));
    let y  = rows/2 + p5.random(20) * p5.sin(p5.radians(p5.random(360)));

    //let x =p5.floor(p5.random(100) * cols / 100) 
    //let y =p5.floor(p5.random(100) * rows / 100) 

    //Init particles
    particles[i] = new Particle(p5.createVector(x,y),depositAmt,maxSpeed,senseDist) 
    
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
    //tm.draw()

    for(let i = 0 ; i<cols; i++){
      for(let j = 0; j<rows; j++){
        if(tm.grid[i][j]> 1){

        let x = i * resolution
        let y = j * resolution

        //Render
          p5.fill(255)
          p5.stroke(0)
          p5.rect(x,y,resolution,resolution)
        }
      }
    }

    //Sliders
    depositAmt = depositSlider.value()
    maxSpeed = maxSpeedSlider.value()
    senseDist = senseDistSlider.value()
    for(let i = 0; i < numParticles; i++){
      particles[i].updateParticle(depositAmt,maxSpeed,senseDist)
    }


    p5.mousePressed = () =>{
      for(let i = 0; i < numParticles; i++){
        particles[i].resetPos();
        console.log(p5.mouseX,p5.mouseY)
      }
     

    }
    
 
  };
};


new p5(sketch)

export default sketch;

p5.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
    
}
