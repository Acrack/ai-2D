class Attractor {
	constructor() {
    this.position = createVector(mouseX, mouseY); 
    this.g = 1;
    this.m = 1;
	}

  attract(element) {
    let force = p5.Vector.sub(this.position, element.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    let strength = (this.g * this.m * element.m) / (distance * distance);
    force.mult(strength);
    element.applyForce(force);
  }

  display() {
    fill(90);
    circle(this.position.x, this.position.y, 20);
  }
}