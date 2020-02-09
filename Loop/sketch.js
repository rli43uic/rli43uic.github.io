let fish;

let fishy;
let fishx;

let fishspeed;

function preload() {
  fish = loadImage("Images/goldfish.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  fishy = windowHeight-25;
  fishx = 0;
  fishspeed = 1//dist(mouseX,mouseY, width/2,height/2);
}

function draw() {
  
  
  
  
  background(40,130,203);
  for (let i = 0; i < width; i =i+10) {
    stroke(45,241,123);
    line(0,0,i,height);
  }
  for (let i = width; i > 0; i =i-10) {
    stroke(241,40,86);
    line(0,height,i,0);
  }
  if (mouseIsPressed == true) {
    fishspeed= dist(mouseX,mouseY, width/2,height/2)/5;
    fishx = fishx + fishspeed;
    image(fish,fishx, fishy,100,50);
    if (fishx >= width)  {
     fishx = 0;
    }
      
    fill(255,255,255,100);
    ellipse(mouseX,mouseY,50,50);
    if (dist(mouseX,mouseY, width/2,height/2) <=10 ){
      fill(241,252,65);
      stroke(241,252,65);
      strokeWeight(4);
      ellipse(mouseX,mouseY,50,50);
      for (let i = 0; i < height; i = i +10) {
        strokeWeight(1);
        line(width/2,height/2,width,i);
      }
    }
    stroke(0,0,0);
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}