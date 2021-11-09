# Written by Daniel E. Weeks
#! config(deparsers = default_2_deparsers())
#! load_library("p5")

# 360 degrees = 2 PI radians

# Modular multiplication
#  Make the angle 'step' times larger, and draw a line.

# Setup
WIDTH <- 620
HEIGHT <- 620
DIAMETER <- 200
npoints <- 6
inc <- 2*pi/npoints
radius <- DIAMETER/2
xlist <- Array()
ylist <- Array()
xint <- Array()
yint <- Array()
points <- Array()
step <- 13

circIntersectX <- function(x1,y1, x2, y2, r1, r2) {
  d <- sqrt( (x1-x2)^2 + (y1-y2)^2)
  l <- (r1^2 - r2^2 + d^2)/(2*d)
  h <- sqrt(r1^2 - l^2)
  x <- (l/d)*(x2-x1) + (h/d)*(y2-y1) + x1
  y <- (l/d)*(y2-y1) - (h/d)*(x2-x1) + y1
  return(x)
}

circIntersectY <- function(x1,y1, x2, y2, r1, r2) {
  d <- sqrt( (x1-x2)^2 + (y1-y2)^2)
  l <- (r1^2 - r2^2 + d^2)/(2*d)
  h <- sqrt(r1^2 - l^2)
  x <- (l/d)*(x2-x1) + (h/d)*(y2-y1) + x1
  y <- (l/d)*(y2-y1) - (h/d)*(x2-x1) + y1
  return(y)
}


setup <- function() {
  createCanvas(WIDTH, HEIGHT)
#  background('rgb(255,255,255)')
#  stroke(0,0,0)
  background('rgb(30,144,255)')
  # noFill()
  fill(255, 255, 255, 40)
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
    xlist[i] <- x
    ylist[i] <- y
    # xint <- circIntersectX(0,0,x,y, radius, radius)
    # yint <- circIntersectY(0,0,x,y, radius, radius)
    circle(x,y,DIAMETER)
    # stroke('rgb(55,55,255)')
    # circle(xint,yint, 20)
    # stroke('rgb(255,255,255)')
    angle <- angle + inc
  }
  r2 <- sqrt( xlist[0]^2 + ylist[0]^2 )
  for (i in R::seq(0,npoints-2,1)) {
    xint <- circIntersectX(xlist[i],ylist[i],xlist[i+1],ylist[i+1], radius, radius)
    yint <- circIntersectY(xlist[i],ylist[i],xlist[i+1],ylist[i+1], radius, radius)
    # stroke('rgb(55,55,255)')
    circle(xint,yint, DIAMETER)
    # stroke('rgb(255,255,255)')
    # stroke('rgb(55,55,255)')
    # circle(xint,yint, 20)
    # stroke('rgb(255,255,255)')
  }
  xint <- circIntersectX(xlist[npoints-1],ylist[npoints-1],xlist[0],ylist[0], radius, radius)
  yint <- circIntersectY(xlist[npoints-1],ylist[npoints-1],xlist[0],ylist[0], radius, radius)
  # stroke('rgb(55,55,255)')
  circle(xint,yint, DIAMETER)
  # stroke('rgb(255,255,255)')
  # stroke('rgb(55,55,255)')
  # circle(xint,yint, 20)
  # stroke('rgb(255,255,255)')
  angle <- 0
  for (i in R::seq(0,(2*npoints)-1,2)) {
    x = (r2 + radius)*cos(angle)
    y = (r2 + radius)*sin(angle)
    circle(x,y,DIAMETER)
    angle <- angle + inc
  }
  pop();
  save('FlowerOfLife_v3.png')
  NULL
}

