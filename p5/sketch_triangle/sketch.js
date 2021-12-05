// Triangle Art
// Written by Daniel E. Weeks
//
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

let DIAMETER = 450; // 450 = 7.5 inches at 600 PPI
let npoints = 5;
let PI = 3.14159265358979323846;
let inc = 2*PI/npoints;
let radius = DIAMETER/2.5;
let xlist = Array();
let ylist = Array();
let points = Array();
let step = 2;

//=================================================================
function setup() {
  WIDTH = 600;
  HEIGHT = 600;
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

// function keyReleased() { if (key == 'e') exportHighResolution(); }
function keyReleased() {
         if (key == 'a') {
             // Increment step count
             step = step + 1;
             loop();
         } else {
             if (key == 's') {
               // Decrement step count
               step = step - 1;
               loop();
             } else {
              if (key == 'e') {
               // Export high resolution version
               exportHighResolution();
              }
             }
         }
        }


function keyPressed() {
  if (keyCode === UP_ARROW) {
    npoints = npoints + 1;
    inc = 2*PI/npoints;
    loop();
  } else if (keyCode === DOWN_ARROW) {
    npoints = npoints - 1;
    inc = 2*PI/npoints;
    loop();
  }
}

function mousePressed() { loop(); }

//=================================================================
function drawMyDesign() {
  // Draw your design in this function -- into the scaled canvas.
  // Notice how all drawing functions begin with "myScaledCanvas."

  myScaledCanvas.background('rgb(30,144,255)');
  myScaledCanvas.noFill();
  myScaledCanvas.stroke('rgb(192,192,192)');
  myScaledCanvas.colorMode(HSB, 360, 100, 100, 0.50);

  // 600*0.125 = 75 pixels = 1/8 inch at 600 PPI.
  // But here we are using 525 instead of 5250 for HEIGHT
  // So 1/8 = 0.125 inch trim is 7.5 out of 525 pixels
   // myScaledCanvas.line(0,7.5,WIDTH,7.5);
   // myScaledCanvas.line(0,HEIGHT-7.5,WIDTH,HEIGHT-7.5);
  // myScaledCanvas.line(0,HEIGHT/2,WIDTH,HEIGHT/2);
   //  myScaledCanvas.line(0,249.375,WIDTH,249.375);
   // myScaledCanvas.line(0,HEIGHT-26.25,WIDTH,HEIGHT-26.25);
  myScaledCanvas.push();
  myScaledCanvas.translate(WIDTH/3, (HEIGHT/2));
  myScaledCanvas.rotate(-HALF_PI);
  // myScaledCanvas.circle(0, 0, DIAMETER);
  let angle = 0;
           var hueA = random(360);

  for (var i = 0; i < npoints; i += 1) {
           var hueB = (hueA - 30 + 360) % 360;
          var hueC = (hueA + 30) % 360;
          if ((i%3) == 0) {
          myScaledCanvas.fill(hueA, 50, 100, 0.2);
          } else if ((i%3) == 1) {
          myScaledCanvas.fill(hueB, 50, 100, 0.2);
          } else {
            myScaledCanvas.fill(hueC, 50, 100, 0.2);
          }
    myScaledCanvas.push();
    myScaledCanvas.rotate(angle);
    myScaledCanvas.scale(2*(i+1)/npoints);
    myScaledCanvas.triangle(0,140,-140,140,0,0);
    myScaledCanvas.pop();
    angle = angle + inc;
  }
  myScaledCanvas.pop();

}
