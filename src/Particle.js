import p5 from "p5"


export default class Particle{ 
    constructor(pos){
 
      this.pos = pos
    }
  
    //pos = new p5.Vector(this.x,this.y)
    dir = new p5.Vector(0,0)
  
    heading = Math.floor(Math.random(16))  //16 heading
    depositAmt = 170
    maxSpeed = 5.8
    senseDist = 7.2
    
    
    show(){
      p5.stroke(255)
      p5.point(this.pos.x,this.pos.y)
    }
  
    deposit(tm){
      let x = Math.floor(this.pos.x)
      let y = Math.floor(this.pos.y)
      tm.grid[x][y] += this.depositAmt
    }
  
    sense(tm){
      let nextIntensity = 0
      let maxIntensity = 0
      let maxHeading = 0
      let pi =  Math.PI

      for(let i = -1 ; i<2; i++){ //3 options to check
  
        //check for directions relative to heading
        let look = this.heading + i

        //convert it to radians
        let degrees = look * 22.5 // 16 heading
        let radians = degrees * (pi/180);
        let angle = radians
  
        let offset = new p5.Vector.fromAngle(angle).mult(this.senseDist)
  
  
        //Boundaries
        let currentX = Math.floor(this.pos.x + this.offset.x)
        let currentY = this.pos.y + this.offset.y
  
        if(currentX > p5.windowWidth-1){
          currentX = 0;
        } else if(currentX < 0){
          currentX = p5.windowWidth-1;
        }
  
        if(currentY > p5.windowHeight-1){
          currentY = 0;
        } else if(currentY < 0){
          currentY = p5.windowHeight-1;
        }
        //not sure whats going here check later
        nextIntensity = tm.grid[currentX][currentY];
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
      if(pos.x > p5.windowWidth-1){
        pos.x = 0;
      } else if (pos.x < 0){
        pos.x = p5.windowWidth-1;
      }
  
      if(pos.y > p5.windowHeight-1){
        pos.y = 0;
      } else if (pos.y < 0){
        pos.y = p5.windowHeight-1;
      }
    }
  
    resetPos(){
      if(pos.x > p5.windowWidth-1 || pos.x < 0 ||
        pos.y > p5.windowHeight-1 || pos.y < 0){
        pos.x = p5.floor(p5.random(p5.windowWidth));
        pos.y = p5.floor(p5.random(p5.windowHeight));
        dir = p5.Vector.random2D();
      }
    }
  
  }
  