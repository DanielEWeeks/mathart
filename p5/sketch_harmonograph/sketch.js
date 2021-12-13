// Harmongraph Art
// Based on code from 'harmograph' by oshoham:
//   https://editor.p5js.org/oshoham/sketches/rJ5mypskW
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

let npoints = 50000;

let step = 1;

let pass = 1;

let a1Slide;
let a2Slide;
let a3Slide;
let a4Slide;
let f1Slide;
let f2Slide;
let f3Slide;
let f4Slide;

var deepSlateGreen;
var seashellPink;

var white;
var oldRose;

var sulphurYellow;
var black;

var carmineRed;

var paleKingsBlue;

var duskyGreen;
var ivoryBuff;

// var line;

// amplitude
var a1;
var a2;
var a3;
var a4;

// frequency
var f1;
var f2;
var f3;
var f4;

// phase
var p1;
var p2;
var p3;
var p4;

// damping
var d1;
var d2;
var d3;
var d4;

var txt;

//=================================================================
function setup() {
  WIDTH = 600;
  HEIGHT = 600;
  canvas = createCanvas(WIDTH, HEIGHT);
  myScaledCanvas = createGraphics(WIDTH, HEIGHT);
  currentScale = 1; // initialize to 1; don't touch
  a1Slide =  createSlider(0, 500, 100, 0.2);
  a1Slide.position(610, 20);
  a2Slide =  createSlider(0, 500, 100, 0.2);
  a2Slide.position(610, 50);
  a3Slide =  createSlider(0, 500, 100, 0.2);
  a3Slide.position(610, 80);
  a4Slide =  createSlider(0, 500, 100, 0.2);
  a4Slide.position(610, 110);

  f1Slide =  createSlider(0, 20, 2, 1);
  f1Slide.position(610, 140);
  f2Slide =  createSlider(0, 20, 6, 1);
  f2Slide.position(610, 170);
  f3Slide =  createSlider(1.01, 2, 1, 0);
  f3Slide.position(610, 200);
  f4Slide =  createSlider(0, 20, 3, 1);
  f4Slide.position(610, 230);

  d1Slide =  createSlider(0, 1, 0, 0.1);
  d1Slide.position(610, 290);
  d2Slide =  createSlider(0, 1, 0, 0.1);
  d2Slide.position(610, 310);
  d3Slide =  createSlider(0, 1, 0, 0.1);
  d3Slide.position(610, 340);
  d4Slide =  createSlider(0, 1, 0, 0.1);
  d4Slide.position(610, 370);

  valueDisplayer = createP();
  valueDisplayer.position(780,5);
  a2valueDisplayer = createP();
  a2valueDisplayer.position(780,35);
  a3valueDisplayer = createP();
  a3valueDisplayer.position(780,65);
  a4valueDisplayer = createP();
  a4valueDisplayer.position(780,95);

  f1valueDisplayer = createP();
  f1valueDisplayer.position(780,125);
  f2valueDisplayer = createP();
  f2valueDisplayer.position(780,155);
  f3valueDisplayer = createP();
  f3valueDisplayer.position(780,185);
  f4valueDisplayer = createP();
  f4valueDisplayer.position(780,215);

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
             step = step + 0.01;
             loop();
         } else {
             if (key == 's') {
               // Decrement step count
               step = step - 0.01;
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
  if (keyCode === RIGHT_ARROW) {
    npoints = npoints + 10000;
    inc = 2*PI/npoints;
    loop();
  } else if (keyCode === LEFT_ARROW) {
    npoints = npoints - 10000;
    inc = 2*PI/npoints;
    loop();
  } else if (keyCode === UP_ARROW) {
    loop();
  } else if (keyCode === DOWN_ARROW) {
    loop();
  }

}

function mousePressed() { loop(); }

//=================================================================
function drawMyDesign() {
  // Draw your design in this function -- into the scaled canvas.
  // Notice how all drawing functions begin with "myScaledCanvas."

  // myScaledCanvas.background('rgb(30,144,255)');

  // 600*0.125 = 75 pixels = 1/8 inch at 600 PPI.
  // But here we are using 525 instead of 5250 for HEIGHT
  // So 1/8 = 0.125 inch trim is 7.5 out of 525 pixels
   // myScaledCanvas.line(0,7.5,WIDTH,7.5);
   // myScaledCanvas.line(0,HEIGHT-7.5,WIDTH,HEIGHT-7.5);
  // myScaledCanvas.line(0,HEIGHT/2,WIDTH,HEIGHT/2);
   //  myScaledCanvas.line(0,249.375,WIDTH,249.375);
   // myScaledCanvas.line(0,HEIGHT-26.25,WIDTH,HEIGHT-26.25);
  var line = [];

  deepSlateGreen = color('#202C29'); // CMYK(80, 50, 60, 70)
  seashellPink = color('#EBCFB7'); // CMYK(0, 19, 23, 0)

  oldRose = color('#AF636A'); // CMYK(15, 70, 40, 0)

  sulphurYellow = color('#EFE8C0'); // CMYK(4, 4, 28, 0)
  black = color('#1B201C'); // CMYK(20, 10, 15, 100)

  carmineRed = color('#802935'); // CMYK(25, 95, 80, 16)

  paleKingsBlue = color('#B8D0DD'); // CMYK(33, 4, 7, 0)

  duskyGreen = color('#154A42'); // CMYK(100, 30, 64, 50)
  ivoryBuff = color('#DDCC9E'); // CMYK(8, 15, 40, 0)

  a1 = 100;
  a2 = 100;
  a3 = 100;
  a4 = 100;

  f1 = 2;
  f2 = 6;
  f3 = 1.01;
  f4 = 3;

  p1 = PI / 16;
  p2 = 3 * PI / 2;
  p3 = 13 * PI / 16;
  p4 = PI;

  d1 = 0;
  d2 = 0;
  d3 = 0;
  d4 = 0;




  a1 = a1Slide.value();
  a2 = a2Slide.value();
  a3 = a3Slide.value();
  a4 = a4Slide.value();

  f1 = f1Slide.value();
  f2 = f2Slide.value();
  f3 = step*f3Slide.value();
  f4 = f4Slide.value();

  d1 = d1Slide.value();
  d2 = d2Slide.value();
  d3 = d3Slide.value();
  d4 = d4Slide.value();


  var t = 0;

  // myScaledCanvas.background(duskyGreen);
  // myScaledCanvas.stroke(ivoryBuff);
 // myScaledCanvas.fill(oldRose);
  myScaledCanvas.background('rgb(30,144,255)');
  myScaledCanvas.fill('rgb(192,192,192)');
  myScaledCanvas.stroke('rgb(255,255,255)');
  // myScaledCanvas.colorMode(HSB, 360, 100, 100, 0.50);

  myScaledCanvas.strokeWeight(1);

  // var t = (millis() / 1000);
  // myScaledCanvas.text(a1, 50, 20);
  valueDisplayer.html('a1 = '+round(a1,3));
  a2valueDisplayer.html('a2 = '+round(a2,3));
  a3valueDisplayer.html('a3 = '+round(a3,3));
  a4valueDisplayer.html('a4 = '+round(a4,3));

  f1valueDisplayer.html('f1 = '+round(f1,3));
  f2valueDisplayer.html('f2 = '+round(f2,3));
  f3valueDisplayer.html('f3 = '+round(f3,3));
  f4valueDisplayer.html('f4 = '+round(f4,3));

  // translate(width / 2, height / 2);
  myScaledCanvas.translate(WIDTH/2, (HEIGHT/2));

  for (var tt = 0; tt < npoints; tt++) {
      t = tt/1000;
  line.push({
    x: (a1 * sin(t * f1 + p1) * exp(-d1 * t)) + (a2 * sin(t * f2 + p2) * exp(-d2 * t)),
    y: (a3 * sin(t * f3 + p3) * exp(-d3 * t)) + (a4 * sin(t * f4 + p4) * exp(-d4 * t)),
  })
  }

  myScaledCanvas.push();
  drawVertices(line);
  myScaledCanvas.pop();

}

function drawVertices(vertices) {
  myScaledCanvas.noFill();
  myScaledCanvas.beginShape();
  for (var i = 0; i < vertices.length; i++) {
   	myScaledCanvas.vertex(vertices[i].x, vertices[i].y);
  }
  myScaledCanvas.endShape();
}
