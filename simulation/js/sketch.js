// canvas
let width = 800;
let height = 600;

// counter
let t = 0.05;
let dt = 0.01;

// system
let spring1;
let spring2;

// graphs
let position_graph1;
let position_graph2;
let magFac;

let k1;
let k2;
let m1;
let m2;
let w;
let F0;
let om1;
let om2;

// factor
let factor = 10;

// images
let img;
let button1;
let button2;
let button3;
let button4;
let button5;
let spr;

// pages
let page1 = true;
let page2 = false;
let page3 = false;

// animation
let animation = true;
let touch = false;

// Buttons
let clear;
let buttonState = false;
let buttonText = "OFF";
let buttonColor = "red";
let startColor;
let endColor = "red";
let lerpedColor = "black";
let lerping = false;
let lerpingRate = 0.01;
let currentColor = "black";

let angle = 0;
let radius = 70;
startColor = "black"; // Initial color (black)
endColor = "red"; // Target color (red)
currentColor = startColor; // Current color
increment = 1; // Increment value for color change

let voltage;
let current;
let length;
let diameter;

function preload() {
  play = loadImage("images/blueplaydull.png");
  pause = loadImage("images/bluepausedull.png");
  graph = loadImage("images/bluefwddulls.png");
  back = loadImage("images/bluebkdulls.png");
  bg = loadImage("images/frame_copper_ver02.png");
  spr = loadImage("images/spring.png");
}

function setup() {
  textFont("Comic Sans MS");
  strokeWeight(0);

  createCanvas(width, height + 50);
  bg.resize(width, height + 50);

  spring1 = new System(450, 365, 90, 25);
  // spring2 = new System(450 ,365 , 90  ,25);

  position_graph1 = new Graph(50, 550, 100, 220, "x1", "t");

  position_graph2 = new Graph(50, 400, 100, 220, "x2", "t");

  position_graph3 = new Graph(50, 220, 100, 220, "x1", "t");

  magFac1 = new DynamicGraph(
    50 + 20 + 50,
    400 + 50,
    300,
    220,
    "X1/Xst",
    "ω",
    0,
    7,
    0,
    10,
    System.mag_func1,
    255
  );
  magFac2 = new DynamicGraph(
    400,
    400 + 50,
    300,
    220,
    "X2/Xst",
    "ω",
    0,
    7,
    0,
    10,
    System.mag_func2,
    0
  );
  magFac3 = new DynamicGraph(
    50 + 20,
    400 + 50,
    300,
    220,
    "X1/Xst",
    "ω",
    0,
    7,
    0,
    10,
    System.mag_func3,
    0
  );
  magFac4 = new DynamicGraph(
    50 + 20 + 50,
    400 + 50,
    300,
    220,
    "X1/Xst",
    "ω",
    0,
    7,
    0,
    10,
    System.mag_func4,
    0
  );

  //magFac = new DynamicGraph(125, 325, 230, 290, "Magnification Factor", "n", 0, 2.5, 0, 7.5, System.mag_func);
  //phaseAng = new DynamicGraph(125, 495, 150, 290, "Phase Angle", "n", 0, 2.5, 0, 180, System.phase_func);

  // neglect this part
  F0 = new NumberInput(700, 180, "F(N)", 10, 19, 15, 1, 1, true);
  w = new NumberInput(700, 230, "ω(rad/sec)", 1, 8.5, 2.8, 0.01, 0.01, true);
  mu = new NumberInput(700, 270, "mu (ratio)", 0.05, 0.25, 0.05, 100, 1, true);

  let add = -140;
  m1 = new NumberInput(
    700,
    330 + 20 + add,
    "m1(kg)",
    200,
    800,
    200,
    10,
    1,
    true
  );
  k1 = new NumberInput(
    700,
    350 + 10 + 30 + add + 10,
    "k1 (N/m)",
    100,
    1000,
    100,
    100,
    1,
    true
  );
  m2 = new NumberInput(
    700,
    440 + 10 + add + 10 + 10,
    "m2(kg)",
    10,
    500,
    100,
    10,
    0.1,
    true
  );
  k2 = new NumberInput(
    700,
    465 + 10,
    "k2 (N/m)",
    100,
    20000,
    20000,
    100,
    1,
    true
  );

  // important from  here
  voltage = new NumberInput(
    620,
    330 + 20 + add,
    "Voltage (V)",
    0,
    50,
    10,
    10,
    1,
    true
  );
  current = new NumberInput(
    620,
    350 + 10 + 30 + add + 10,
    "Current (A)",
    0,
    5,
    1,
    1,
    1,
    true
  );
  diameter = new NumberInput(
    620,
    440 + 10 + add + 10 + 10,
    "Diameter (m)",
    0.001,
    0.003,
    0.0015,
    0.0001,
    0.1,
    true
  );
  length = new NumberInput(
    620,
    465 + 70 + add,
    "Length (m)",
    0.01,
    0.02,
    0.015,
    0.001,
    1,
    true
  );

  button1 = new Button(650, 500, pause);
  button2 = new Button(700, 500, graph);
  button3 = new Button(650, 500, back);
  button4 = new Button(790, 600, graph);
  button5 = new Button(725, 600, back);
}

let bubbles = [];

function draw() {
  if (page1) {
    runPage1();
  }

  /*   if (page2) {
        runPage2();
    }*/

  if (page3) {
    runPage3();
  }
}

function mousePressed() {
  //  console.log(mouseX, mouseY)
  handleEvents();
  strokeWeight(0);

  if (mouseX > 650 && mouseX < 690 && mouseY > 145 && mouseY < 165) {
    // Toggle the button state
    buttonState = !buttonState;

    // Update the button color and text based on the state
    if (buttonState) {
      buttonColor = color(0, 255, 0); // Green color when button is ON
      buttonText = "ON";
    } else {
      buttonColor = color(255, 0, 0); // Red color when button is OFF
      buttonText = "OFF";
    }

    if (!lerping) {
      lerping = true;
    }
  }
}
