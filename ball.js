class Ball {
  constructor() {
    this.r = 40;

    this.loc = createVector(width/2, height/2);
    this.velocity = createVector(5, 5);
  }

  move() {
    this.loc.add(this.velocity);
  }

  bounce() {
    if ((this.loc.x + 20 > width) || this.loc.x < 20) {
      this.velocity.x = this.velocity.x * -1;
    }

    if ((this.loc.y + 20 > height) || this.loc.y < 20) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  display() {
    ellipse(this.loc.x, this.loc.y, this.r);
  }
}