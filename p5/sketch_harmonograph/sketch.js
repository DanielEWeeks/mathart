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

// python -m SimpleHTTPServer
// http://localhost:8000/sketch_harmonograph

let outputScale = 10/2;
let currentScale;
let myScaledCanvas;
let canvas;

let npoints = 50000;

let step = 0;

let pass = 1;

var a1Slide;
let a2Slide;
let a3Slide;
let a4Slide;
var f1Slide;
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

// var myLine;

// amplitude
var a1 = 200;
var a2 = 100;
var a3 = 100;
var a4 = 100;

// frequency
var f1 = 2;
var f2 = 6;
var f3 = 1.01;
var f4 = 3;

// phase
var p1 = Math.PI/16;
var p2 = 3*Math.PI/2;
var p3 = 13*Math.PI/16;
var p4 = Math.PI;

// damping
var d1 = 0.01;
var d2 = 0;
var d3 = 0;
var d4 = 0;

// background color
var bhue = 250;
var bsat = 100;
var bbri = 100;

var txt;

//  a1 = 100;
//  a2 = 100;
//  a3 = 100;
//  a4 = 100;

//  f1 = 2;
//  f2 = 6;
//  f3 = 1.01; //1.01
//  f4 = 3; //3

//  p1 = PI/16;
//  p2 = 3 * PI / 2;
//  p3 = 13 * PI / 16;
//  p4 = PI;

//  d1 = 0.02;
//  d2 = 0;
//  d3 = 0;
//  d4 = 0;

var table;
var nrow = 5;

var colorChange = 0;

var RkeyPressed = false;

var pArray = [];

// Load a comma-separated table where each row is a set of parameters.
// Here's an example:
// a1,a2,a3,a4,f1,f2,f3,f4,p1,p2,p3,p4,d1,d2,d3,d4
// 100,100,100,100,2,6,1.01,3,0.1963495,4.712389,2.552544,3.141593,0,0,0,0

function preload() {
  table = loadTable('data.csv', 'csv', 'header');
  // console.log('table row count',table.getRowCount);
}

