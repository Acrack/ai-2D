class Particule {
  constructor() {
    this.mass = 1;
    this.maxSpeed = 7;
    this.maxForce = 3;
    this.resolution = 1;

    this.position = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0.1, 0.1);

    this.rays = [];
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

  generateRays() {
    for (let i = 0; i < 360; i += this.resolution) {
      this.rays[i] = new Ray(this.position, radians(i));
    }
  }

  castRays(walls) {
    for (let i = 0; i < this.rays.length; i += this.resolution) {
      let ray = this.rays[i];
      let closest = null;
      let record = Infinity;

      for (let j = 0; j < walls.length; j++) {
        let wall = walls[j];
        let point = ray.cast(wall);

        if (point) {
          let distance = p5.Vector.dist(this.position, point);

          if (distance < record) {
            record = distance;
            closest = point;
          }
        }
      }

      if (closest) {
        stroke(255, 100);
        line(this.position.x, this.position.y, closest.x, closest.y);
      }
    }
  }

  seek(target) {
      let desired = p5.Vector.sub(target, this.position);
      let distance = desired.mag();
      desired.setMag(this.maxSpeed);

      if (distance < 10) {
        let magnitude = map(distance, 0, 100, 0, this.maxSpeed);
        desired.setMag(magnitude);
      } else {
        desired.setMag(this.maxSpeed);
      }

      let steering = p5.Vector.sub(desired, this.velocity);
      steering.limit(this.maxForce);
      
      this.applyForce(steering);
  }

  display() {
    fill(255);
    circle(this.position.x, this.position.y, 10);
  }
}
