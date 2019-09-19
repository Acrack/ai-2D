class Vehicule {
  constructor(x, y, mass) {
    this.radius = 1 * mass;
    this.mass = mass;
    this.maxSpeed = 5;
    this.maxForce = 2;
    this.sensor = 25;
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector(random(0.1, 1), random(0.1, 1));
  }

  applyForce(force) {
    let finalForce = p5.Vector.div(force, this.mass);

    this.acceleration.add(finalForce);
  }

  displayRadius(radius) {
    fill(100);
    circle(this.position.x, this.position.y, this.sensor);
  }

  align(vehicules) {
    let sum = createVector(0, 0);
    let count = 0;

    for (let i = 0; i < population.length; i++) {
      let vehicule = population[i];
      
      let d = p5.Vector.dist(this.position, vehicule.position);
      
      if (d > 0 && d < this.sensor) {
        sum.add(vehicule.velocity);
        count++;
      }
    }

    if (true) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
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
    
    let normalPoint;
    let direction;
    let target;
    let distance;
    let worldRecord = Infinity;

    for (let i = 0; i < path.points.length - 1; i++) {
      let startPoint = path.points[i];
      let endPoint = path.points[i + 1];

      normalPoint = this.getNormalPoint(predictedPosition, startPoint, endPoint);

      if (normalPoint.x < startPoint.x || normalPoint.x > endPoint.x) {
        normalPoint = endPoint.copy();
      }

      distance = p5.Vector.dist(predictedPosition, normalPoint);
      
      if (distance < worldRecord) {
        worldRecord = distance;

        direction = p5.Vector.sub(endPoint, startPoint);
        direction.setMag(30);

        target = p5.Vector.add(normalPoint, direction);
      }
    }

    if (worldRecord > path.radius) {
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

  // edges() {
  //   if (this.position.x > width) {
  //     this.position.x = 0;
  //   } else if (this.position.x < 0) {
  //     this.position.x = width;
  //   }

  //   if (this.position.y > windowHeight) {
  //     this.position.y = 0;
  //   } else if (this.position.y < 0) {
  //     this.position.y = windowHeight;
  //   }
  // }

  edges() {
    let radius = (this.radius * this.mass);

    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }

    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1;
    } else if (this.position.y < 0) {
      this.velocity.y *= -1;
      this.position.y = 0;
    }
  }

  display() {
    fill(100);
    stroke('black');
    circle(this.position.x, this.position.y, this.radius);
  }
}