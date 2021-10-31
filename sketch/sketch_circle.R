#! config(deparsers = default_2_deparsers())
#! load_library("p5")

# 360 degrees = 2 PI radians

# Setup
WIDTH <- 600
HEIGHT <- 600
DIAMETER <- 590
npoints <- 10
inc <- 2*pi/npoints
radius <- DIAMETER/2
xlist <- Array()
ylist <- Array()
points <- Array()
step <- 3

  setup <- function() {
  createCanvas(WIDTH, HEIGHT)
  background('rgb(255,255,255)')
  stroke(0,0,0)
  noLoop();
}

draw <- function() {
  # Uniform distribution for RGB color
#  rgb_color <- R::runif(3, 0, 255)
# fill(rgb_color)    # fill color
# stroke(rgb_color)  # border color
  push();
  translate(WIDTH/2, HEIGHT/2);
  circle(0, 0, DIAMETER)
  angle <- 0
  for (i in R::seq(0,npoints-1,1)) {
    x = radius*cos(angle)
    y = radius*sin(angle)
    xlist[i] <- x
    ylist[i] <- y
    angle <- angle + inc
#   circle(x,y,10)
  }
  i <- 0
  # points <- R:(seq(0,step*npoints,step) %% npoints)
  point <- 0

  for (i in R::seq(0,length(seq(0,step*npoints-1,step)))) {
    points[i] <- point
    point <- point + step
    point <- point %% npoints
  }
#  line(xlist[i],ylist[i],xlist[i+2],ylist[i+2])
#  text(points,0,0)
  for (i in R::seq(0,length(seq(0,step*npoints-2,step)))) {
    line(xlist[points[i]],ylist[points[i]],xlist[points[i+1]],ylist[points[i+1]])
  }
  pop();
  NULL
}
