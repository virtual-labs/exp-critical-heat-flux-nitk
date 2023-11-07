function handleEvents() {
  // console.log(mouseX, mouseY)

  if (button1.in(mouseX, mouseY) && page1) {
    if (animation) {
      noLoop();
      button1.icon = play;
      button1.draw();
      animation = false;
      touch = true;
    } else {
      loop();
      button1.icon = pause;
      button1.draw();
      animation = true;
      touch = false;
    }
  }
  if (button2.in(mouseX, mouseY) && page1) {
    // position_graph1.delete();
    // position_graph2.delete();
    page1 = false;
    page3 = true;
    // runPage2();
    runPage3();
  }
  if (button3.in(mouseX, mouseY) && page3) {
    //  position_graph1.delete();
    //  position_graph2.delete();
    page1 = true;
    page3 = false;
    runPage1();
  }

  //   if (button4.in(mouseX, mouseY) && page2) {
  //     console.log(1);
  //     runPage3();
  //     position_graph1.delete();
  //     position_graph2.delete();
  //     page3 = true;
  //     page2 = false;

  //     //magFac2.initialise();
  //   }

  //   if (button5.in(mouseX, mouseY) && page3) {
  //     position_graph1.delete();
  //     position_graph2.delete();
  //     page2 = true;
  //     page3 = false;
  //     //magFac1.initialise();
  //   }
}
