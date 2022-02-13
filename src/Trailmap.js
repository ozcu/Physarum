import p5 from "p5"

//p5.loadPixels()
export default class Trailmap{
    constructor(grid,buffer,decayRate,cols,rows){
        this.grid = grid
        this.buffer = buffer
        this.decayRate = decayRate
        this.cols = cols
        this.rows = rows
    }


  //what if arrow function?
    draw(){
  

    /*  CANNOT FUNCTION WITH LOAD PIXELS
      p5.loadPixels()
      for(let x = 0; x < p5.windowWidth; x++){
        for(let y = 0; y < p5.windowHeight; y++){
          let i = y * p5.windowWidth + x;
          pixels[i] = p5.color(tm.grid[x][y]); //not sure whats going on
        }
      }
      p5.updatePixels();*/

    }
  
    diffuse(){
      //p5.loadPixels()
      for(let x = 0; x < this.cols; x++){
        for(let y = 0; y < this.rows; y++){
          let sum = 0
          let avg = 0
          let total = 0
  
          for(let kx = -1; kx < 2; kx++){
            for(let ky = -1; ky < 2; ky++){
  
              let currentX,currentY
              //wrap x; 
              if(x == this.cols-1){
                currentX = 0;
              } else if(x==0){
                currentX = this.cols-1;
              } else {
                currentX = kx+x;
              }
              //wrap y
              if(y== this.rows-1){
                currentY = 0;
              } else if(y==0){
                currentY = this.rows-1;
              } else {
                currentY = ky+y;
              }
  
              let intensity = this.grid[currentX][currentY];
              sum += intensity;
  
            }
          }
          avg = sum / 9.0; //9 cells

          //write average to a buffer grid
          this.buffer[x][y] = avg;
        }
      }
      //write buffer grid onto draw grid
      for(let x = 0; x < this.cols; x++){
        for(let y = 0; y< this.rows; y++){
          this.grid[x][y] = this.buffer[x][y];
        }
      }
      //this.clearBuffer()
    }
  
    decay(){
      for(let x = 0; x < this.cols; x++){
        for(let y = 0; y < this.rows; y++){
          this.grid[x][y] *= this.decayRate;
        }
      }
    }
   //Cannot load pixels not needed now
    clearBuffer(){
      for(let x = 0; x< this.cols;x++){
        for(let y = 0; y< this.rows; y++){
          this.buffer[x][y] = 0;
        }
      }
    }
  
  }