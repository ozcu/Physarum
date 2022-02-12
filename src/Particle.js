//Particle Class
export default class Particle{ //extends p5 doesnt work ? 

    constructor(x,y){
      this.x = x
      this.y = y
    }
    
    pos = new p5.Vector(this.x,this.y)
    dir = new p5.Vector(0,0)
  
    heading = Math.floor(Math.random(16))
    depositAmt = 170
    maxSpeed = 5.8
    senseDist = 7.2
    
    
    show(){
  
      p5.stroke(255)
      p5.point(pos.x,pos.y)
    }
  
    deposit(tm){
      let x = Math.floor(this.pos.x)
      let y = Math.floor(this.pos.y)
      console.log(tm.grid) //grid is undefined
      tm.grid[x][y] += depositAmt
    }
  
    sense(tm){
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
  