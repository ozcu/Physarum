export default class Trailmap{
    grid
    buffer
    decayrate
  
    trailmap(){
    grid = new Array[p5.width][p5.height]
    buffer = new Array[p5.width][p5.height]
    decayRate = 0.59
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