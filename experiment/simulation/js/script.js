const canvas = document.querySelector("#simscreen");
const ctx = canvas.getContext("2d");
const btnStart = document.querySelector(".btn-start");
const vari1 = document.querySelector(".var-group");
const btnReset = document.querySelector(".btn-reset");
const voltageButtons = document.querySelectorAll(".voltage");
const vfspinner = document.querySelector("#vfspinner");
const temperature1 = document.querySelector("#temp1");
const temperature2 = document.querySelector("#temp2");
const temperature3 = document.querySelector("#temp3");
const temperature4 = document.querySelector("#temp4");
const temperature5 = document.querySelector("#temp5");
const btnCheck1 = document.querySelector(".btn-check1");
const btnCheck2 = document.querySelector(".btn-check2");
const taskTitle = document.querySelector(".task-title");
btnStart.addEventListener("click", initiateProcess);
btnReset.addEventListener("click", resetAll);
voltageButtons.forEach((voltage) =>
  voltage.addEventListener("click", () => setVoltage(voltage))
);
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    slider.addEventListener("input", function () {
      const tempVal = this.nextElementSibling;
      tempVal.textContent = this.value;
    });
  });
});

let steadyState = 0;
let currentVoltage = 0;
//controls section
var v = 0;
var tinf = 10; //Celsuis
var tbase = 1; //Celsuis
// var len = 0.0015; //Meter
var peri = 0.015; //Perimeter
var a_c = 25; //Area of cross section
var h_coeff = 100; //Convection coeff
var k = 201;
var qfin = 0;
var t_l2 = 0;

let voltage = 0;
let current = 0;
let diamter = 0;
let len = 0;
let Q = 0;
let A = 0;
let q = 0;
let h = 0;
let deltaT = 0;

ktemp; // var m = 5;
//timing section
let simTimeId = setInterval("", "1000");
let TimeInterval = setInterval("", "1000");
let TimeInterval1 = setInterval("", "1000");
var time = 0;
var time1 = 0;
var time2 = 0;

//point tracing section and initial(atmospheric section)
var t1 = [26, 28.1, 26.5, 27, 27.2];
var off = [0, 0, 0, 0, 0];
// var q = [43.36, 43.71, 43.84];
var qtemp = 1;
var ktemp = 1;
var th = [45, 45, 45, 45, 45];

//temporary or dummy variables for locking buttons
var temp = 0;
var temp1 = 2;
var temp2 = 0;

function displayDiv(ele) {
  const taskScreen = document.querySelectorAll(".task-screen");
  taskScreen.forEach((task) => {
    task.classList.add("hide");
  });
  if (ele.classList.contains("tool-objective")) {
    document.querySelector(".objective").classList.remove("hide");
    taskTitle.textContent = "Objective";
  }
  if (ele.classList.contains("tool-description")) {
    document.querySelector(".description").classList.remove("hide");
    taskTitle.textContent = "Description";
  }
  if (ele.classList.contains("tool-explore")) {
    document.querySelector(".explore").classList.remove("hide");
    document.querySelector(".extra-info").classList.remove("hide");
    taskTitle.textContent = "Experiment";
    if (temp2 !== 1) {
      drawModel();
      startsim();
      varinit();
    }
  }
  if (ele.classList.contains("tool-practice")) {
    // document.querySelector(".practice").classList.remove("hide");
    if (temp2 == 1) {
      temp1 = 1;
      validation();
      document.querySelector("#info").innerHTML = "Temperature Gradient";
    } else {
      // document.querySelector("#info").innerHTML =
      // "Perform the experiment to solve the questions";
      // document.querySelector(".graph-div").classList.add("hide");
      // document.querySelector(".questions").classList.add("hide");
    }
  }
}
//Change in Variables with respect to time
function varinit() {
  varchange();
  //Variable r1 slider and number input types
  $("#tinfslider").slider("value", 10);
  $("#tinfspinner").spinner("value", 10);
  // var voltage1 = $("#tinfspinner").spinner("value"); //Updating variables

  $("#tbslider").slider("value", 1);
  $("#tbspinner").spinner("value", 1);

  //-----------
  $("#lslider").slider("value", 0.0015);
  $("#lspinner").spinner("value", 0.0015);

  //-----------
  $("#pslider").slider("value", 0.015);
  $("#pspinner").spinner("value", 0.015);
}

