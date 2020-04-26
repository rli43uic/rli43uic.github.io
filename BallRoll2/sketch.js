
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
let drop = [];
let volumes = [];
let ballDropSpeed = [];
let sprial = [];
//let sizeConstant = [];

let x;
let y;
let scalarX;
let scalarY;
let angle = 0;
let speed = 0.20; //speed of each ball rotating
let dropspeed = 0.1; //speed of ball dropping
let gravity = 0.05;
let angleSpeed = 0.1;
let sprialSpeed = 20;
let volumeSize = 0.9;
let acceleration = 0.001;

let ballheight;
let holeSlider;
let accelSlider;
//let ballSizeSlider;

let sizeFactor;
let radius;

let canvas;
let playMode = "sustain";
let ballRoll;
let ballsSound = [];
let ballDrop;
let ballReverb;
let drywet = [];
//Z index
//visual cues of stronger gravity

function preload() {

  ballRoll = loadSound("Sounds/rollingDown.mp3");
  ballDrop = loadSound("Sounds/ballDrop.mp3");

}

function setup() {
  ballRoll.playMode(playMode);
  ballRoll.disconnect();
  ballReverb = new p5.Reverb();
  ballReverb.process(ballRoll, 3, 2); //echoing sound

  //createCanvas(windowWidth, windowHeight);
  //sets can
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("z-index", "-1");
  canvas.position(0, 0);

  sizeFactor = windowWidth / 10;
  radius = 255 + sizeFactor;

  ballheight = createSlider(0, 100, 0, 5);
  holeSlider = createSlider(255, 510, 255, 10);
  accelSlider = createSlider(0.001, 0.05, 0.001, 0.001);
  //ballSizeSlider = createSlider (0, 50, 0, 1);
  
  
  noStroke();
  ellipseMode(RADIUS);



  if (windowWidth > windowHeight) {
    maximum = windowWidth;
  } else {
    maximum = windowHeight;
  }
}



function draw() {
  drawGradient(); // draw background

  for (let i = 0; i < speeds.length; ++i) {
    // drawing
    fill(255, 255, 255, opacities[i]);

    x = width / 2 + (scalarsX[i]) * cos(angles[i]);
    y = height / 2 + (scalarsY[i]) * sin(angles[i]);
    stroke(2);
    ellipse(x, y, ballSize[i], ballSize[i]);
    noStroke();


    //ball drop animation if statements
    if (drop[i] == true) {
      //create the illusion of the ball dropping by decreasing the size
      if (ballSize[i] > ((abs(scalarsX[i]) / 6) )) {
        ballSize[i] -= ballDropSpeed[i];
        ballDropSpeed[i] += gravity;
      } 
      else {
        ballDrop.setVolume(1);
        ballDrop.play();
        drop[i] = false;
      }
    } 
    //pressed outside of hole
    else if (sprial[i] == true) {
      if (scalarsX[i] <= 0) {
        scalarsX[i] += sprialSpeed;
      } else {
        scalarsX[i] -= sprialSpeed;
      }
      if (scalarsY[i] <= 0) {
        scalarsY[i] += sprialSpeed;
      } else {
        scalarsY[i] -= sprialSpeed;
      }
      
      if (dist(x, y, width / 2, height / 2) <= radius) {
        sprial[i] = false; 
      }
      
    }
    else {


      //speed at which it descends into the circle
      if (scalarsX[i] <= 0) {
        scalarsX[i] += speeds[i];
      } else {
        scalarsX[i] -= speeds[i];
      }
      if (scalarsY[i] <= 0) {
        scalarsY[i] += speeds[i];
      } else {
        scalarsY[i] -= speeds[i];
      }

      //as it closes in on the center it increases speed and change volume settings
      if (abs(scalarsX[i] < 100)) {
        opacities[i] = abs(scalarsX[i]) + 50;
        speeds[i] += 0.02;
        drywet[i] -= 0.01;
        volumes[i] -= 0.001;
        ballsSound[i].setVolume(volumes[i], 10);

      }
      //volume items that are still broken
      //         ballRoll.volume(0.5);

      //         if (volumes[i] > 0.05) {
      //           volumes[i] -= 0.00001;
      //           ballsSound[i].volume(volumes[i]);
      if (!ballsSound[i].isLooping()) {

        ballsSound[i].loop();
      }
      // }
      // else {
      //   ballsSound[i].stop();
      // }  


      speeds[i] += accelSlider.value();
      if (ballSize[i] > 0) {

        //ballSize[i]-= 0.1;
        ballSize[i] = abs(scalarsX[i]) / 6;
      }

      angles[i] += angleSpeeds[i]; //speed at which it rotates
      //print(scalarsX[i]);
    }
  }

  //delete value when it reaches center freeing up the space
  for (let i = scalarsX.length - 1; i >= 0; i--) {
    if (drop[i] == true) {
       //don't do anything yet, wait for animation. 
    }
    else if (abs(scalarsX[i]) < 25 || ballSize[i] < 5) {
      scalarsX.splice(i, 1);
      scalarsY.splice(i, 1);
      speeds.splice(i, 1);
      angles.splice(i, 1);
      opacities.splice(i, 1);
      ballsSound[i].stop();
      ballsSound.splice(i, 1);
      ballSize.splice(i, 1);
      drop.splice(i, 1);
      ballDropSpeed.splice(i, 1);
      volumes.splice(i, 1);
      sprial.splice(i, 1);
      //sizeConstant.splice(i,1);
    }
  }

  //print(scalarsX.length);

}

