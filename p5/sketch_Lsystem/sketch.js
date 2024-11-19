// Daniel Shiffman
// Code for: https://youtu.be/E1B4UoSQMFw
// Code modified from https://editor.p5js.org/codingtrain/sketches/QmTx-Y_UP

// variables: A B
// axiom: A
// rules: (A → AB), (B → A)
var angle = 25;
var axiom = "F";
var StartLength = 160;
var len = StartLength;
var divisor = 0.5;

var rules = [];
// "Tree"
// angle = 25;
// axiom = "F";
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

var Tree = [];
// "Tree"
// angle = 25;
// axiom = "F";
Tree[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

var KochEdge = [];
// angle = 60;
// axiom = "F";
KochEdge[0] = {
  a: 'F',
  b: 'F-F++F-F'
}

var KochSnowflake = [];
// angle = 60;
// axiom = "F++F++F";
KochSnowflake[0] = {
  a: 'F',
  b: 'F-F++F-F'
}

var DragonCurve = [];
// angle = 90;
// axiom = "FX";
// divisor = 1;
DragonCurve[0] = {
  a: 'X',
  b: 'X+YF+'
}
DragonCurve[1] = {
  a: 'Y',
  b: '-FX-Y'
}


rules = KochSnowflake;
angle = 60;
axiom = "F++F++F";
divisor = 0.40;


var sentence = axiom;


// Written by Daniel E. Weeks
//
// Exports a high-resolution image when 'e' key is pressed.
// based on 'high-res-export by golan' code from
// https://editor.p5js.org/golan/sketches/qKJcoNHXX

let outputScale = 10/2;
let currentScale;
let myScaledCanvas;
let canvas;

let button;
let button2;
let button3;
let button4;
let button5;



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
let degree = 25;
let lambda = 1.56;

var a1Slide;
let a2Slide;
let a3Slide;
let a4Slide;
let a5Slide;
let a6Slide;

var a1 = StartLength;    
var a2 = 0.1;
var a3 = -0.82;
var a4 = 0.12;
var a5 = angle; // degree
var a6 = lambda; // lambda

let xmax = -1;
let ymax = -1;
let bmax = -1;
let xmin = 1;
let ymin = 1;

     var zzbar;
     var p;
     var zreal;
     var zimag;
     var zn;
     var x1;
     var y1;

  

let vec = [];



//=================================================================
function setup() { 
  WIDTH = 675;
  HEIGHT = 675;
  canvas = createCanvas(WIDTH, HEIGHT);
  myScaledCanvas = createGraphics(WIDTH, HEIGHT);
  currentScale = 1; // initialize to 1; don't touch
  colorPicker = createColorPicker('rgb(211,211,211)');
  colorPicker.position(WIDTH + 5, HEIGHT - 5);
  let txt = createDiv('Background color');
  txt.position(WIDTH + 5, HEIGHT + 22);
  lineColorPicker = createColorPicker('rgb(0,128,0)');
  lineColorPicker.position(WIDTH + 75, HEIGHT - 5);
  let txt2 = createDiv('Line color');
  txt2.position(WIDTH + 75, HEIGHT - 22);
  

  
  a1Slide =  createSlider(1, 200, a1, 1);
  a1Slide.position(WIDTH + 10, 20);
  a2Slide =  createSlider(-3, 10, a2, 0.1);
  a2Slide.position(WIDTH + 10, 50);
  a3Slide =  createSlider(-3, 10, a3, 0.1);
  a3Slide.position(WIDTH + 10, 80);
  a4Slide =  createSlider(-3, 3, a4, 0.1);
  a4Slide.position(WIDTH + 10, 110);
  a5Slide =  createSlider(3, 180, a5, 1);
  a5Slide.position(WIDTH + 10, 140);
  a6Slide =  createSlider(-3, 3, a6, 0.1);
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

  button2 = createButton("DragonCurve");
  button2.position(WIDTH + 5, HEIGHT - 125)
  button2.mousePressed(ChooseDragonCurve);
  button3 = createButton("Koch Edge");
  button3.position(WIDTH + 5, HEIGHT - 150)
  button3.mousePressed(ChooseKochEdge);
  button4 = createButton("Koch Snowflake");
  button4.position(WIDTH + 5, HEIGHT - 175)
  button4.mousePressed(ChooseKochSnowflake);
  button5 = createButton("Tree");
  button5.position(WIDTH + 5, HEIGHT - 200)
  button5.mousePressed(ChooseTree);

  button = createButton("generate");
  button.position(WIDTH + 5, HEIGHT - 75)
  button.mousePressed(generate);


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
               a1 = random(1, 200);
               a1Slide.value(a1);
               a2 = random(-3, 10);
               a2Slide.value(a2);
               a3 = random(-3, 10);
               a3Slide.value(a3);
               a4 = random(-3, 3);
               a4Slide.value(a4);
               a5 = random(3, 180);
               a5Slide.value(a5);
               a6 = random(-3, 3);
               a6Slide.value(a6);

               len = a1;
               b = a2;
               c = a3;
               d = a4;
               degree = a5;
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

function ChooseTree() {
    angle = 25;
    axiom = "F";
    rules = Tree;
   	sentence = axiom;
	a5Slide.value(angle);
	len = StartLength;
	a1Slide.value(len);
}

function ChooseKochSnowflake() {
    angle = 60;
    axiom = "F++F++F";
    rules = KochSnowflake;
   	sentence = axiom;
	a5Slide.value(angle);
	len = StartLength;
	a1Slide.value(len);
}


function ChooseKochEdge() {
	angle = 60;
	axiom = "F";
	divisor = 0.5;
	rules = KochEdge;
	sentence = axiom;
	a5Slide.value(angle);
	len = StartLength;
	a1Slide.value(len);
}

;

function ChooseDragonCurve() {
	angle = 90;
	axiom = "FX";
	divisor = 1;
	rules = DragonCurve;
	sentence = axiom;
	a5Slide.value(angle);
	len = StartLength;
	a1Slide.value(len);
}

function generate() {
  len *= divisor;
  a1Slide.value(len);
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  myScaledCanvas.createP(sentence);
  turtle();

}

function turtle() {
//  myScaledCanvas.background(51);
//  myScaledCanvas.background(colorPicker.color());

//  myScaledCanvas.resetMatrix();
//  myScaledCanvas.translate(width / 2, height);
  myScaledCanvas.stroke(lineColorPicker.color(), len);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
      myScaledCanvas.line(0, 0, 0, -len);
      myScaledCanvas.translate(0, -len);
    } else if (current == "+") {
      myScaledCanvas.rotate(angle);
    } else if (current == "-") {
      myScaledCanvas.rotate(-angle)
    } else if (current == "[") {
      myScaledCanvas.push();
    } else if (current == "]") {
      myScaledCanvas.pop();
    }
  }
}


