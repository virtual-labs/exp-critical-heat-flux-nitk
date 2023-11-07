function runPage3() {
  background(255);
  image(bg, 0, 0);
  strokeWeight(0);

  stroke(0);
  fill(0);

  // fill(0);
  //   push();
  textSize(30);
  textFont("Comic Sans MS");
  text("Critical  Heat  Flux", 200, 50);

  textSize(16);
  text("CONTROLS", 650, 455);
  text("VARIABLES", 650, 115);
  pop();
  textSize(30);
  text("Observations and Calculations", 150, 150);
  let add = 200;
  textSize(20);
  spring1.initialise(voltage.inp, current.inp, length.inp, diameter.inp);
  spring1.update(t, factor);
  text("Area: " + spring1.A.toFixed(10) + " m^2", 70, 50 + add);
  text("Voltage: " + spring1.voltage.toFixed(3) + " V", 70, 90 + add);
  text("Curret: " + spring1.current.toFixed(3) + "A", 70, 130 + add);
  text("Heat Flux:" + spring1.q.toFixed(3) + " W/m^2", 70, 170 + add);
  text(
    "Heat Transfer Co-efficient: " + spring1.h.toFixed(3) + " W/m^2 K",
    70,
    210 + add
  );
  //text('Temperature Excess : ' + spring1.deltaT.toFixed(3) + " K", 70, 250+add);
  button3.draw();
  voltage.draw();
  length.draw();
  diameter.draw();
  current.draw();

  t = t + dt;
  //clear.mousePressed(clearMe);
}
