class Vehicule {
  constructor(x, y, mass) {
    this.radius = 1 * mass;
    this.mass = mass;
    this.maxSpeed = 5;
    this.maxForce = 1.8;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 2);
  }

  applyForce(force) {
    let finalForce = p5.Vector.div(force, this.mass);

    this.acceleration.add(finalForce);
  }

  getNormalPoint(predictedPosition, start, end) {
    let startToPrediction = p5.Vector.sub(predictedPosition, start);

    let startToEnd = p5.Vector.sub(end, start);
    
    startToEnd = startToEnd.normalize();
    
    startToEnd.mult(startToPrediction.dot(startToEnd));
    
    let normalPoint = p5.Vector.add(start, startToEnd);

    return normalPoint; 
  }

  follow(path) {
    let predict = this.velocity.copy();
    predict.setMag(50);
    let predictedPosition = p5.Vector.add(this.position, predict);

    let normalPoint = this.getNormalPoint(predictedPosition, path.start, path.end);

    let direction = p5.Vector.sub(path.end, path.start);
    direction.setMag(10);

    let target = p5.Vector.add(normalPoint, direction);

    let distance = p5.Vector.dist(predictedPosition, normalPoint);

    if (distance > path.radius) {
      this.seek(target);
    }
  }

  seek(target) {
      let desired = p5.Vector.sub(target, this.position);
      let distance = desired.mag();
      desired.setMag(this.maxSpeed);

      if (distance < 10) {
        let magnitude = map(distance, 0, 100, 0, this.maxSpeed);
        desired.setMag(magnitude);
      } else {
        desired.setMag(this.maxSpeed);
      }

      let steering = p5.Vector.sub(desired, this.velocity);
      steering.limit(this.maxForce);
      
      this.applyForce(steering);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > windowHeight) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = windowHeight;
    }
  }

  display() {
    fill(100);
    circle(this.position.x, this.position.y, this.radius);
  }
}