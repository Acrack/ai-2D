class Path {
  constructor() {
    this.radius = 20;
    this.start = createVector(0, height / 3);
    this.end = createVector(width, 2 * height / 3);
  }

  display() {
    line(this.start.x, this.start.y, this.end.x, this.end.y)
  }
}