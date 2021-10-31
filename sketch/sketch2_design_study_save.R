# Design Study
# By Roni Kaufman
# https://ronikaufman.github.io/
# https://twitter.com/KaufmanRoni
# https://openprocessing.org/sketch/1291822
#! config(deparsers = default_2_deparsers())
#! load_library("p5")

palette <- Array("#4464a1", "#56a1c4", "#ee726b", "#ffc5c7", "#fef9c6", "#df5f50", "#5a3034", "#f5b800", "#ffcc4d", "#4b8a5f", "#e590b8");
WIDTH <- 600
HEIGHT <- 600

setup <- function() {
  createCanvas(WIDTH, HEIGHT)
  background('rgb(255,255,255)')
  noLoop();
  # noStroke();
}

draw2 <- function() {
  s <- width/5;

  shuffle(palette, true);
  fill(palette[0]);
  square(10, 10, s);
  NULL
}

draw <- function() {
  s <- width/5;

#  for (x = 0; x < width; x += s) {
#    for (y = 0; y < height; y += s) {
  for (x in R::seq(0, width,s)) {
   for (y in R::seq(0, height, s)) {
     shuffle(palette, true);
     fill(palette[0]);
     square(x, y, s);

      if (random() < 1/2) {
        makeTile(x, y, s/2);
        makeTile(x+s/2, y, s/2);
        makeTile(x, y+s/2, s/2);
        makeTile(x+s/2, y+s/2, s/2);
      } else {
        makeTile(x, y, s);
      }
    }
  }
  # timeStamp <- year() + "_" + month() + "_" + day() + "_" + hour() + "_" + minute()
  # save("designStudy" + timeStamp + ".png")
  save("designStudyCircles.png")
  NULL
}

makeTile <- function(x, y, s) {
  shuffle(palette, true);
  fill(palette[0]);
  square(x, y, s);
  push();
  translate(x+s/2, y+s/2);
  rotate(random(Array(0, HALF_PI, PI, 3*HALF_PI)));
  fill(palette[1]);
  r <- floor(random(4));
  if (r == 0) {
    arc(-s/2, 0, s, s, -HALF_PI, HALF_PI);
  } else if (r == 1) {
#   rect(-s/2, -s/2, s/2, s);
    arc(-s/2, 0, s, s, -HALF_PI, HALF_PI);
  } else if (r == 2) {
    arc(-s/2, 0, s, s, -HALF_PI, HALF_PI);
#  triangle(-s/2, -s/2, s/2, -s/2, -s/2, s/2);
  }
  pop();
}

# keyPressed <- function() {
#  if (key == " ") {
#    redraw();
#  }
# }
