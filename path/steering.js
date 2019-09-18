class Steering {
  constructor() {

  }

  steer(element) {
    let drag = element.velocity.copy();
    let speed = element.velocity.mag();
    drag.normalize()
    drag.mult(this.c * speed * speed);
    element.applyForce(drag);
  }

  display() {
    
  }
}