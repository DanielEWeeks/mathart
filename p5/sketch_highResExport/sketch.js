// Exports a high-resolution image when 'e' key is pressed.
// based on 'high-res-export by golan' code from
// https://editor.p5js.org/golan/sketches/qKJcoNHXX
//
// A Lulu calendar page is 11.25 x 8.75 inches
//           Trimmed it is 11.00 x 8.50 inches
// At 600 ppi, 8.75 x 600 = 5,250 pixels.
//            11.25 x 600 = 6,750 pixels.
// The trimmed page is 8.5 inches tall
// so make sure to have at least 1/8 = 0.125 inch margin
// on top and bottom that will be trimmed off. 
// And it runs 8 3/16 inches down before it runs into
// the spiral cuts.
//
//  ( 1350 x 1050 ) x 5  = ( 6750 x 5250 )
//  (  675 x 525 )  x 10 = ( 6750 x 5250 )


let outputScale = 10/2;
let currentScale;
let myScaledCanvas;
let canvas;

//=================================================================
function setup() { 
  WIDTH = 675;
  HEIGHT = 525;
  canvas = createCanvas(WIDTH, HEIGHT);
  myScaledCanvas = createGraphics(WIDTH, HEIGHT);
  currentScale = 1; // initialize to 1; don't touch
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
  
  myScaledCanvas.background('rgb(30,144,255)');
  myScaledCanvas.fill(255, 0, 100,120);  
  myScaledCanvas.ellipse(WIDTH/3,HEIGHT/3,HEIGHT/2,HEIGHT/2);
  myScaledCanvas.ellipse(2*WIDTH/3,2*HEIGHT/3,HEIGHT/2,HEIGHT/2);
  myScaledCanvas.ellipse(WIDTH/3,2*HEIGHT/3,HEIGHT/2,HEIGHT/2);
  myScaledCanvas.ellipse(2*WIDTH/3,HEIGHT/3,HEIGHT/2,HEIGHT/2);
  myScaledCanvas.ellipse(WIDTH/2,HEIGHT/2,HEIGHT/2,HEIGHT/2);

}