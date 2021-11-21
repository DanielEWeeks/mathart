// Exports a high-resolution image when 'e' key is pressed.
// based on 'high-res-export by golan' code from
// https://editor.p5js.org/golan/sketches/qKJcoNHXX
//

let outputScale = 10/2;
let currentScale;
let myScaledCanvas;
let canvas;


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

//=================================================================
function drawMyDesign() {
  // Draw your design in this function -- into the scaled canvas.
  // Notice how all drawing functions begin with "myScaledCanvas."

  myScaledCanvas.background('rgb(255,255,255)');
  myScaledCanvas.fill(255, 0, 100,120);
  myScaledCanvas.stroke(0,0,0);
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
          shuffle(palette, true);
          myScaledCanvas.fill(palette[0]);
          myScaledCanvas.circle(xpos,ypos,diameter);
          // shuffle(palette, true);
          myScaledCanvas.fill(palette[0]);
          myScaledCanvas.circle(xpos,ypos,diameter/1.5);

          // myScaledCanvas.text(j,xpos,ypos);
          ypos = ypos + inc;
      }
      xpos = xpos + inc;
      myScaledCanvas.text(xpos,xpos,ypos);
  }

}
