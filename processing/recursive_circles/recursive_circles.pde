color palette[] = {#4464a1, #56a1c4, #ee726b, #ffc5c7, #fef9c6, #df5f50, #5a3034, #f5b800, #ffcc4d, #4b8a5f, #e590b8};
IntList colors;

// http://learningprocessing.com/examples/chp13/example-13-08-recursion
void setup() {
  size(500, 380);
  smooth();
  colors = new IntList();
 for (int i = 0; i < 11; i = i+1) {
   colors.append(palette[i]);
 }
 colors.shuffle();
}

void draw() {
  background(255);
  stroke(0);
  noFill();
  int j=0;
  drawCircle(width/2, height/2, 300,j);
  
  save("recursion.png");
}

void drawCircle(float x, float y, float radius, int j) {
  int nums = colors.get(j);
  fill(nums);
  ellipse(x, y, radius, radius);
  if (radius > 2) {
    // drawCircle() calls itself twice, creating a branching effect. 
    // For every circle, a smaller circle is drawn to the left and right.
    if (j >10) {
      j = 0;
    }
    int nums2 = colors.get(j);
    fill(nums2);
    drawCircle(x + radius/2, y, radius/2, j + 1);
    drawCircle(x - radius/2, y, radius/2, j + 1);
  }
}
