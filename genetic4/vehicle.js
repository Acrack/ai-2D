class Vehicle {
  constructor(start, end, walls) {
    this.mass = 1;
    this.maxSpeed = 7;
    this.maxForce = 3;
    this.resolution = 360 / 8;

    this.start = start;
    this.end = end;
    this.dna = new DNA(start, end);

    this.position = createVector(start.x, start.y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0.1, 0.1);

    this.walls = walls;
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
    for (let i = 0; i < 360 ; i += this.resolution) {
      this.rays[i] = new Ray(this.position, radians(i));
    }
  }

  castRays() {
    for (let i = 0; i < this.rays.length; i += this.resolution) {
      let ray = this.rays[i];
      let closest = null;
      let record = Infinity;

      for (let j = 0; j < this.walls.length; j++) {
        let wall = this.walls[j];
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

  display() {
    fill(250);
    circle(this.position.x, this.position.y, 10);

    this.generateRays();
    this.castRays()
  }
}