function varchange() {
  //Variable tinf slider and number input types
  $("#tinfslider").slider({ max: 50, min: 0, step: 10 }); // slider initialisation : jQuery widget
  $("#tinfspinner").spinner({ max: 50, min: 0, step: 10 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#tinfslider").on("slide", function (e, ui) {
    $("#tinfspinner").spinner("value", ui.value);
    varupdate();
  });
  $("#tinfspinner").on("spin", function (e, ui) {
    $("#tinfslider").slider("value", ui.value);
    varupdate();
  });
  $("#tinfspinner").on("change", function () {
    varchange();
  });
  $("#tinfslider").on("change", function () {
    varchange();
  });

  //Variable tb slider and number input types
  $("#tbslider").slider({ max: 5, min: 0, step: 1 }); // slider initialisation : jQuery widget
  $("#tbspinner").spinner({ max: 5, min: 0, step: 1 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#tbslider").on("slide", function (e, ui) {
    $("#tbspinner").spinner("value", ui.value);
    varupdate();
  });
  $("#tbspinner").on("spin", function (e, ui) {
    $("#tbslider").slider("value", ui.value);
    varupdate();
  });
  $("#tbspinner").on("change", function () {
    varchange();
  });
  $("#tbslider").on("change", function () {
    varchange();
  });

  //Variable l slider and number input types
  $("#lslider").slider({ max: 0.003, min: 0.001, step: 0.0001 }); // slider initialisation : jQuery widget
  $("#lspinner").spinner({ max: 0.003, min: 0.001, step: 0.0001 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#lslider").on("slide", function (e, ui) {
    $("#lspinner").spinner("value", ui.value);
    varupdate();
  });
  $("#lspinner").on("spin", function (e, ui) {
    $("#lslider").slider("value", ui.value);
    varupdate();
  });
  $("#lspinner").on("change", function () {
    varchange();
  });
  $("#lslider").on("change", function () {
    varchange();
  });

  //Variable p slider and number input types
  $("#pslider").slider({ max: 0.02, min: 0.01, step: 0.001 }); // slider initialisation : jQuery widget
  $("#pspinner").spinner({ max: 0.02, min: 0.01, step: 0.001 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#pslider").on("slide", function (e, ui) {
    $("#pspinner").spinner("value", ui.value);
    varupdate();
  });
  $("#pspinner").on("spin", function (e, ui) {
    $("#pslider").slider("value", ui.value);
    varupdate();
  });
  $("#pspinner").on("change", function () {
    varchange();
  });
  $("#pslider").on("change", function () {
    varchange();
  });
  //-----------------------------//
}

