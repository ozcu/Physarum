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

    cols = 600 // trailmap/grid feature refactor later
    rows = 300

    
    
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


      for(let i = -1 ; i<2; i++){ //3 options to check
  
        //check for directions relative to heading
        let look = this.heading + i

        //convert it to radians
        let degrees = look * 22.5 // 16 heading
        let radians = degrees * (Math.PI/180);
        let angle = radians
  
        let offset = new p5.Vector.fromAngle(angle).mult(this.senseDist)
        
        
        //Boundaries
        let currentX = Math.floor(this.pos.x + offset.x) 
        let currentY = Math.floor(this.pos.y + offset.y)
  
        if(currentX > this.cols-1){
          currentX = 0;
        } else if(currentX < 0){
          currentX = this.cols-1;
        }
  
        if(currentY > this.rows-1){
          currentY = 0;
        } else if(currentY < 0){
          currentY = this.rows-1;
        }
        //not sure whats going here check later
        nextIntensity = tm.grid[currentX][currentY];
          if(maxIntensity < nextIntensity){
            maxIntensity = nextIntensity;
            this.dir.x = offset.x;
            this.dir.y = offset.y;
            this.dir.setMag(this.maxSpeed);
            maxHeading = i;
          }
        }
        this.heading += maxHeading
  
    }
  
    move(){
      this.pos.add(this.dir)
  
      //Boundaries
      if(this.pos.x > this.cols-1){
        this.pos.x = 0;
      } else if (this.pos.x < 0){
        this.pos.x = this.cols-1;
      }
  
      if(this.pos.y > this.rows-1){
        this.pos.y = 0;
      } else if (this.pos.y < 0){
        this.pos.y = this.rows-1;
      }
    }
  
    resetPos(){
      if(this.pos.x > this.cols-1 || this.pos.x < 0 ||
        this.pos.y > this.rows-1 || this.pos.y < 0){
          this.pos.x = p5.floor(p5.random(this.cols));
          this.pos.y = p5.floor(p5.random(this.rows));
          this.dir = p5.Vector.random2D();
      }
    }

    reset(){
      this.pos = p5.Vector(random(60),random(60))
    }
  
  }
  