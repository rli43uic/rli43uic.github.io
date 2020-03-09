let dim;
let maximum;
let circleClick;
let ball = true;
let scalarsX = [];
let scalarsY = [];
let angles = [];
let angleSpeeds = [];
let speeds = [];
let opacities = [];
let ballSize = [];

let x;
let y;
let scalarX;
let scalarY;
let angle = 0;
let speed = 0.10;

let angleSpeedSlider;
let speedSlider;

let sizeFactor;
let radius;

let playMode = "sustain";
let ballRoll;
let ballsSound = [];
let ballDrop;
function preload() {
  ballRoll = loadSound("Sounds/rollingDown.mp3");
  ballDrop = loadSound("Sounds/ballDrop.mp3");
}

function setup() {
  ballRoll.playMode(playMode);
  createCanvas(windowWidth, windowHeight);
  sizeFactor = windowWidth/10;
  radius = 255+sizeFactor;

  darkHole = drawGradient();
  noStroke();
  ellipseMode(RADIUS);

  if (windowWidth > windowHeight){
      maximum = windowWidth;
      }
  else {
     maximum = windowHeight; 
  }


}

function draw() {
   drawGradient();// draw background
   
   for (let i = 0; i < speeds.length; ++i) {
    
    fill(255,255,255,opacities[i]);

    x = width/2 + (scalarsX[i]) * cos(angles[i]);
    y = height/2 + (scalarsY[i]) * sin(angles[i]);
    stroke(2);
    ellipse(x, y, ballSize[i],ballSize[i]);
    noStroke();
     
    //speed at which it descends into the circle
    if (scalarsX[i] <= 0) {
      scalarsX[i] += speeds[i];
    }else{
      scalarsX[i] -= speeds[i];
    }
    if (scalarsY[i] <= 0) {
      scalarsY[i] += speeds[i];
    }else{
      scalarsY[i] -= speeds[i];
    }
     
    if (abs(scalarsX[i] < 50)) {
      opacities[i] = abs(scalarsX[i])+50;
      speeds[i] += 0.02;
      
    }
     
    if (!ballsSound[i].isLooping()) {
      
      ballsSound[i].loop(); 
    }
     
    speeds[i] += 0.0001;
     if (ballSize[i] > 0) {
       
      ballSize[i]-= 0.1;
     }
    
    angles[i] += angleSpeeds[i]; //speed at which it rotates
    //print(scalarsX[i]);
   }
  
  //delete value when it reaches center freeing up the space
  for (let i = scalarsX.length - 1; i >=0; i--) {
    if(abs(scalarsX[i]) < 25){
      scalarsX.splice(i,1);
      scalarsY.splice(i,1);
      speeds.splice(i,1);
      angles.splice(i,1);
      opacities.splice(i,1);
      ballsSound[i].stop(); 
      ballsSound.splice(i,1);
    }
  }
  
  //print(scalarsX.length);
 
}

function mousePressed() {
  if (dist(mouseX,mouseY, width/2,height/2) <= radius) {
    
    //finds the distance from the center lines
    x = abs(width/2 - mouseX);
    y = abs(height/2 - mouseY);
    angle = atan(y/x);
    //angleSpeeds.push(angleSpeedSlider.value());
    //speeds.push(speedSlider.value());
    speeds.push(speed);
    angleSpeeds.push(speed);
    //finds the distance between the center of the page and the mouse
    scalarX = sqrt( sq(x) + sq(y) );
    
    scalarY = scalarX;
    ballSize.push(scalarX /5);
    if (mouseX < width/2) {
      scalarX = scalarX* -1;  
    }
    scalarsX.push(scalarX);
    if (mouseY < height/2) {
      scalarY = scalarY * -1;  
    }
    scalarsY.push(scalarY);
    angles.push(angle);
    opacities.push(255);
    ballsSound.push(ballRoll);
    //ballDrop.play();
  }
  
}



function drawGradient() {
  //let radius = max;
  background(255);
  for (let r = 255; r >= 0; --r) {
    fill(r)
    ellipse(width/2, height/2, r+sizeFactor, r+sizeFactor);
    
  }
  fill(0,255,255,10);
  circleClick = ellipse(width/2,height/2, radius,radius); 
  noFill();
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}