function varupdate() {
  console.log("varupdate");
  // $("#tinfspinner").spinner("value", $("#tinfslider").slider("value")); //updating slider location with change in spinner(debug)
  // $("#tbspinner").spinner("value", $("#tbslider").slider("value"));
  // $("#lspinner").spinner("value", $("#lslider").slider("value"));
  // $("#pspinner").spinner("value", $("#pslider").slider("value"));
  $("#tinfslider").slider("value", $("#tinfspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#tbslider").slider("value", $("#tbspinner").spinner("value"));
  $("#lslider").slider("value", $("#lspinner").spinner("value"));
  $("#pslider").slider("value", $("#pspinner").spinner("value"));
  voltage = $("#tinfslider").slider("value"); //Updating variables
  // console.log(voltage);
  // console.log("hello");
  current = $("#tbslider").slider("value");
  diamter = $("#lslider").slider("value");
  len = $("#pslider").slider("value");

  A = 3.1428 * diamter * len;
  // console.log(A);
  Q = voltage * current;
  q = Q / A;
  h = 1.54 * Math.pow(q, 0.75);
  deltaT = Math.pow(h / (5.5 * 9.81), 0.5);

  document.querySelector("#w1").innerHTML = A.toFixed(9) + " m\u00B2"; //Displaying values
  document.querySelector("#w2").innerHTML = voltage.toFixed(4) + " V";
  document.querySelector("#ww1").innerHTML = current.toFixed(4) + " A";
  document.querySelector("#ww2").innerHTML = q.toFixed(4) + " W/m\u00B2";
  document.querySelector("#x1").innerHTML = h.toFixed(4) + " W/m\u00B2 K";
  
  drawModel(diamter);
}

//water temperature changes
function watertemp() {
  switch (vf) {
    case 26:
      t1[6] += 2.2;
      break;
    case 54:
      t1[6] += 1.2;
      break;
    case 60:
      t1[6] += 1.2;
      break;
  }
}

//stops simulations
function simperiod() {
  if (time1 >= 5.0) {
    clearInterval(TimeInterval);
    clearInterval(TimeInterval1);
    time1 = 0;
    time2 = 0;
    temp1 = 0;
    temp2 = 1;
    watertemp();

    ctx.clearRect(620, 485, 100, 50);
    t1[6] = t1[6].toFixed(1);
    ctx.font = "15px Comic Sans MS";
    //ctx.fillText(t1[5]+" \u00B0C", 470, 170);
    ctx.fillText(t1[6] + " \u00B0C", 650, 500);
    // printcomment("", 2);
  } else {
    drawGradient();
    steadyState = 5 - Math.round(time1);
    document.querySelector(
      ".comment"
    ).innerHTML = `Wait for  ${steadyState} seconds for steady state`;
    btnReset.setAttribute("disabled", true);
    if (steadyState === 0) {
      temp2 = 0;
      document.querySelector(
        ".comment"
      ).innerHTML = `The steady state is achieved
`;
btnReset.removeAttribute("disabled");
    }
    // printcomment(
    //   "Wait for " + (5 - Math.round(time1)) + " seconds for steady state",
    //   2
    // );
  }
}
//draw gradient w.r.t. time in thermometer water flow and heater
function drawGradient() {
  //heater simulation
  var h = 100 * time1;
  //create gradient
  var grd1 = ctx.createLinearGradient(0, 0, h, 0);
  grd1.addColorStop(0, "red");
  grd1.addColorStop(1, "pink");
  // Fill with gradient
  ctx.fillStyle = grd1;
  ctx.fillRect(100, 137, 295, 35);
}

// initial model
function drawModel(diamter) {
  const radius = 50;
  const angle = Math.PI / 180;
  ctx.clearRect(0, 0, 800, 600); //clears the complete canvas#simscreen everytime

  // ctx.clearRect(0,0,250,400);  //clears the complete canvas#simscreen everytime
  // ctx.fillStyle=`rgb(${200}, ${200}, ${255})`;
  // ctx.fillRect(150,150,500,50);
  // ctx.fillStyle=`rgb(${150}, ${200}, ${255})`;
  // ctx.fillRect(150,200,500,500);
  // ctx.fillStyle=`rgb(${0}, ${0}, ${255})`;
  // ctx.fillRect(285, 130, 50, 250, 20);
  // ctx.strokeStyle=`colorRed`;
  var background = new Image();
  background.src = "./images//Capture1.PNG";
  
  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function () {
    ctx.drawImage(background, 80, 50, 600, 500);
    //ctx.clearRect(78, 210, 46, 64);
    btnStart.addEventListener("click", function(){
      ctx.strokeStyle = "red"; // Line color
      ctx.lineWidth = 5; // Line width
      ctx.beginPath();
      ctx.moveTo(340, 382); // Starting point of the line (adjust coordinates as needed)
      ctx.lineTo(550, 382); // Ending point of the line (adjust coordinates as needed)
      ctx.stroke();
  
    })
   
    //  ctx.rect(100, 137, 295, 35);
    //  ctx.stroke();
    
    ctx.fillStyle = "red";
    ctx.fillRect(340, 382 - diamter * 1500, 210, diamter * 1500);
  
    // drawGradient();
    // printcomment("\th =100 W/m<sup>2</sup>.K<br>\t<i>K</i>  = 201 W/m.K", 1)
  };
}
function drawCircle(x, y, r, color) {
  var myCanvas = document.getElementById("simscreen1");
  var context2d = myCanvas.getContext("2d");
  context2d.fillStyle = color;
  context2d.beginPath();
  context2d.arc(x, y, r, 0, 2 * Math.PI);
  context2d.closePath();
  context2d.fill();
}
function drawRectangle(x, y, w, h, color) {
  var myCanvas = document.getElementById("simscreen1");
  var context2d = myCanvas.getContext("2d");
  context2d.fillStyle = color;

  context2d.fillRect(x, y, w, h);
}
function drawPan() {
  drawCircle(600, 300, 300, "rgba(0, 0, 0, 1)");
  // drawCircle(600, 300, 250,"rgba(50, 50, 50, 1)");
}

function drawBubbles() {
  for (i = 0; i < 100; i++) {
    var bubbleSize = Math.pow(1.73, 4 * Math.random());
    var bubbleX = 100 + (75 - bubbleSize) * (-1 + 2 * Math.random());
    var bubbleY = 100 + (75 - bubbleSize) * (-1 + 2 * Math.random());
    drawCircle(bubbleX, bubbleY, bubbleSize, "rgba(218, 223, 225,1)");
  }
}
function drawSteam() {
  drawRectangle(0, 0, 200, 100, "rgba(255,255, 255, 0.01)");
}

function clearCanvas() {
  var myCanvas = document.getElementById("simscreen1");
  var context2d = myCanvas.getContext("2d");
  context2d.clearRect(0, 0, myCanvas.width, myCanvas.height);
}
function drawScene() {
  // drawPan();
  clearCanvas();
  drawBubbles();
  drawSteam();
  // drawArrow(x - 100, y + 10, 30, angle);
  // angle += 0.05;
  // drawWater();
}
setInterval(drawScene, 100);

let animationId = null;
function drawArrow(ctx, x, y, size, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2);

  let bodyWidth = size / 4;
  let bodyHeight = size / 6;
  ctx.fillStyle = "black";

  ctx.fillRect(0, -bodyHeight / 2, size, bodyHeight);

  let headWidth = size / 2;
  let headHeight = bodyHeight * 2;
  ctx.beginPath();
  ctx.moveTo(size, -headHeight / 2);
  ctx.lineTo(size, headHeight / 2);
  ctx.lineTo(size + headWidth, 0);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function animateArrow() {
  const canvas3 = document.getElementById("simscreen1");
  const ctx3 = canvas3.getContext("2d");
  const centerX = canvas3.width / 2;
  const centerY = canvas3.height / 2;
  const radius = 40;
  const size = 20;
  let angle = 0;

  function step() {
    ctx3.clearRect(0, 0, canvas3.width - 90, canvas3.height - 90); // Clear the entire canvas

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    drawArrow(ctx3, x, y, size, angle); // Draw the arrow

    angle += 0.03; // Increment the angle for circular motion

    animationId = requestAnimationFrame(step); // Continue the animation
  }

  step();
}
function comment1() {
  if (tinf != 0) {
    time = 0;
    temp = 1;
    //$("#tinfspinner").spinner({disabled : true});
    //$("#tinfslider").slider({disabled : true});

    clearInterval(simTimeId);
  }

}

//offset for thermometer and temp change
function offset() {
  if (currentVoltage == 10) {
    //path = "./images//V1.jpg";
    off[0] = 23.4;
    off[1] = 22.58;
    off[2] = 22.9;
    off[3] = 6.5;
    off[4] = 5.9;
  } else if (currentVoltage == 20) {
    //path = "./images//V2.jpg";
    off[0] = 24;
    off[1] = 22.98;
    off[2] = 23.3;
    off[3] = 7;
    off[4] = 6.9;
  } else if (currentVoltage == 30) {
    //path = "./images//V3.jpg";
    off[0] = 24.2;
    off[1] = 23.18;
    off[2] = 23.7;
    off[3] = 7.5;
    off[4] = 7.4;
  }
  // temp1 = 0;
  // temp2 = 1;
}
function setVoltage(ele) {
  currentVoltage = Number(ele.value);
  btnStart.removeAttribute("disabled");
}

function startsim() {
  simTimeId = setInterval("time=time+0.1; comment1(); ", "100");
}
let btnStartClicked = false;
function initiateProcess() {
  btnStartClicked = !btnStartClicked;
  if (btnStartClicked) {

    btnStart.innerHTML = "Stop";
    document.getElementById("simscreen1").style.visibility = "visible";
    animateArrow();
    btnReset.removeAttribute("disabled");
    // vari1.setAttribute("disabled", true);
    $('.temperature-group').css({
      "opacity":0.5,
      "pointer-events":"none"
    });
    // Add additional logic for "Start" action
    console.log("Started");
  } else {
    btnStart.innerHTML = "Start";

    // Add additional logic for "Stop" action
    cancelAnimationFrame(animationId);
    document.getElementById("simscreen1").style.visibility = "hidden";
    // animateArrow();
    ctx.lineWidth = 0;
    $('.temperature-group').css({
      "opacity":1,
      "pointer-events":"auto"
    });
    console.log("Stopped");
    // animateArrow();
  }

}


function resetAll() {
  if (btnReset.innerHTML === "Next") {
    btnReset.innerHTML = "Prev";
    document.getElementById("main1").style.display = "none";
    document.getElementById("observe").style.display = "block";
    btnStart.setAttribute("disabled", true);
    varupdate();
    console.log("Started");
  } else {
    btnReset.innerHTML = "Next";
    document.getElementById("main1").style.display = "flex"; // Use flex instead of block
    document.getElementById("observe").style.display = "none";
    btnStart.removeAttribute("disabled");
    console.log("Stopped");
  }
}
// ctx.clearRect(background, 0, 0, 800, 600);
// voltageButtons.forEach((voltage) => {
//   voltage.removeAttribute("disabled");
//   voltage.checked = false;
// });
// document.querySelector(".comment").innerHTML = "";
// // if (temp1 == 0) {
// temp2 = 0;
// temp1 = 2;
// t1 = [27.5, 27, 27, 26.5, 27.5, 27, 26.8];
// th = [45, 45, 45, 45, 45];
// currentVoltage = 0;
// vf = 0;
// document.querySelector(".correct-answer1").innerHTML = "";
// document.querySelector(".question-unit1").innerHTML = `<sup>&deg;</sup>C/m`;
// document.querySelector(".question-input1").value = "";
// document.querySelector(".correct-answer2").innerHTML = "";
// document.querySelector(".question-unit2").innerHTML = `W/m.K`;
// document.querySelector(".question-input2").value = "";
// varinit();
// startsim();
// drawModel();

// function movetoTop() {
//   practiceDiv.scrollIntoView();
// }
