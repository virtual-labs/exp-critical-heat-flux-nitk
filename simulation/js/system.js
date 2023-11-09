class System {
  constructor(x, y, _w, _h) {
    this.width = _w;
    this.h = _h;
    this.x_equilibrium = x;
    this.y_equilibrium = y;
    this.F0 = 0;
    this.w = 0;
    this.k1 = 0;
    this.k0 = 0;
    this.m1 = 0;
    this.k2 = 0;
    this.k3 = 0;
    this.m2 = 0;
    this.w1 = 0;
    this.w2 = 0;
    this.x1 = 0;
    this.x2 = 0;
    this.masscoordinates = [];
    this.x1w1 = 0;
    this.x2w1 = 0;
    this.x2w1 = 0;
    this.x2w2 = 0;
    this.calcu1 = 0;
    this.calcu2 = 0;
    this.xm = 0;
    this.mu = 0;
    this.x1m = 0;
    this.om1w1 = 0;
    this.term1a = 0;
    this.term2b = 0;
    this.term3c = 0;
    this.t1a = 0;
    this.t2b = 0;
    this.t3c = 0;
    this.om1 = 0;
    this.om2 = 0;
    this.gb1 = 0;

    this.voltage = 0;
    this.current = 0;
    this.diamter = 0;
    this.len = 0;
    this.Q = 0;
    this.A = 0;
    this.q = 0;
    this.h = 0;
    this.deltaT = 0;
  }

  initialise(voltage, current, length, diamter) {
    //if(_w>3.8  && _w<4.1 || (_w> 2.4 && _w<=2.65) )_w= _w - 0.5

    this.voltage = voltage;
    this.current = current;
    this.len = length;
    this.diamter = diamter;

    this.A = 3.1428 * this.diamter * this.len;
    this.Q = this.voltage * this.current;
    this.q = this.Q / this.A;
    this.h = 1.54 * pow(this.q, 0.75);
    this.deltaT = pow(this.h / (5.5 * 9.81), 0.5);
  }

  update(t, _mulfact) {}

  show(_stroke, _strockweight, _fill) {
    push();

    // Draw the beaker
    fill(200, 200, 255); // Set the fill color to light blue
    stroke(0); // Set the stroke color to black

    rect(150, 350, 300, 250);

    fill(150, 200, 255); // Set the fill color to a water-like blue

    rect(150, 400, 300, 200);
    // Draw the bolt
    stroke(0); // Set the stroke color to black
    strokeWeight(3); // Set the stroke weight
    fill(0, 0, 250); // Set the RGB values to (0, 0, 100) for dark blue

    // Draw the body of the bolt
    //rect(170, 320, 70, 30)
    rect(185, 330, 40, 150, 20); // Rounded rectangle shape
    rect(170, 320, 70, 30);

    // Draw the ridges on the bolt
    let ridgeHeight = 10;
    let ridgeSpacing = 20;
    for (let y = 350; y < 420; y += ridgeSpacing) {
      line(190, y, 220, y);
      line(190, y + ridgeHeight, 220, y + ridgeHeight);
    }

    fill(255, 0, 0); // Set the RGB values to (255, 0, 0) for red

    // Draw the body of the bolt
    //rect(170, 320, 70, 30)
    let add = 180;
    rect(185 + add, 330, 40, 150, 20); // Rounded rectangle shape
    rect(170 + add, 320, 70, 30);

    ridgeHeight = 10;
    ridgeSpacing = 20;

    for (let y = 350; y < 420; y += ridgeSpacing) {
      line(190 + add, y, 220 + add, y);
      line(190 + add, y + ridgeHeight, 220 + add, y + ridgeHeight);
    }

    fill(0, 0, 0); // Set the RGB values to (0, 0, 100) for dark blue

    let bubbles = [];

    line(205 + add, 150, 205 + add, 320);

    line(205, 200, 205, 320);
    line(200, 150, 385, 150);
    line(200, 150, 385, 150);
    line(205, 200, 150, 200);
    fill(255);
    let centerX = 280 / 2;
    let centerY = 400 / 2;
    let circleSize = 25;
    ellipse(centerX, centerY, circleSize, circleSize);

    line(125, 200, 100, 200);
    line(100, 190, 100, 210);
    line(90, 180, 90, 220);
    line(80, 190, 80, 210);
    line(70, 180, 70, 220);
    line(70, 200, 40, 200);
    line(40, 200, 40, 150);
    line(40, 150, 200, 150);

    fill(buttonColor); // Set the fill color of the button
    rect(650, 145, 40, 20, 1);

    if (buttonState == false) {
      this.gb = 0;

      strokeWeight(0);
      stroke("black");
      fill("black");
      textSize(20);
      text("OFF", 700, 160);
      fill(0);
      rect(225, 450, 140, 1 + this.diamter * 2000);
    } else {
      lerpedColor = "black";
      this.gb++;
      strokeWeight(0);

      stroke("black");
      fill("black");
      textSize(20);
      text("ON", 700, 160);
      fill(0);
      rect(225, 450, 140, 5);
      if (this.gb >= 70) {
        fill("red");
        rect(225, 450, 140, 5 + this.diamter / 100);
        createBubble(230, 280, 410, 450);
        createBubble(280, 320, 410, 450);
        createBubble(300, 350, 410, 450);
        createBubble(230, 360, 410, 450);
        for (let i = bubbles.length - 1; i >= 0; i--) {
          updateBubble(bubbles[i]);
          displayBubble(bubbles[i]);

          // Remove bubbles that go off-screen
          if (bubbles[i].y < -bubbles[i].radius) {
            bubbles.splice(i, 1);
          }
        }

        let x = width / 2 + cos(angle) * radius * 2;
        let y = height / 2 + sin(angle) * radius * 0.5 + 150;

        // Draw the arrow
        drawArrow(x - 100, y + 10, 30, angle);
        // drawArrow(x-90, y+60, 20, angle);
        // drawArrow(x-110, y+80, 20, angle);

        angle += 0.05;
      }
      ///console.log(this.gb,  "this.gb")
    }

    function drawArrow(x, y, size, angle) {
      push();
      translate(x, y);
      rotate(angle + 90);

      let bodyWidth = size / 4;
      let bodyHeight = size / 6;
      fill(0);
      rect(0, -bodyHeight / 2, size, bodyHeight);

      let headWidth = size / 2;
      let headHeight = bodyHeight * 2;
      triangle(
        size,
        -headHeight / 2,
        size,
        headHeight / 2,
        size + headWidth,
        0
      );

      pop();
    }
    function createBubble(xa, xb, ya, yb) {
      let x = random(xa, xb);
      let y = random(ya, yb);
      let radius = random(5, 10);
      let ySpeed = random(10, 20);
      let bubble = { x, y, radius, ySpeed };
      bubbles.push(bubble);
    }

    function updateBubble(bubble) {
      bubble.y -= bubble.ySpeed;
    }

    function displayBubble(bubble) {
      noStroke();
      fill(255, 200);
      ellipse(bubble.x, bubble.y, bubble.radius * 2);
    }
  }

  static mag_func3(x, obj) {
    let solution = 0;
    // let avg = (obj.w1+ obj.w2)/2;
    let real = Math.pow(obj.k1 / obj.m1, 0.5);
    if (x / real < 0) solution = 1 / (1 - Math.pow(x / real, 2));
    else {
      solution = 1 / (Math.pow(x / real, 2) - 1);
    }

    if (abs(solution) < 2000) {
      return abs(solution);
    } else {
      return 2000;
    }
  }

  static mag_func2(x, obj) {
    x = x / 4;
    let term1 = 1;
    let term2 = 1 + obj.k2 / obj.k1 - Math.pow(x / obj.w1, 2);
    let term3 = 1 - Math.pow(x / obj.om2, 2);
    let term4 = obj.k2 / obj.k1;
    console.log(Math.pow(x / obj.om1, 2));
    let solution = term1 / (term2 * term3 - term4);
    if (abs(solution) < 2000) {
      return abs(solution);
    } else {
      return 2000;
    }
  }

  static mag_func1(x, obj) {
    x = x;
    let term1 = (1 - Math.pow(obj.w / obj.om2w2), 0.5);
    let term2 = 1 + obj.k2 / obj.k1 - Math.pow(x / obj.om1w1, 2);
    let term3 = 1 - Math.pow(x / obj.om2w2, 2);
    let term4 = obj.k2 / obj.k1;
    let solution = term1 / (term2 * term3 - term4);
    if (abs(solution) < 200) {
      return abs(solution);
    } else {
      return 200;
    }
  }

  static mag_func4(x, obj) {
    x = x / 5;
    let term1 = (1 - Math.pow(obj.w / obj.w2), 0.5);
    let term2 = 1 + obj.k2 / obj.k1 - Math.pow(x / obj.w1, 2);
    let term3 = 1 - Math.pow(x / obj.w2, 2);
    let term4 = obj.k2 / obj.k1;
    let solution = term1 / (term2 * term3 - term4);
    if (abs(solution) < 200) {
      return abs(solution);
    } else {
      return 200;
    }
  }
}
