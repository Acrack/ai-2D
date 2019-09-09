class Vehicule {
  constructor(x, y) {
    this.radius = 5;
    this.mass = 1;
    this.maxSpeed = 5;
    this.maxForce = 0.1;
    this.position = createVector(x, y);
    this.velocity = createVector(10, 5);
    this.acceleration = createVector(0, 0.2);
  }

  applyForce(force) {
    let finalForce = p5.Vector.div(force, this.mass);

    this.acceleration.add(finalForce);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    let distance = desired.mag();

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

  update(follower) {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

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
    circle(this.position.x, this.position.y, this.radius);
  }
}