class Ball {
  constructor(origin, x, y) {
    this.radius = 45;
    this.origin = origin;

    this.mass = random(1, 5);
    
    this.position = createVector(x, y);

    // this.position = createVector(
    //   this.origin.x + sin(this.angle) * this.length,
    //   this.origin.y + cos(this.angle) * this.length
    // );

    this.aVel = 0.0;
    this.aAcc = 0.0;

    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  go() {
    this.aAcc = -0.01 * sin(this.angle);

    this.angle += this.aVel;
    this.aVel += this.aAcc;

    this.aVel *= 0.99;

    this.position.x = this.origin.x + sin(this.angle) * this.length;
    this.position.y = this.origin.y + cos(this.angle) * this.length;
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
    circle(this.position.x, this.position.y, this.radius);
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
  }
}