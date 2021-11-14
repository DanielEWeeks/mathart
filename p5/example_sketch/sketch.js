function setup() {
  WIDTH = 600;
  HEIGHT = 600;
  createCanvas(WIDTH, HEIGHT);
  background('rgb(30,144,255)');
  noLoop();
}

function draw() {
  stroke(255,255,255);
  fill(255, 0, 100,120);  
  ellipse(WIDTH/3,HEIGHT/3,WIDTH/2,HEIGHT/2);
  ellipse(2*WIDTH/3,2*HEIGHT/3,WIDTH/2,HEIGHT/2);
  ellipse(WIDTH/3,2*HEIGHT/3,WIDTH/2,HEIGHT/2);
  ellipse(2*WIDTH/3,HEIGHT/3,WIDTH/2,HEIGHT/2);
  ellipse(WIDTH/2,HEIGHT/2,WIDTH/2,HEIGHT/2);
}