//=================================================================
function setup() {
  WIDTH = 600;
  HEIGHT = 600;
  canvas = createCanvas(WIDTH, HEIGHT);
  myScaledCanvas = createGraphics(WIDTH, HEIGHT);
  currentScale = 1; // initialize to 1; don't touch

  // table = loadTable('data.csv', 'csv', 'header');
  // console.log('table row count',table.getRowCount());
  //  print(table.getRowCount());
  let pNpoints = 4;
  for (var k = 0; k < pNpoints; k++) {
    pArray.push(k*PI/(pNpoints))
  }

  // Set parameters to the values read from the `nrow` of table `data.csv`
  a1 = table.getNum(nrow,'a1');
  a2 = table.getNum(nrow,'a2');
  a3 = table.getNum(nrow,'a3');
  a4 = table.getNum(nrow,'a4');

  f1 = table.getNum(nrow,'f1');
  f2 = table.getNum(nrow,'f2');
  f3 = table.getNum(nrow,'f3');
  f4 = table.getNum(nrow,'f4');

  p1 = table.getNum(nrow,'p1');
  p2 = table.getNum(nrow,'p2');
  p3 = table.getNum(nrow,'p3');
  p4 = table.getNum(nrow,'p4');

  d1 = table.getNum(nrow,'d1');
  d2 = table.getNum(nrow,'d2');
  d3 = table.getNum(nrow,'d3');
  d4 = table.getNum(nrow,'d4');

  a1Slide =  createSlider(0, 500, a1, 0.2);
  a1Slide.position(610, 20);
  a2Slide =  createSlider(0, 500, a2, 0.2);
  a2Slide.position(610, 50);
  a3Slide =  createSlider(0, 500, a3, 0.2);
  a3Slide.position(610, 80);
  a4Slide =  createSlider(0, 500, a4, 0.2);
  a4Slide.position(610, 110);

  f1Slide =  createSlider(0, 20, f1, 0.01);
  f1Slide.position(610, 140);
  f2Slide =  createSlider(0, 20, f2, 0.01);
  f2Slide.position(610, 170);
  f3Slide =  createSlider(0, 20, f3, 0.01);
  f3Slide.position(610, 200);
  f4Slide =  createSlider(0, 20, f4, 0.01);
  f4Slide.position(610, 230);

  d1Slide =  createSlider(0, 0.07, d1, 0.0001);
  d1Slide.position(610, 290);
  d2Slide =  createSlider(0, 0.07, d2, 0.0001);
  d2Slide.position(610, 320);
  d3Slide =  createSlider(0, 0.07, d3, 0.0001);
  d3Slide.position(610, 350);
  d4Slide =  createSlider(0, 0.07, d4, 0.0001);
  d4Slide.position(610, 380);

  p1Slide =  createSlider(0, 2*PI, p1, PI/16);
  p1Slide.position(610, 420);
  p2Slide =  createSlider(0, 2*PI, p2, PI/16);
  p2Slide.position(610, 450);
  p3Slide =  createSlider(0, 2*PI, p3, PI/16);
  p3Slide.position(610, 480);
  p4Slide =  createSlider(0, 2*PI, p4, PI/16);
  p4Slide.position(610, 510);

  bhueSlide =  createSlider(0, 360,250);
  bhueSlide.position(610, 550);
  bsatSlide =  createSlider(0, 100,100);
  bsatSlide.position(610, 580);
  bbriSlide =  createSlider(0, 100,100);
  bbriSlide.position(610, 610);

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

  d1valueDisplayer = createP();
  d1valueDisplayer.position(780,275);
  d2valueDisplayer = createP();
  d2valueDisplayer.position(780,305);
  d3valueDisplayer = createP();
  d3valueDisplayer.position(780,335);
  d4valueDisplayer = createP();
  d4valueDisplayer.position(780,365);

  p1valueDisplayer = createP();
  p1valueDisplayer.position(780,405);
  p2valueDisplayer = createP();
  p2valueDisplayer.position(780,435);
  p3valueDisplayer = createP();
  p3valueDisplayer.position(780,465);
  p4valueDisplayer = createP();
  p4valueDisplayer.position(780,495);

  bhuevalueDisplayer = createP();
  bhuevalueDisplayer.position(780,535);
  bsatvalueDisplayer = createP();
  bsatvalueDisplayer.position(780,565);
  bbrivalueDisplayer = createP();
  bbrivalueDisplayer.position(780,595);

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
function exportHighResolution(timeStamp) {
  currentScale = outputScale; // High-Res Export
  myScaledCanvas = createGraphics(currentScale * WIDTH, currentScale * HEIGHT);
  draw();
  save(myScaledCanvas, "highResImage" + timeStamp, 'png');
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
         } else if (key == 's') {
               // Decrement step count
               step = step - 0.01;
               loop();
        } else if (key == 'r') {
               RkeyPressed = true;
               // Randomly set f1,f2,f3,f4
               f1 = int(random(0, 9));
               f1Slide.value(f1);
               f2 = int(random(0, 9));
               f2Slide.value(f2);
               f3 = int(random(0, 9));
               f3Slide.value(f3);
               f4 = int(random(0, 9));
               f4Slide.value(f4);

               p1 = random(pArray);
               p1Slide.value(p1);
               p2 = random(pArray);
               p2Slide.value(p2);
               p3 = random(pArray);
               p3Slide.value(p3);
               p4 = random(pArray);
               p4Slide.value(p4);

               loop();
         }else if (key == 'e') {
               // Save current set of parameters to the table
               addNewRow(table);
               // Save table
              let timeStamp = "_" + year()  + month() + day() + "-" + hour() + "-" + minute() + "-" + second();
               saveTable(table, 'data' + timeStamp + '.csv');
               // Save a single row table recording the parameters for this plot
               saveImageTable(timeStamp);
               // Export high resolution version
               exportHighResolution(timeStamp);
         } else if (key == 'q') {
               // Loop through the rows in the parameter table
               nrow = nrow + 1;
               if (nrow >= table.getRowCount()) {
                 nrow = 0;
               }
               loadNewRow(table, nrow);
               loop();
         } else if (key == 'w') {
              // Loop through the rows in the parameter table
              nrow = nrow - 1;
               if (nrow < 0) {
                 nrow = table.getRowCount() - 1;
               }
               loadNewRow(table, nrow);
               loop();
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
  var myLine = [];

  deepSlateGreen = color('#202C29'); // CMYK(80, 50, 60, 70)
  seashellPink = color('#EBCFB7'); // CMYK(0, 19, 23, 0)

  oldRose = color('#AF636A'); // CMYK(15, 70, 40, 0)

  sulphurYellow = color('#EFE8C0'); // CMYK(4, 4, 28, 0)
  black = color('#1B201C'); // CMYK(20, 10, 15, 100)

  carmineRed = color('#802935'); // CMYK(25, 95, 80, 16)

  paleKingsBlue = color('#B8D0DD'); // CMYK(33, 4, 7, 0)

  duskyGreen = color('#154A42'); // CMYK(100, 30, 64, 50)
  ivoryBuff = color('#DDCC9E'); // CMYK(8, 15, 40, 0)



  a1 = a1Slide.value();
  a2 = a2Slide.value();
  a3 = a3Slide.value();
  a4 = a4Slide.value();

  // if (RkeyPressed == true) {
  //  RkeyPressed = false;
  // } else {
  f1 = f1Slide.value();
  f2 = f2Slide.value();
  f3 = step + f3Slide.value();
  f4 = f4Slide.value();
  // }

  d1 = d1Slide.value();
  d2 = d2Slide.value();
  d3 = d3Slide.value();
  d4 = d4Slide.value();

  p1 = p1Slide.value();
  p2 = p2Slide.value();
  p3 = p3Slide.value();
  p4 = p4Slide.value();

  bhue = bhueSlide.value();
  bsat = bsatSlide.value();
  bbri = bbriSlide.value();

  var t = 0;

  // myScaledCanvas.background(duskyGreen);
  // myScaledCanvas.stroke(ivoryBuff);
 // myScaledCanvas.fill(oldRose);
 // myScaledCanvas.background('rgb(30,144,255)');

  myScaledCanvas.fill('rgb(192,192,192)');
  myScaledCanvas.stroke('rgb(255,255,255)');
  myScaledCanvas.colorMode(HSB, 360, 100, 100, 0.50);
  myScaledCanvas.background(bhue,bsat,bbri);


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

  d1valueDisplayer.html('d1 = '+round(d1,5));
  d2valueDisplayer.html('d2 = '+round(d2,5));
  d3valueDisplayer.html('d3 = '+round(d3,5));
  d4valueDisplayer.html('d4 = '+round(d4,5));

  p1valueDisplayer.html('p1 = '+round(p1,3));
  p2valueDisplayer.html('p2 = '+round(p2,3));
  p3valueDisplayer.html('p3 = '+round(p3,3));
  p4valueDisplayer.html('p4 = '+round(p4,3));

  bhuevalueDisplayer.html('hue= '+ bhue);
  bsatvalueDisplayer.html('sat = '+ bsat);
  bbrivalueDisplayer.html('bri = '+ bbri);

  // translate(width / 2, height / 2);
  myScaledCanvas.translate(WIDTH/2, (HEIGHT/2));

  for (var tt = 0; tt < npoints; tt++) {
      t = tt/1000;
  myLine.push({
    x: (a1 * sin(t * f1 + p1) * exp(-d1 * t)) + (a2 * sin(t * f2 + p2) * exp(-d2 * t)),
    y: (a3 * sin(t * f3 + p3) * exp(-d3 * t)) + (a4 * sin(t * f4 + p4) * exp(-d4 * t)),
  })
  }

  // ParametricPlot[{
  // on1*Sin[(a + afine) t + phase1] Exp[-xdamp1 t] +
  // on2*Sin[(b + bfine) t + phase2] Exp[-xdamp2 t],
  // on3*Sin[(c + cfine) t + phase3] Exp[-ydamp1 t] +
  // on4*Sin[(d + dfine) t + phase4] Exp[-ydamp2 t]}

  myScaledCanvas.push();
  drawVerticesLerp(myLine);
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

function drawVerticesColor(theLine) {
  myScaledCanvas.noFill();
  colorChange = 0;
  for (var i = 0; i < theLine.length-1; i++) {
    myScaledCanvas.stroke(colorChange, 255, 255);
   	myScaledCanvas.line(theLine[i].x, theLine[i].y,theLine[i+1].x, theLine[i+1].y);
   	colorChange += 1/50;
        if (colorChange > 255) {
            colorChange = 0;
        }
  }
}

function drawVerticesLerp(theLine) {
  myScaledCanvas.noFill();
  for (var i = 0; i < theLine.length-1; i++) {
    myScaledCanvas.stroke(lerpColor(color('red'),color('yellow'), i/(theLine.length -1)));
   	myScaledCanvas.line(theLine[i].x, theLine[i].y,theLine[i+1].x, theLine[i+1].y);
  }
}


function loadNewRow(table, nrow) {

  // Load the parameters from the current row
  a1 = table.getNum(nrow,'a1');
  a2 = table.getNum(nrow,'a2');
  a3 = table.getNum(nrow,'a3');
  a4 = table.getNum(nrow,'a4');

  f1 = table.getNum(nrow,'f1');
  f2 = table.getNum(nrow,'f2');
  f3 = table.getNum(nrow,'f3');
  f4 = table.getNum(nrow,'f4');

  p1 = table.getNum(nrow,'p1');
  p2 = table.getNum(nrow,'p2');
  p3 = table.getNum(nrow,'p3');
  p4 = table.getNum(nrow,'p4');

  d1 = table.getNum(nrow,'d1');
  d2 = table.getNum(nrow,'d2');
  d3 = table.getNum(nrow,'d3');
  d4 = table.getNum(nrow,'d4');

  // Update the sliders to the current row's parameter values
  a1Slide.value(a1);
  a2Slide.value(a2);
  a3Slide.value(a3);
  a4Slide.value(a4);

  f1Slide.value(f1);
  f2Slide.value(f2);
  f3Slide.value(f3);
  f4Slide.value(f4);

  p1Slide.value(p1);
  p2Slide.value(p2);
  p3Slide.value(p3);
  p4Slide.value(p4);

  d1Slide.value(d1);
  d2Slide.value(d2);
  d3Slide.value(d3);
  d4Slide.value(d4);

}

function addNewRow(table) {

  let newRow = table.addRow();

  newRow.setNum('a1', a1);
  newRow.setNum('a2', a2);
  newRow.setNum('a3', a3);
  newRow.setNum('a4', a4);

  newRow.setNum('f1', f1);
  newRow.setNum('f2', f2);
  newRow.setNum('f3', f3);
  newRow.setNum('f4', f4);

  newRow.setNum('p1', p1);
  newRow.setNum('p2', p2);
  newRow.setNum('p3', p3);
  newRow.setNum('p4', p4);

  newRow.setNum('d1', d1);
  newRow.setNum('d2', d2);
  newRow.setNum('d3', d3);
  newRow.setNum('d4', d4);

}

function saveImageTable(timeStamp) {
  // Save a single row table that records the parameters for this image
  let imageTable = new p5.Table();

  imageTable.addColumn('a1');
  imageTable.addColumn('a2');
  imageTable.addColumn('a3');
  imageTable.addColumn('a4');

  imageTable.addColumn('f1');
  imageTable.addColumn('f2');
  imageTable.addColumn('f3');
  imageTable.addColumn('f4');

  imageTable.addColumn('p1');
  imageTable.addColumn('p2');
  imageTable.addColumn('p3');
  imageTable.addColumn('p4');

  imageTable.addColumn('d1');
  imageTable.addColumn('d2');
  imageTable.addColumn('d3');
  imageTable.addColumn('d4');

  let newRow = imageTable.addRow();

  newRow.setNum('a1', a1);
  newRow.setNum('a2', a2);
  newRow.setNum('a3', a3);
  newRow.setNum('a4', a4);

  newRow.setNum('f1', f1);
  newRow.setNum('f2', f2);
  newRow.setNum('f3', f3);
  newRow.setNum('f4', f4);

  newRow.setNum('p1', p1);
  newRow.setNum('p2', p2);
  newRow.setNum('p3', p3);
  newRow.setNum('p4', p4);

  newRow.setNum('d1', d1);
  newRow.setNum('d2', d2);
  newRow.setNum('d3', d3);
  newRow.setNum('d4', d4);

  saveTable(imageTable, 'imageData' + timeStamp + '.csv');
}
