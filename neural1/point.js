class Point {
	constructor() {
    this.x = random(width);
    this.y = random(height);
    this.label = 0;

    if (this.x > this.y) {
      this.label = 1;
    } else {
      this.label = -1;
    }
  }

  show() {
    stroke(0);
    if (this.label == 1) {
      fill(255);
    } else {
      fill(0);
    }

    circle(this.x, this.y, 8);
  }
}