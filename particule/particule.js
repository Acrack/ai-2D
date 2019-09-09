class Particule {
  constructor() {
    this.radius = 2;
    this.mass = 2;
    this.lifespan = 255;
    this.position = createVector(width/2, 50);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0.05);
  }

  applyForce(force) {
    let finalForce = p5.Vector.div(force, this.mass);

    this.acceleration.add(finalForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.lifespan -= 2;
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

  isDead() {
  	return this.lifespan <= 0;
  }


  display() {
    stroke(100, this.lifespan);
    fill(100, this.lifespan);
    circle(this.position.x, this.position.y, (this.radius * this.mass));
  }
}