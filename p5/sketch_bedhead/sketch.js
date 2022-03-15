// Bedhead attractor
// Written by Daniel E. Weeks
//
// Exports a high-resolution image when 'e' key is pressed.
// based on 'high-res-export by golan' code from
// https://editor.p5js.org/golan/sketches/qKJcoNHXX

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

var a1 = -0.67;
var a2 = 0.83;
var a3 = -0.46;
var a4 = 0.01;

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
  
  a1Slide =  createSlider(-1, 1, a1, 0.01);
  a1Slide.position(WIDTH + 10, 20);
  a2Slide =  createSlider(-1, 1, a2, 0.01);
  a2Slide.position(WIDTH + 10, 50);
  a3Slide =  createSlider(-1, 1, a3, 0.01);
  a3Slide.position(WIDTH + 10, 80);
  a4Slide =  createSlider(-1, 1, a4, 0.01);
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

function keyReleased() { 
         if (key == 'a') { 
             // Increment npoints
             npoints = npoints + 10000; 
             loop();
         } else {
             if (key == 's') {
               // Decrement npoints
               npoints = npoints - 10000;
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
               a1 = random(-1, 1);
               a1Slide.value(a1);
               a2 = random(-1, 1);
               a2Slide.value(a2);
               a3 = random(-0.5, 0.5);
               a3Slide.value(a3);
               a4 = random(-0.03, 0.03);
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
  myScaledCanvas.background(colorPicker.color());
  myScaledCanvas.noFill();
  myScaledCanvas.stroke(lineColorPicker.color(), 20);

  myScaledCanvas.push();
  myScaledCanvas.translate(WIDTH/2, (HEIGHT/2));
  myScaledCanvas.rotate(-HALF_PI);
  
  a1 = a1Slide.value();
  a2 = a2Slide.value();
  a3 = a3Slide.value();
  a4 = a4Slide.value();

  valueDisplayer.html('a = '+round(a1,3));
  a2valueDisplayer.html('b = '+round(a2,3));
  a3valueDisplayer.html('c = '+round(a3,3));
  a4valueDisplayer.html('x0 = '+round(a4,3));
  
  a = a1;
  b = a2;
  c = a3;
  d = a4;
  
  vec = [];
  
  xmax = -1;
  ymax = -1;
  bmax = -1;
  
  let trim = 50;
  var x = 1;
  var y = 1;
  vec.push(new p5.Vector(WIDTH/2, HEIGHT/2));
  for (var j = 0; j < npoints; j += 1) {
     var x1 =  sin(x*y/b)*y + cos(a*x-y);
     var y1 =  x + sin(y)/b;
     vec.push(new p5.Vector(x1,y1));
     x = x1;
     y = y1;
     xmax = max(abs(xmax), abs(x1));
     ymax = max(abs(ymax), abs(y1));
   }
   bmax = max(xmax,ymax);
   for (var i = 0; i < vec.length; i++) {
    let pt = vec[i];
    var xx1 = map(pt.x, -bmax, bmax, -WIDTH/2 + trim, WIDTH/2 - trim);
    var yy1 = map(pt.y, -bmax, bmax, HEIGHT/2 - trim, -HEIGHT/2 + trim);
    myScaledCanvas.point(xx1,yy1);
  }  
  myScaledCanvas.pop();
}



