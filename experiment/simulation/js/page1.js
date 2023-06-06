function runPage1() {
  background(255);
  image(bg, 0, 0);

  strokeWeight(0);
  stroke(0);
  fill(0);
  push();
  textSize(30);
  textFont("Comic Sans MS");
  text("Critical  Heat  Flux", 200, 50);
  //text('Forced Vibration with rotating unbalance' , 200 , 80);

  textSize(16);
  text("CONTROLS", 650, 452);
  text("VARIABLES", 650, 115);
  pop();

  push();
  stroke(0);

  // for (let i = 20; i < 591; i++) {
  //     point(i, 480);
  //     i += 2;
  // }

  // for (let i = 480; i < 570; i++) {
  //     point(300, i);
  //     i += 2;
  // }
  pop();

  spring1.initialise(voltage.inp, current.inp, length.inp, diameter.inp);
  spring1.update(t, factor);

  spring1.show(0, 1, 0);
  /*  text("m1" , 350 , 200);
    text("k1" , 550-20 , 470 );
    text("k2" , 550-10 , 570 );
    text("m1" , 350 , 320+150 );
    text("m2" , 350 , 420 +150);

    position_graph1.update(spring1.y1);
    position_graph1.draw(255, 0,0)

    position_graph2.update(spring1.y2);
    position_graph2.draw(255, 0, 0)

    position_graph3.update(spring1.y3);
    position_graph3.draw(255, 0,0)

    strokeWeight(0)

    text('Machine with  an absorber' , 360 , 340);
    text('Machine without an absorber' , 360 , 130);

    textSize(16);
    textFont("Comic Sans MS")
    fill(250, 114, 43);
    
    text('ω1 = ' + spring1.w1.toFixed(4) + " rad/s", 50, 690);
    text('ω2 = ' + spring1.w2.toFixed(4) + " rad/s", 50, 720);
    text('ω/ω2 = ' + (spring1.w/spring1.w2).toFixed(4) + " rad/s", 310, 720)
    text('ω/ω1 = ' + (spring1.w/spring1.w1).toFixed(4) + " rad/s", 310, 690)
    text('X1 = ' + abs((spring1.x1)).toFixed(4) + "", 500, 690)
    text('X2 = ' + abs((spring1.x2)).toFixed(4) + "", 500, 720)
   // text('X1/Xst = ' +  (abs(spring1.x1/(spring1.F0/spring1.k1))).toFixed(4) , 40, 720)
   // text('X2/Xst = ' + (spring1.w/spring1.w1).toFixed(4) + " rad/s", 310, 690)
    
    strokeWeight(0.5);   
    line(0, 650, 680, 650)
    line(300,650,300,750) 

  //  line (spring1.masscoordinates[0]+10, spring1.masscoordinates[1]+10, position_graph1.graphend[0]+10, position_graph1.graphend[1]+10)
   // line (spring1.masscoordinates[2]+10, spring1.masscoordinates[3]+10, position_graph2.graphend[0]+10, position_graph2.graphend[1]+10)

    //text('η = ' + (slider_ang_freq.inp / spring1.wn).toFixed(4), 310, 535);
    //text('z = ' + z.inp.toFixed(4), 310, 550);
    fill(0,0,0)
    textSize(20);
    // text("Undamped Tuned Vibration Absorber", 115, 150);

    F0.draw();
    w.draw();
  //  mu.draw();
    m1.draw();
    k1.draw();
    m2.draw();
    k2.draw();
    */

  voltage.draw();
  current.draw();
  length.draw();
  diameter.draw();
  button1.draw();
  button2.draw();

  t = t + dt;
}
