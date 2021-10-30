# From
# https://kcf-jackson.github.io/sketch-website/tutorial/
#! config(deparsers = default_2_deparsers())
#! load_library("p5")

# Setup
WIDTH <- 400
HEIGHT <- 400
DIAMETER <- 10
GRID_SIZE <- 40

x_grid <- seq(0, WIDTH, step = DIAMETER)
y_grid <- seq(0, HEIGHT, step = DIAMETER)

setup <- function() {
    createCanvas(WIDTH, HEIGHT)
    for (x in x_grid) {
        for (y in y_grid) {
            circle(x, y, DIAMETER)
        }
    }
    NULL
}
