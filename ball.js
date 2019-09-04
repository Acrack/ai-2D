class Ball {
  constructor(x, y) {
    this.radius = 40;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  move() {
    this.mouse = createVector(mouseX, mouseY);
    this.mouse.sub(this.position);
    this.mouse.setMag(0.1);

    this.acceleration = this.mouse;
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    stroke(255);
    line(this.position.x, this.position.y, mouseX, mouseY);
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
    ellipse(this.position.x, this.position.y, this.radius);
  }
}