class Ball {
  constructor() {
    this.radius = 10;
    this.mass = random(1, 5);
    this.position = createVector(random(width), height / 2);
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

  bounce() {
    if ((this.position.x + 20 > width) || this.position.x < 20) {
      this.velocity.x = this.velocity.x * -1;
    }

    if ((this.position.y + 20 > height) || this.position.y < 20) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  display() {
    ellipse(this.position.x, this.position.y, (this.radius * this.mass));
  }
}