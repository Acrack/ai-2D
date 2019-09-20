class Vehicule {
  constructor(x, y, mass) {
    this.radius = 2 * mass;
    this.mass = 0.5 * mass;
    this.maxSpeed = 2;
    this.maxForce = 5;
    this.sensor = 30;
    this.desiredSeparation = this.radius * 2.5;
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

  applyBehaviours(vehicules) {
    let cohesionForce = this.cohesion(vehicules);
    let alignForce = this.align(vehicules);
    let separateForce = this.separate(vehicules);
    cohesionForce.mult(0.2);
    alignForce.mult(1);
    separateForce.mult(0.2);
    this.applyForce(cohesionForce);
    this.applyForce(alignForce);
    this.applyForce(separateForce);
  }

  cohesion (vehicules) {
    let sum = createVector(0, 0);
    let count = 0;

    for (let i = 0; i < population.length; i++) {
      let vehicule = population[i];
      let distance = p5.Vector.dist(this.position, vehicule.position);

      if (distance > 0 && distance < this.desiredSeparation) {
        sum.add(vehicule.position);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);

      return this.seek(sum);
    }

    return createVector(0, 0);
  }

  align(vehicules) {
    let sum = createVector(0, 0);
    let count = 0;

    for (let i = 0; i < population.length; i++) {
      let vehicule = population[i];
      
      let distance = p5.Vector.dist(this.position, vehicule.position);
      
      if (distance > 0 && distance < this.sensor) {
        sum.add(vehicule.velocity);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);

      return steer;
    }

    return createVector(0, 0);
  }


  separate(vehicules) {
    let sum = createVector(0, 0);
    let count = 0;

    for (let i = 0; i < population.length; i++) {
      let vehicule = population[i];
      let distance = p5.Vector.dist(this.position, vehicule.position);

      if (distance > 0 && distance < this.desiredSeparation) {
        let diff = p5.Vector.sub(this.position, vehicule.position);
        diff.normalize();
        diff.div(distance);

        sum.add(diff);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);

      return steer;
    }

    return createVector(0, 0);
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

      if (normalPoint.x < min(startPoint.x,endPoint.x) 
        || normalPoint.x > max(startPoint.x,endPoint.x) 
        || normalPoint.y < min(startPoint.y,endPoint.y) 
        || normalPoint.y > max(startPoint.y,endPoint.y)
      ) {
        normalPoint = endPoint.copy();
      }

      direction = p5.Vector.sub(endPoint, startPoint);

      distance = p5.Vector.dist(predictedPosition, normalPoint);
      
      if (distance < worldRecord) {
        worldRecord = distance;

        direction.setMag(30);

        target = p5.Vector.add(normalPoint, direction);
      }
    }

    if (worldRecord > path.radius) {
      let steer = this.seek(target);

      this.applyForce(steer);
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

      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);

      return steer;
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
    stroke('black');
    circle(this.position.x, this.position.y, this.radius);
  }
}