function mousePressed() {
  if (mouseX > 10 && mouseY > 50) {
    //finds the distance from the center lines
    x = abs(width / 2 - mouseX);
    y = abs(height / 2 - mouseY);
    angle = atan(y / x);
    //angleSpeeds.push(angleSpeedSlider.value());
    //speeds.push(speedSlider.value());
    speeds.push(speed);
    angleSpeeds.push(angleSpeed);
    //finds the distance between the center of the page and the mouse
    scalarX = sqrt(sq(x) + sq(y));

    scalarY = scalarX;
    //size of the ball 

    //ballSize.push(scalarX /6);
    // sizeConstant.push(ballSizeSlider.value());
    // ballSize.push(ballheight.value() + ballSizeSlider.value());
    ballSize.push(scalarX /6 + ballheight.value());
    
    if (mouseX < width / 2) {
      scalarX = scalarX * -1;
    }
    scalarsX.push(scalarX);
    if (mouseY < height / 2) {
      scalarY = scalarY * -1;
    }
    scalarsY.push(scalarY);
    angles.push(angle);
    opacities.push(255);
    ballsSound.push(ballRoll);
    ballDropSpeed.push(dropspeed);
    volumes.push(1); //max volume default

    //ballsSound.push(ballReverb);
    //drywet.push(0);
    //ballsSound.push(createAudio("Sounds/rollingDown.mp3", audio.play()));
    volumes.push(volumeSize);
    //balldrop true false animation boolean
    drop.push(true);
    //ballDrop.play();
    if (dist(mouseX, mouseY, width / 2, height / 2) <= radius) {
      sprial.push(false);

    }
    else {
      sprial.push(true);
    }
  }
}



function drawGradient() {
  //let radius = max;
  background(255);

  for (let r = holeSlider.value(); r >= 0; --r) {
    fill(r / 2);
    ellipse(width / 2, height / 2, r + sizeFactor, r + sizeFactor);

  }
  fill(0, 255, 255, 10);
  circleClick = ellipse(width / 2, height / 2, radius, radius);
  noFill();

  fill(0, 0, 0);
  text("Ball Height", 40, 40);
  noFill();

  fill(0, 0, 0);
  text("Background", 170, 40);
  noFill();
  
  fill(0, 0, 0);
  text("Speed", 320, 40);
  noFill();


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}