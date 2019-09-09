class Ball {
  constructor() {
    this.radius = 10;
    this.mass = random(2, 4);
    this.position = createVector(random(width), height * 1/10);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let finalForce = p5.Vector.div(force, this.mass);

    this.acceleration.add(finalForce);
  }

  update() {
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
    }
  }

  display() {
    fill(100);
    circle(this.position.x, this.position.y, (this.radius * this.mass));
  }
}