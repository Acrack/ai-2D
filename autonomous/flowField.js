class FlowField {
  constructor(resolution) {
    this.resolution = resolution;
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    this.field = createVector([cols], [rows]);
  }

  init() {
    let xoff = 0;
    for (i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (j = 0; j < this.rows; j++) {
        theta = 0;
        field[i][j] = 0;
        yoff += 0.1;
      } 
      xoff += 0.1;
    }
  }

  display() {

  }
}