# From
# https://kcf-jackson.github.io/sketch-website/tutorial/8_tiles
#! config(debug = F, rules = basic_rules(), deparsers = default_2_deparsers())
#! load_library("p5")

colors <- Array("#fdd35b", "#333333", "#00b2b4")
cw <- 500
ch <- 500

setup <- function() {
    createCanvas(cw, ch)
    noLoop()
    imageMode(CENTER)  # CENTER is a variable from p5.js
    rectMode(CENTER)
}

draw <- function() {
    s <- cw / random(Array(8, 10, 12, 15))  # random number of tiles for each direction

    # ====== Make tiles ===============
    # Tile 1 ----
    tile1 <- createGraphics(s, s)
    tile1$stroke(colors[1])
    tile1$strokeWeight(2)
    tile1$background(colors[0])
    tile1$fill(colors[2])
    tile1$circle(0, 0, 4 * s / 5)
    tile1$circle(s, 0, 4 * s / 5)
    tile1$circle(0, s, 4 * s / 5)
    tile1$circle(s, s, 4 * s / 5)
    tile1$circle(s / 2, s / 2, 2 * s / 5)
    tile1$fill(colors[0])
    tile1$circle(0, 0, 2 * s / 5)
    tile1$circle(s, 0, 2 * s / 5)
    tile1$circle(0, s, 2 * s / 5)
    tile1$circle(s, s, 2 * s / 5)

    # Tile 2 ----
    tile2 <- createGraphics(s, s)
    tile2$stroke(colors[1])
    tile2$strokeWeight(2)
    tile2$background(colors[2])
    tile2$fill(colors[0])
    tile2$circle(0, 0, 6 * s / 5)
    tile2$circle(s, 0, 2 * s / 5)
    tile2$circle(0, s, 2 * s / 5)
    tile2$circle(s, s, 6 * s / 5)
    tile2$fill(colors[2])
    tile2$circle(s, s, 4 * s / 5)
    tile2$circle(0, 0, 4 * s / 5)
    tile2$fill(colors[0])
    tile2$circle(0, 0, 2 * s / 5)
    tile2$circle(s, s, 2 * s / 5)

    # Tile 3 ----
    tile3 <- createGraphics(s, s)
    tile3$stroke(colors[1])
    tile3$strokeWeight(2)
    tile3$background(colors[0])
    tile3$fill(colors[2])
    tile3$circle(0, 0, 8 * s / 5)
    tile3$circle(s, 3 * s / 10, s / 5)
    tile3$circle(3 * s / 10, s, s / 5)
    tile3$fill(colors[0])
    tile3$circle(0, 0, 6 * s / 5)
    tile3$fill(colors[2])
    tile3$circle(0, 0, 4 * s / 5)
    tile3$circle(s, s, 4 * s / 5)
    tile3$fill(colors[0])
    tile3$circle(0, 0, 2 * s / 5)
    tile3$circle(s, s, 2 * s / 5)

    # Tile 4 ----
    tile4 <- createGraphics(s, s)
    tile4$stroke(colors[1])
    tile4$strokeWeight(2)
    tile4$background(colors[0])
    tile4$fill(colors[2])
    tile4$circle(s / 2, 0, 3 * s / 5)
    tile4$circle(s, s / 2, 3 * s / 5)
    tile4$circle(s / 2, s, 3 * s / 5)
    tile4$circle(0, s / 2, 3 * s / 5)
    tile4$fill(colors[0])
    tile4$circle(s / 2, 0, s / 5)
    tile4$circle(s, s / 2, s / 5)
    tile4$circle(s / 2, s, s / 5)
    tile4$circle(0, s / 2, s / 5)

    # Tile 5 ----
    tile5 <- createGraphics(s, s)
    tile5$stroke(colors[1])
    tile5$strokeWeight(2)
    tile5$background(colors[0])
    tile5$fill(colors[2])
    tile5$circle(3 * s / 10, 0, s / 5)
    tile5$circle(3 * s / 10, s, s / 5)
    tile5$circle(7 * s / 10, 0, s / 5)
    tile5$circle(7 * s / 10, s, s / 5)
    tile5$rect(-1, s / 5, s + 2, s / 5)
    tile5$rect(-1, 3 * s / 5, s + 2, s / 5)

    # Tile 6 ----
    tile6 <- createGraphics(s, s)
    tile6$stroke(colors[1])
    tile6$strokeWeight(2)
    tile6$background(colors[2])
    tile6$fill(colors[0])
    tile6$circle(0, 0, 2 * s / 5)
    tile6$circle(s / 2, 0, s / 5)
    tile6$circle(s, 0, 2 * s / 5)
    tile6$circle(0, s / 2, s / 5)
    tile6$circle(s / 2, s / 2, 2 * s / 5)
    tile6$circle(s, s / 2, s / 5)
    tile6$circle(0, s, 2 * s / 5)
    tile6$circle(s / 2, s, s / 5)
    tile6$circle(s, s, 2 * s / 5)

    # Tile 7 ----
    tile7 <- createGraphics(s, s)
    tile7$stroke(colors[1])
    tile7$strokeWeight(2)
    tile7$background(colors[0])
    tile7$fill(colors[2])
    tile7$circle(3 * s / 10, s, s / 5)
    tile7$circle(7 * s / 10, s, s / 5)
    tile7$rect(-1, 3 * s / 5, s + 2, s / 5)
    tile7$circle(0, 0, 4 * s / 5)
    tile7$circle(s, 0, 4 * s / 5)
    tile7$fill(colors[0])
    tile7$circle(0, 0, 2 * s / 5)
    tile7$circle(s, 0, 2 * s / 5)

    # Tile 8 ----
    tile8 <- createGraphics(s, s)
    tile8$stroke(colors[1])
    tile8$strokeWeight(2)
    tile8$background(colors[2])
    tile8$fill(colors[0])
    tile8$circle(0, 0, 2 * s / 5)
    tile8$circle(s / 2, 0, s / 5)
    tile8$circle(s, 0, 2 * s / 5)
    tile8$circle(0, s, 2 * s / 5)
    tile8$circle(s / 2, s, s / 5)
    tile8$circle(s, s, 2 * s / 5)
    tile8$rect(-1, 2 * s / 5, s + 2, s / 5)

    # ====== Lay tiles on a grid ======
    tiles <- Array(tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8)
    for (x in R::seq(s/2, cw, s)) {
        for (y in R::seq(s/2, ch, s)) {
            push()
            translate(x, y)

            # Random orientation: HALF_PI and PI are variables from p5.js
            rotate(random(Array(HALF_PI, PI, 3 * HALF_PI)))

            # Randomly draw a tile
            image(random(tiles), 0, 0)
            pop()
        }
    }
    NULL
}
