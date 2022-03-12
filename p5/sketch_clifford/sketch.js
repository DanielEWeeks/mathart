// Clifford Attractor
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
let npoints = 10000;
let PI = 3.14159265358979323846;
let inc = 2*PI/npoints;
let radius = DIAMETER/2;
let xlist = Array();
let ylist = Array();
let points = Array();
let step = 2;
let a = 1;
let b = 1;
let c = 2;
let d = 1.5;

var a1Slide;
let a2Slide;
let a3Slide;
let a4Slide;

var a1 = 1;
var a2 = 1;
var a3 = 2;
var a4 = 1.5;

let xmax = -1;
let ymax = -1;
let bmax = -1;

let vec = [];

//=================================================================
function setup() { 
  WIDTH = 675;
  HEIGHT = 675;
  canvas = createCanvas(WIDTH, HEIGHT);
  myScaledCanvas = createGraphics(WIDTH, HEIGHT);
  currentScale = 1; // initialize to 1; don't touch
  colorPicker = createColorPicker('rgb(0,0,0)');
  colorPicker.position(WIDTH + 5, HEIGHT - 5);
  let txt = createDiv('Background color');
  txt.position(WIDTH + 5, HEIGHT + 22);
  lineColorPicker = createColorPicker('rgb(255,255,0)');
  lineColorPicker.position(WIDTH + 75, HEIGHT - 5);
  let txt2 = createDiv('Line color');
  txt2.position(WIDTH + 75, HEIGHT - 22);
  
  a1Slide =  createSlider(-2, 2, a1, 0.1);
  a1Slide.position(WIDTH + 10, 20);
  a2Slide =  createSlider(-2, 2, a2, 0.1);
  a2Slide.position(WIDTH + 10, 50);
  a3Slide =  createSlider(-2, 2, a3, 0.1);
  a3Slide.position(WIDTH + 10, 80);
  a4Slide =  createSlider(-2, 2, a4, 0.1);
  a4Slide.position(WIDTH + 10, 110);
  
  valueDisplayer = createP();
  valueDisplayer.position(WIDTH + 180,5);
  a2valueDisplayer = createP();
  a2valueDisplayer.position(WIDTH + 180,35);
  a3valueDisplayer = createP();
  a3valueDisplayer.position(WIDTH + 180,65);
  a4valueDisplayer = createP();
  a4valueDisplayer.position(WIDTH + 180,95);
  


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
         if (key == 'r') {
               // Randomly set parameters
               a1 = random(-2, 2);
               a1Slide.value(a1);
               a2 = random(-2, 2);
               a2Slide.value(a2);
               a3 = random(-2, 2);
               a3Slide.value(a3);
               a4 = random(-2, 2);
               a4Slide.value(a4);
               a = a1;
               b = a2;
               c = a3;
               d = a4;
               loop();
            }

        }


function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    npoints = 500000;
    inc = 2*PI/npoints;
    loop();
  } else if (keyCode === LEFT_ARROW) {
    npoints = 10000;
    inc = 2*PI/npoints;
    loop();
  }
}

function mousePressed() { loop(); }

//=================================================================
function drawMyDesign() {
  // Draw your design in this function -- into the scaled canvas.
  // Notice how all drawing functions begin with "myScaledCanvas."
  
  // myScaledCanvas.background('rgb(30,144,255)');
  myScaledCanvas.background(colorPicker.color());
  myScaledCanvas.noFill();
  // myScaledCanvas.stroke('rgb(255,255,255)');
  myScaledCanvas.stroke(lineColorPicker.color(), 20);

  // 600*0.125 = 75 pixels = 1/8 inch at 600 PPI.
  // But here we are using 525 instead of 5250 for HEIGHT 
  // So 1/8 = 0.125 inch trim is 7.5 out of 525 pixels
   // myScaledCanvas.line(0,7.5,WIDTH,7.5);
   // myScaledCanvas.line(0,HEIGHT-7.5,WIDTH,HEIGHT-7.5);
  // myScaledCanvas.line(0,HEIGHT/2,WIDTH,HEIGHT/2);
   //  myScaledCanvas.line(0,249.375,WIDTH,249.375);
   // myScaledCanvas.line(0,HEIGHT-26.25,WIDTH,HEIGHT-26.25);
  myScaledCanvas.push();
  myScaledCanvas.translate(WIDTH/2, (HEIGHT/2));
  myScaledCanvas.rotate(-HALF_PI);
  // myScaledCanvas.circle(0, 0, DIAMETER);
  
  a1 = a1Slide.value();
  a2 = a2Slide.value();
  a3 = a3Slide.value();
  a4 = a4Slide.value();

  valueDisplayer.html('a = '+round(a1,3));
  a2valueDisplayer.html('b = '+round(a2,3));
  a3valueDisplayer.html('c = '+round(a3,3));
  a4valueDisplayer.html('d = '+round(a4,3));
  
  a = a1;
  b = a2;
  c = a3;
  d = a4;
  
  vec = [];
  
  xmax = -1;
  ymax = -1;
  bmax = -1;
  
  let trim = 50;
  
//  for (var i = 0; i < npoints; i += 1) {
  
//  xn+1 = sin(a yn) + c cos(a xn) 
//  yn+1 = sin(b xn) + d cos(b yn)
//    var x = random(-5,5);
//    var y = random(-5,5);
    var x = WIDTH/2;
    var y = HEIGHT/2;
    vec.push(new p5.Vector(WIDTH/2, HEIGHT/2));
    for (var j = 0; j < npoints; j += 1) {
     var x1 = sin(a*y) + c*cos(a*x);
     var y1 = sin(b*x) + d*cos(b*y);
     // var xx1 = map(x1, -3, 3, -WIDTH/2, WIDTH/2);
     // var yy1 = map(y1, -3, 3, HEIGHT/2, -HEIGHT/2);
     // myScaledCanvas.point(xx1,yy1);
     vec.push(new p5.Vector(x1,y1));
     x = x1;
     y = y1;
     xmax = max(abs(xmax), abs(x1));
     ymax = max(abs(ymax), abs(y1));
    }
//  }
   bmax = max(xmax,ymax);
   for (var i = 0; i < vec.length; i++) {
    let pt = vec[i];
    var xx1 = map(pt.x, -bmax, bmax, -WIDTH/2 + trim, WIDTH/2 - trim);
    var yy1 = map(pt.y, -bmax, bmax, HEIGHT/2 - trim, -HEIGHT/2 + trim);
    myScaledCanvas.point(xx1,yy1);
  }
  
  myScaledCanvas.pop();

}