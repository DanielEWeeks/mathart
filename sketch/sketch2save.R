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
    cnv = createCanvas(WIDTH, HEIGHT)
    background('rgb(255,255,255)')
    for (x in x_grid) {
        for (y in y_grid) {
            # Uniform distribution for RGB color
            rgb_color = runif(3, 0, 255)
            fill(rgb_color)    # fill color
            stroke(rgb_color)  # border color

            # Square of normal distribution for the diameter
            d <- DIAMETER * rnorm(1, 0, 0.4)^2
            circle(x, y, d)
        }
    }
    save(cnv, "sketch2.png")
    NULL
}
