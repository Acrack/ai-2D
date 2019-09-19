class Path {
  constructor() {
  	this.points = [];
    this.radius = 20;
  }

  generatePath() {
  	this.points.push(createVector(0, height / 8));
    this.points.push(createVector(width / 8, height / 4));
    this.points.push(createVector(width / 5, height / 7));
    this.points.push(createVector(width / 3, height / 3));
    this.points.push(createVector(width / 2, height / 7));
    this.points.push(createVector(width / 2, height / 3));
    this.points.push(createVector(width, height - 20));
  }

  display() {
    for (var i = 0; i <= path.points.length; i++) {
      let startPoint = path.points[i];
      let endPoint = path.points[i + 1] !== 'undefined' ? path.points[i + 1] : null;
    	
      if (endPoint) {
        stroke('black');
        line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
      }
    }
  }
}