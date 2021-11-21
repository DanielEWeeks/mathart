// Exports a high-resolution image when 'e' key is pressed.
// based on 'high-res-export by golan' code from
// https://editor.p5js.org/golan/sketches/qKJcoNHXX
//

let outputScale = 10/2;
let currentScale;
let myScaledCanvas;
let canvas;
let sign;


//=================================================================
function setup() {
  WIDTH = 600;
  HEIGHT = WIDTH;
  canvas = createCanvas(WIDTH, HEIGHT);
  myScaledCanvas = createGraphics(WIDTH, HEIGHT);
  currentScale = 1; // initialize to 1; don't touch
  npoints = 5;
  inc = WIDTH/npoints;
  diameter = inc/1.5;
  palette = Array("#4464a1", "#56a1c4", "#ee726b", "#ffc5c7", "#fef9c6", "#df5f50", "#5a3034", "#f5b800", "#ffcc4d", "#4b8a5f", "#e590b8");

}

function draw() {
  // Don't touch the contents of the draw loop!
  // Instead, modify the guts of the drawMyDesign() function.
  myScaledCanvas.clear();
  myScaledCanvas.push();
  myScaledCanvas.scale(currentScale);
  drawMyDesign();
  myScaledCanvas.pop();
  image(myScaledCanvas, 0, 0); // Show on the main canvas
  noLoop();
}

// Scale up graphics before exporting
function exportHighResolution() {
  currentScale = outputScale; // High-Res Export
  myScaledCanvas = createGraphics(currentScale * WIDTH, currentScale * HEIGHT);
  draw();
  save(myScaledCanvas, "highResImage", 'png');
  currentScale = 1; // Reset to default scale 1:1
  myScaledCanvas = createGraphics(WIDTH, HEIGHT);
  draw();
}

function keyReleased() { if (key == 'e') exportHighResolution(); }
function mousePressed() { loop(); }

function randomSign() {
  if (random(1) < 0.5) {
    sign = 1
  } else {
    sign = -1
  }
  return(sign);
}

//=================================================================
function drawMyDesign() {
  // Draw your design in this function -- into the scaled canvas.
  // Notice how all drawing functions begin with "myScaledCanvas."

  myScaledCanvas.background('rgb(255,255,255)');
  myScaledCanvas.fill(255, 0, 100,120);
  myScaledCanvas.noStroke();
  myScaledCanvas.colorMode(HSB, 360, 100, 100, 0.50);
  myScaledCanvas.angleMode(DEGREES);
  // Draw grid
  xpos = 0;
   for (var i = 0; i <= npoints; i += 1) {
      ypos = 0;
      for (var j = 0; j <= npoints; j += 1) {
          // myScaledCanvas.line(xpos,ypos,xpos,ypos+WIDTH);
          // myScaledCanvas.text(i,xpos,ypos);
          myScaledCanvas.line(xpos,ypos,xpos+WIDTH,ypos);
          myScaledCanvas.line(xpos,ypos,xpos,ypos+WIDTH);
          ypos = ypos + inc;
      }
      xpos = xpos + inc;
  }
  // Draw circles centered in grid
  xpos = inc/2;
  for (var i = 0; i < npoints; i += 1) {
      ypos = inc/2;
      // shuffle(palette, true);
      for (var j = 0; j < npoints; j += 1) {
          var hueA = random(360);
          var hueB = (hueA - 30 + 360) % 360;
          var hueC = (hueA + 30) % 360;
          xshift = random(inc/3)*randomSign();
          yshift = random(inc/3)*randomSign();
          myScaledCanvas.fill(hueA, 50, 100, 0.2);
          myScaledCanvas.circle(xpos,ypos,diameter/1.5);
          // shuffle(palette, true);
          myScaledCanvas.fill(hueB, 50, 100, 0.2);
          myScaledCanvas.circle(xpos + xshift,ypos + yshift,diameter/1.5);
          xshift = random(inc/3)*randomSign();
          yshift = random(inc/3)*randomSign();
          myScaledCanvas.fill(hueC, 50, 100, 0.2);
          myScaledCanvas.circle(xpos + xshift,ypos + yshift,diameter/1.5);

          // myScaledCanvas.text(floor(hueA),xpos,ypos);
          ypos = ypos + inc;
      }
      xpos = xpos + inc;
      myScaledCanvas.text(xpos,xpos,ypos);
  }

}