//=================================================================
function drawMyDesign() {



  myScaledCanvas.background(colorPicker.color());
  myScaledCanvas.noFill();
//  myScaledCanvas.stroke(lineColorPicker.color(), 20);
  myScaledCanvas.strokeWeight(lambda);

  myScaledCanvas.push();
  myScaledCanvas.translate(WIDTH/2, (HEIGHT));
//  myScaledCanvas.rotate(-HALF_PI);
  
  a1 = a1Slide.value();
  a2 = a2Slide.value();
  a3 = a3Slide.value();
  a4 = a4Slide.value();
  a5 = a5Slide.value();
  a6 = a6Slide.value();


  valueDisplayer.html('Length = '+round(a1,3));
  a2valueDisplayer.html('b = '+round(a2,3));
  a3valueDisplayer.html('c = '+round(a3,3));
  a4valueDisplayer.html('d = '+round(a4,3));
  a5valueDisplayer.html('Angle = '+round(a5,3));
  a6valueDisplayer.html('Stroke weight = '+round(a6,3));
  
  len = a1;
  b = a2;
  c = a3;
  d = a4;
  degree = a5;
  lambda = a6;
  
  // a = alpha
  // b = beta
  // c = gamma
  // d = omega
  
//  createCanvas(400, 400);
//  angle = radians(25);
  angle = radians(degree);
//  background(51);
  createP(axiom);
  turtle();


 
}