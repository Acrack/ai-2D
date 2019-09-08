class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  contains(element) {
    let e = element.position;

    return e.x > this.x && e.x < this.x + this.w && e.y > this.y && e.y < this.y + this.h;
  }

  drag(element) {
    let drag = element.velocity.copy();
    let speed = element.velocity.mag();
    drag.normalize()
    drag.mult(this.c * speed * speed);
    element.applyForce(drag);
  }

  display() {
    noStroke();
    fill(50);
    rect(this.x, this.y, this.w, this.h);
  }
}