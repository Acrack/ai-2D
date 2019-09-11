class Vehicule {
  constructor(x, y) {
    this.radius = 10;
    this.mass = 1;
    this.maxSpeed = 5;
    this.maxForce = 0.01;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let finalForce = p5.Vector.div(force, this.mass);

    this.acceleration.add(finalForce);
  }

  seek(target) {
      let desired = p5.Vector.sub(flow, this.position);
      let distance = desired.mag();
      desired.setMag(this.maxSpeed);

      if (distance < 100) {
        let magnitude = map(distance, 0, 100, 0, this.maxSpeed);
        desired.setMag(magnitude);
      } else {
        desired.setMag(this.maxSpeed);
      }

      let steering = p5.Vector.sub(desired, this.velocity);
      steering.limit(this.maxForce);
      
      this.applyForce(steering);
  }

  follow(flowerField) {
    let column = constrain(Math.round(this.position.x / flowerField.resolution), 0, flowerField.cols - 1);
    let row = constrain(Math.round(this.position.y / flowerField.resolution), 0, flowerField.rows - 1);
    let flow = flowerField.field[column][row].copy();

    flow.setMag(this.maxSpeed);

    let steering = p5.Vector.sub(flow, this.velocity);
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

    /*if (this.position.x > width) {
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
    }*/
  }

  display() {
    fill(100);
    circle(this.position.x, this.position.y, this.radius);
  }
}