import p5 from "p5"


export default class Trailmap{
    constructor(grid,buffer,decayRate){
        this.grid = grid
        this.buffer = buffer
        this.decayRate = decayRate
    }

    cols = 600 // trailmap/grid feature refactor later
    rows = 300

  
    draw(){
  
     /* for(let i = 0 ; i<this.cols; i++){
        for(let j = 0; j<this.rows; j++){

          if(this.grid[i][j] > 1){

            this.grid[i][j] = 5
          }
        }
      } */

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
      //p5.loadPixels();
      for(let x = 0; x < this.cols; x++){
        for(let y = 0; y < this.rows; y++){
          let sum = 0
          let avg = 0
          let total = 0
  
          for(let kx = -1; kx < 2; kx++){
            for(let ky = -1; ky < 2; ky++){
  
              let currentX,currentY
              //wrap x; 
              if(x== this.cols-1){
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
              total =total+1;
  
            }
          }
          avg = sum / 9.0; //9 cells?
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
  
    clearBuffer(){
      for(let x = 0; x< this.cols;x++){
        for(let y = 0; y< this.rows; y++){
          this.buffer[x][y] = 0;
        }
      }
    }
  
  }