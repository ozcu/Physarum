import './style.css'
import p5 from "p5";



const sketch = p5 => {
  const numFrames = 100;

  

  // Variables scoped within p5
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;

 
  // make library globally available
  window.p5 = p5;

  let t = new Trailmap()
  let particles = []
  let numParticles = 1000

  // Setup function
  p5.setup = () => {
    p5.createCanvas(600, 400);

    for(let i=0;i<numParticles;i++){

    //Spawn particles in circle
    let x = p5.width/2 + p5.random(100) * p5.cos(p5.radians(p5.random(360)))
    let y = p5.height/2 + p5.random(100) * p5.sin(p5.radians(p5.random(360)))
    particles[i] = new Particle.instance(x,y)
    //Initialize trailmap
    particles[i].deposit(t);
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
    t.diffuse()
    //Decay
    t.decay()
    //Render
    t.draw()

  var t=0.5*(p5.frameCount-1)/numFrames;
 
  };
};

//Particle Class
class Particle{

  dir = new p5.Vector()
  pos = new p5.Vector()
  heading
  maxSpeed

  depositAmnt
  senseDist

  instance(x,y){
    pos = new p5.Vector(x,y)
    dir = new p5.Vector(0,0)

    heading = p5.floor(random(16))

    depositAmt = 170
    maxSpeed = 5.8
    senseDist = 7.2
  }

  show(){

    p5.stroke(255)
    p5.point(pos.x,pos.y)
  }

  deposit(Trailmap){
    let x = p5.floor(pos.x)
    let y = p5.floor(pos.y)

    Trailmap().grid[x][y] += depositAmt
  }

  sense(Trailmap){
    let nextIntensity = 0
    let maxIntensity = 0
    let maxHeading = 0

    for(let i = -1 ; i<2; i++){

      //check for directions relative to heading
      let look = heading + i

      //convert it to radians
      let angle = p5.radians(look*22.5)

      let offset = new p5.Vector.fromAngle(angle).mult(this.senseDist)


      //Boundaries
      let currentX = pos.x + offset.x
      let currentY = pos.y + offset.y

      if(currentX > p5.width-1){
        currentX = 0;
      } else if(currentX < 0){
        currentX = p5.width-1;
      }

      if(currentY > p5.height-1){
        currentY = 0;
      } else if(currentY < 0){
        currentY = p5.height-1;
      }
      //not sure whats going here
      nextIntensity = Trailmap().grid[currentX][currentY];
        if(maxIntensity < nextIntensity){
          maxIntensity = nextIntensity;
          dir.x = offset.x;
          dir.y = offset.y;
          dir.setMag(this.maxSpeed);
          maxHeading = i;
        }
      }
      this.heading += maxHeading

  }

  move(){
    pos.add(dir)

    //Boundaries
    if(pos.x > p5.width-1){
      pos.x = 0;
    } else if (pos.x < 0){
      pos.x = p5.width-1;
    }

    if(pos.y > p5.height-1){
      pos.y = 0;
    } else if (pos.y < 0){
      pos.y = p5.height-1;
    }
  }

  resetPos(){
    if(pos.x > p5.width-1 || pos.x < 0 ||
      pos.y > p5.height-1 || pos.y < 0){
      pos.x = p5.floor(p5.random(p5.width));
      pos.y = p5.floor(p5.random(p5.height));
      dir = p5.Vector.random2D();
    }
  }

}


//Trailmap Class
class Trailmap{
  decayRate
  grid
  buffer

  trailmap(){
    grid = new Array[p5.width][p5.height]
    buffer = new Array[p5.width][p5.height]
    this.decayRate = 0.59
  }

  draw(){
    p5.loadPixels()
    for(let x = 0; x < p5.width; x++){
      for(let y = 0; y < p5.height; y++){
        let i = y * p5.width + x;
        pixels[i] = p5.color(t.grid[x][y]); //not sure whats going on
      }
    }
    p5.updatePixels();
  }

  diffuse(){
    loadPixels();
    for(let x = 0; x < p5.width; x++){
      for(let y = 0; y < p5.height; y++){
        let sum = 0
        let avg = 0
        let total = 0

        for(let kx = -1; kx < 2; kx++){
          for(let ky = -1; ky < 2; ky++){

            let currentX,currentY
            //wrap x; 
            if(x== p5.width-1){
              currentX = 0;
            } else if(x==0){
              currentX = p5.width-1;
            } else {
              currentX = kx+x;
            }
            //wrap y
            if(y== p5.height-1){
              currentY = 0;
            } else if(y==0){
              currentY = p5.height-1;
            } else {
              currentY = ky+y;
            }

            let intensity = grid[currentX][currentY];
            sum += intensity;
            total ++;

          }
        }
        avg = sum / 9.0;
        //write average to a buffer grid
        buffer[x][y] = avg;
      }
    }
    //write buffer grid onto draw grid
    for(let x = 0; x < p5.width; x++){
      for(let y = 0; y< p5.height; y++){
        grid[x][y] = buffer[x][y];
      }
    }
    clearBuffer()
  }

  decay(){
    for(let x = 0; x < p5.width; x++){
      for(let y = 0; y < p5.height; y++){
        grid[x][y] *= this.decayRate;
      }
    }
  }

  clearBuffer(){
    for(let x = 0; x< p5.width;x++){
      for(let y = 0; y< p5.height; y++){
        buffer[x][y] = 0;
      }
    }
  }



}




new p5(sketch)

export default sketch;

p5.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
    
}
