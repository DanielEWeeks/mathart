#! config(deparsers = default_2_deparsers())
#! load_library("p5")

# Code from https://gist.github.com/volfegan/a3fe15616e3c6a22356b268a8d312185
# based on https://forum.processing.org/one/topic/fibonacci-spiral.html
palette <- Array("#4464a1", "#56a1c4", "#ee726b", "#ffc5c7", "#fef9c6", "#df5f50", "#5a3034", "#f5b800", "#ffcc4d", "#4b8a5f", "#e590b8");
golden_ratio <- (sqrt(5)-1)*.5;
side <- 720;
maxDiv <- 12;
cnt <- 10;
divider <- maxDiv;
WIDTH <- floor(side + side * golden_ratio) + 10
HEIGHT <- side + 10 

recfibonacciSquare <- function(i) {
  if(i==0) return;
  circle(0,0,40)
  noStroke();
  fill(255 - (255/(i+.1))*i,255 - (255/i)*i,0, 155 - (155/i)*i);
  rect(0,0,side,side);
  strokeWeight(2);
  stroke(255,255,100);
  noFill();
  arc(side,0,2*side,2*side,HALF_PI,PI);
  translate(side,0);
  rotate(-PI/2);
  translate(-side,0);
  scale(golden_ratio);
  recfibonacciSquare(i-1);
}


recfibSquare <- function(i){
  if( i==0){ return; } # End case.
  noStroke();
#  fill(255 - (255/cnt)*i);
#  fill(255 - (255/(cnt+.1))*i,255 - (255/cnt)*i,0, 155 - (155/cnt)*i);
#  fill(255 - (155/(cnt+.1))*i,255 - (205/cnt)*i,0, 155 - (55/cnt)*i);
# shuffle(palette, true);
  fill(palette[i]);
  rect(0,0,side,side);
#  text(i)
  noFill();
  strokeWeight(10);
  stroke(51,51,255);
  # stroke(random(255),random(255),random(255));
  arc(side,0,2*side,2*side,HALF_PI,PI);
  translate(side,0);
  rotate(-HALF_PI);
  translate(-side,0);
  scale( golden_ratio );
  recfibSquare(i-1);
}


settings <- function(){
  h <- side;
  w <- floor(side + side * golden_ratio);
  size(w,h);
}

setup <- function() {
  createCanvas(WIDTH, HEIGHT)
  shuffle(palette, true);
  fill(palette[cnt]);
  # translate(10,10)
  square(0,0,side + side * golden_ratio);
  noLoop();
}

draw <- function() {
#  if (divider<=maxDiv) {
#    divider <- divider + .01;
#  }
#  subdiv<-floor(divider);
  # circle(0,0,40)
  # recfibonacciSquare(subdiv);
  recfibSquare(cnt)
  # saveFrame("frame_######.png");
#  for (i in R::seq(1,cnt,1)) {
#    recfibSquare(i);
#  }
  save('GoldenRatioArc.png')
  NULL
}




