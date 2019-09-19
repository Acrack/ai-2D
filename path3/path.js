class Path {
  constructor() {
  	this.points = [];
    this.radius = 20;
  }

  generatePath() {
    this.points.push(createVector(70, 70));
    this.points.push(createVector(width - 70, 70));
    this.points.push(createVector(width - 70, height - 70));
    this.points.push(createVector(70, height - 70));
    this.points.push(createVector(70, 70));
  }

  display() {
    for (var i = 0; i < path.points.length - 1; i++) {
      let startPoint = path.points[i];
      let endPoint = path.points[i + 1];
    	
      if (endPoint) {
        stroke('black');
        line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
      }
    }
  }
}