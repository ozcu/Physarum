import p5 from "p5"

export default class Particle{ 
    constructor(pos,depositAmt,maxSpeed,senseDist){
 
      this.pos = pos
      this.depositAmt = depositAmt
      this.maxSpeed = maxSpeed
      this.senseDist = senseDist
    }

    dir = new p5.Vector(0,0)
  
    heading = Math.floor(16 * Math.random())  //16 heading


    cols = 240 // trailmap/grid feature refactor later
    rows = 120

    
    
    show(){
      //pushStyle();
      //stroke(255);
      //point(pos.x,pos.y);
      //popStyle();
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
        let degrees = look * 22.5 // 16 heading dir
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

      this.pos.x = Math.floor(this.cols * Math.random());
      this.pos.y = Math.floor(this.rows * Math.random());
      this.dir.x = Math.floor(this.cols * Math.random());
      this.dir.y = Math.floor(this.rows * Math.random());
    }

    updateParticle(depositAmt,maxSpeed){
      this.depositAmt = depositAmt
      this.maxSpeed = maxSpeed
    }

  
  }
  