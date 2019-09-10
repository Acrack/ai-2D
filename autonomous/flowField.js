class FlowField {
  constructor(resolution) {
    this.resolution = resolution;
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    this.field = [];

    this.init();
  }

  init() {
    let xoff = 0;

    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;

      this.field[i] = [];

      for (let j = 0; j < this.rows; j++) {
        let theta = map(noise(xoff,yoff), 0, 1, 0, TWO_PI);

        this.field[i][j] = createVector(cos(theta), sin(theta));

        yoff += 0.1;
      }

      xoff += 0.1;
    }
  }

  drawVector(vector, x, y, scale) {
    push();

    let arrowsize = 2;

    translate(x, y);

    rotate(vector.heading());

    let length = vector.mag() * scale;

    line(0, 0, length, 0);
    //line(length, 0, length - arrowsize, arrowsize / 2);
    //line(length, 0, length - arrowsize, -arrowsize / 2);

    pop();
  }

  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
      }
    }
  }
}