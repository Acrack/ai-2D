class Point {
	constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bias = 1;
    this.label = 0;

    let lineY = f(x);

    if (this.y > lineY) {
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

    ellipse(this.pixelX(), this.pixelY(), 8, 8);
  }

  pixelX() {
    return map(this.x, -1, 1, 0, width);
  }

  pixelY() {
    return map(this.y, -1, 1, height, 0);
  }
}

function f(x) {
  return 0.3 * x + 0.2;
}