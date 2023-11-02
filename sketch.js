var grid;
var next;

var dA = 1; dB = 0.5;
size = 500;
var feed = 0.055;
var k = 0.062;
var timestep = 1.15;

function setup() {
  createCanvas(size, size);
  pixelDensity(1);
  grid = [];
  next = [];
  for (var x = 0; x < width; x++){
    grid[x] = []; 
    next[x] = [];
    for (var y = 0; y < height; y++){
      grid[x][y] = {a: 1, b: 0};
      next[x][y] = {a: 1, b: 0};
    }
  }

  for(var i=100; i<110; i++){
    for(var j=100; j<110; j++){
      grid[i][j].b = 1;
    }
  }
  for(var i=200; i<210; i++){
    for(var j=200; j<210; j++){
      grid[i][j].b = 1;
    }
  }
  
}

function draw() {
  background(51);

  for(var x = 1; x < width - 1; x++){
    for(var y = 1; y < height - 1; y++){
      var a = grid[x][y].a; 
      var b = grid[x][y].b;
      next[x][y].a = a + 
        ((dA * laPlaceA(x,y)) - 
        (a*b*b )+ 
        (feed*(1-a)))*timestep;

      next[x][y].b = b + 
        ((dB * laPlaceB(x,y)) + 
        (a*b*b ) - 
        ((k + feed)*b))*timestep;

      next[x][y].a = constrain(next[x][y].a,0,1);
      next[x][y].b = constrain(next[x][y].b,0,1);
    }
  }

  loadPixels();
  for(var x=0; x < width; x++){
    for(var y=0; y < height; y++){
      var pix = (x + y * width) * 4;
      var a = next[x][y].a;        
      var b = next[x][y].b;
      var c = floor((a-b)*255);
      c = constrain(c, 0, 255);
      pixels[pix + 0] = c;
      pixels[pix + 1] = c;
      pixels[pix + 2] = c;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  swap();
}

function laPlaceA(x, y){
  var sum=0;
  sum += grid[x][y].a * -1;
  sum += grid[x-1][y].a * 0.2;
  sum += grid[x+1][y].a * 0.2;
  sum += grid[x][y+1].a * 0.2;
  sum += grid[x][y-1].a * 0.2;
  sum += grid[x-1][y-1].a * 0.05;
  sum += grid[x-1][y+1].a * 0.05;
  sum += grid[x+1][y-1].a * 0.05;
  sum += grid[x+1][y+1].a * 0.05;

  return sum;
}

function laPlaceB(x, y){
  var sum=0;
  sum += grid[x][y].b * -1;
  sum += grid[x-1][y].b * 0.2;
  sum += grid[x+1][y].b * 0.2;
  sum += grid[x][y+1].b * 0.2;
  sum += grid[x][y-1].b * 0.2;
  sum += grid[x-1][y-1].b * 0.05;
  sum += grid[x-1][y+1].b * 0.05;
  sum += grid[x+1][y-1].b * 0.05;
  sum += grid[x+1][y+1].b * 0.05;

  return sum;
}

function swap(){
  var temp = grid;
  grid = next;
  next = temp;
}