class Ray {
  constructor(position, angle) {
    this.angle = angle;
    this.position = createVector(position.x, position.y);
    this.direction = p5.Vector.fromAngle(angle);
  }

  lookAt(x, y) {
    this.direction.x = x - this.position.x;
    this.direction.y = y - this.position.y;
    this.direction.normalize();
  }

  rotate(offset) {
    this.direction = p5.Vector.fromAngle(this.angle + offset);
  }

  cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (den === 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;

    const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      const point = createVector();
      point.x = x1 + t * (x2 - x1);
      point.y = y1 + t * (y2 - y1);

      return point;
    }

    return;
  }
}