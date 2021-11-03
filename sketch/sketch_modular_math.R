# Written by Daniel E. Weeks
#! config(deparsers = default_2_deparsers())
#! load_library("p5")

# 360 degrees = 2 PI radians

# Modular multiplication
#  Make the angle 'step' times larger, and draw a line.

# Setup
WIDTH <- 600
HEIGHT <- 600
DIAMETER <- 590
npoints <- 180
inc <- 2*pi/npoints
radius <- DIAMETER/2
xlist <- Array()
ylist <- Array()
points <- Array()
step <- 13

setup <- function() {
  createCanvas(WIDTH, HEIGHT)
#  background('rgb(255,255,255)')
#  stroke(0,0,0)
  background('rgb(30,144,255)')
  noFill()
  stroke('rgb(255,255,255)')
  noLoop();
}

draw <- function() {
  # Uniform distribution for RGB color
#  rgb_color <- R::runif(3, 0, 255)
# fill(rgb_color)    # fill color
# stroke(rgb_color)  # border color
  push();
  translate(WIDTH/2, HEIGHT/2);
  rotate(-HALF_PI)
  circle(0, 0, DIAMETER)
  angle <- 0
  for (i in R::seq(0,npoints-1,1)) {
    x = radius*cos(angle)
    y = radius*sin(angle)
    x1 = radius*cos(angle*step)
    y1 = radius*sin(angle*step)
    line(x,y,x1,y1)
    angle <- angle + inc
  }
  pop();
  save('circleModularMath.png')
  NULL
}
