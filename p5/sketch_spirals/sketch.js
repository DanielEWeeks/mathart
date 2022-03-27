// Spirals
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
let e = 0.01;
let lambda = 1;
let expand = 0.25;

var a1Slide;
let a2Slide;
let a3Slide;
let a4Slide;
let a5Slide;
let a6Slide;

var a1 = 1.1;    
var a2 = 0.5;
var a3 = 2;
var a4 = 2;
var a5 = 0.25; // expand
var a6 = 1.56; // lambda

let xmax = -1;
let ymax = -1;
let bmax = -1;
let xmin = 1;
let ymin = 1;

var mode = 1;
var maxmode = 3; 

     var zzbar;
     var p;
     var zreal;
     var zimag;
     var zn;
     var x1;
     var y1;


let vec = [];

let spiral = 1;

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
  
  a1Slide =  createSlider(-3, 10, a1, 0.01);
  a1Slide.position(WIDTH + 10, 20);
  a2Slide =  createSlider(-10, 10, a2, 0.01);
  a2Slide.position(WIDTH + 10, 50);
  a3Slide =  createSlider(1, 10, a3, 1);
  a3Slide.position(WIDTH + 10, 80);
  a4Slide =  createSlider(1, 60, a4, 1);
  a4Slide.position(WIDTH + 10, 110);
  a5Slide =  createSlider(-1, 1, a5, 0.01);
  a5Slide.position(WIDTH + 10, 140);
  a6Slide =  createSlider(1,10, a6, 1);
  a6Slide.position(WIDTH + 10, 170);

   
  valueDisplayer = createP();
  valueDisplayer.position(WIDTH + 180,5);
  a2valueDisplayer = createP();
  a2valueDisplayer.position(WIDTH + 180,35);
  a3valueDisplayer = createP();
  a3valueDisplayer.position(WIDTH + 180,65);
  a4valueDisplayer = createP();
  a4valueDisplayer.position(WIDTH + 180,95);
  a5valueDisplayer = createP();
  a5valueDisplayer.position(WIDTH + 180,125);
  a6valueDisplayer = createP();
  a6valueDisplayer.position(WIDTH + 180,155);

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
         if (key == 'm') { 
            mode = mode + 1;
            if (mode > maxmode) {
              mode = 1;
            }
         }
         if (key == '1') { 
            spiral = 1;
            }
         if (key == '2') { 
            spiral = 2;
            }   
         if (key == '3') { 
            spiral = 3;
            }        
         if (key == 'a') { 
             // Increment npoints count
             npoints = npoints + 50000; 
             loop();
         } else {
             if (key == 's') {
               // Decrement npoints count
               npoints = npoints - 50000;
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
               a1 = random(-3, 10);
               a1Slide.value(a1);
               a2 = random(-10, 10);
               a2Slide.value(a2);
               a3 = random(1, 10);
               a3Slide.value(a3);
               a4 = random(1, 60);
               a4Slide.value(a4);
               a5 = random(-1, 1);
               a5Slide.value(a5);
               a6 = random(1, 10);
               a6Slide.value(a6);

               a = a1;
               b = a2;
               c = a3;
               d = a4;
               e = a5;
               lambda = a6;
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
  // myScaledCanvas.angleMode(DEGREES);

  a1 = a1Slide.value();
  a2 = a2Slide.value();
  a3 = a3Slide.value();
  a4 = a4Slide.value();
  a5 = a5Slide.value();
  a6 = a6Slide.value();


  valueDisplayer.html('a = '+round(a1,3));
  a2valueDisplayer.html('b = '+round(a2,3));
  a3valueDisplayer.html('c = '+round(a3,3));
  a4valueDisplayer.html('d = '+round(a4,3));
  a5valueDisplayer.html('D = '+round(a5,3));
  a6valueDisplayer.html('l = '+round(a6,3));

  
  a = a1;
  b = a2;
  c = a3;
  d = a4;
  expand = a5;
  lambda = a6;
  
  vec = [];
  
  xmax = -10000000000000;
  ymax = -10000000000000;
  bmax = -10000000000000;
  xmin = 10000000000000;
  ymin = 10000000000000;
  
  let trim = 50;
  var x = 0.0;
  var y = 0.0;
  var angle = 0.0;
  // a = alpha
  // b = beta
  // c = gamma
  // d = omega
  
  myScaledCanvas.strokeWeight(lambda);
  // vec.push(new p5.Vector(WIDTH/2, HEIGHT/2));
  // myScaledCanvas.beginShape();
    for (let i = 0; i < 360*c; i++) {
      //let t = seq(0,5*pi, length.out=500);
     angle = angle + d*(2*PI)/360;
     if (spiral == 1) {
     // Archimedean Spiral
     var x1 = (a + b*angle) * cos(d*angle);
     var y1 = (a + b*angle) * sin(d*angle);
     }
     if (spiral ==2) {
     // Fermat's Spiral
     var x1 = a*sqrt(angle)*cos(angle);
     var y1 = a*sqrt(angle)*sin(angle);
     }
     if (spiral ==3) {
     // Logarithmic Spiral
     var x1 = a*exp(e*angle)*cos(angle);
     var y1 = a*exp(e*angle)*sin(angle);
     }
     // myScaledCanvas.vertex(x1, y1);
     vec.push(new p5.Vector(x1,y1));
     x = x1;
     y = y1;
     xmax = max(xmax, x1);
     ymax = max(ymax, y1);
     xmin = min(xmin, x1);
     ymin = min(ymin, y1);
   }
   // myScaledCanvas.endShape();
   bmax = max(xmax,ymax, abs(xmin), abs(ymin));
   let midx = xmin + (xmax - xmin)/2;
   let midy = ymin + (ymax - ymin)/2;
   var midx1 = map(midx, -bmax, bmax, -WIDTH/2 + trim, WIDTH/2 - trim);
   var midy1 = map(midy, -bmax, bmax, -WIDTH/2 + trim, WIDTH/2 - trim);
   if (mode==1) {
    myScaledCanvas.beginShape();
    for (var i = 0; i < vec.length; i++) {
     let pt = vec[i];
     var xx1 = map(pt.x - midx, -bmax, bmax, -WIDTH/2 + trim, WIDTH/2 - trim);
     var yy1 = map(pt.y - midy, -bmax, bmax, HEIGHT/2 - trim, -HEIGHT/2 + trim);
     // myScaledCanvas.point(xx1,yy1);
     myScaledCanvas.vertex(xx1, yy1);
    } 
    myScaledCanvas.endShape();
   } 
   if (mode==2) {
    myScaledCanvas.beginShape(POINTS);
    for (var i = 0; i < vec.length; i++) {
     let pt = vec[i];
     var xx1 = map(pt.x - midx, -bmax, bmax, -WIDTH/2 + trim, WIDTH/2 - trim);
     var yy1 = map(pt.y - midy, -bmax, bmax, HEIGHT/2 - trim, -HEIGHT/2 + trim);
     // myScaledCanvas.point(xx1,yy1);
     myScaledCanvas.vertex(xx1, yy1);
    } 
    myScaledCanvas.endShape();
   } 
   if (mode==3) {
    // myScaledCanvas.beginShape(POINTS);
    let r = 1;
    for (var i = 0; i < vec.length; i++) {
     let pt = vec[i];
     var xx1 = map(pt.x - midx, -bmax, bmax, -WIDTH/2 + trim, WIDTH/2 - trim);
     var yy1 = map(pt.y - midy, -bmax, bmax, HEIGHT/2 - trim, -HEIGHT/2 + trim);
     // myScaledCanvas.point(xx1,yy1);
     r = expand*sqrt(xx1*xx1 + yy1*yy1)
     myScaledCanvas.ellipse(xx1, yy1, r);
    } 
    // myScaledCanvas.endShape();
   } 
 
  myScaledCanvas.pop();
}