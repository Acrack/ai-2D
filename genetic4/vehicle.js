class Vehicle {
  constructor(start, end, maxFrame, walls) {
    this.dead = false;
    this.mass = 1;
    this.maxSpeed = 3;
    this.maxForce = 0.6;
    this.resolution = 360 / 6;

    this.start = start;
    this.end = end;
    this.maxFrame = maxFrame;
    this.fitness = 0;
    this.dna = new DNA(start, end, maxFrame);

    this.position = createVector(start.x, start.y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.walls = walls;
    this.rays = [];
  }

  calculateFitness() {
    let totalDistance = this.start.dist(this.end);
    let currentDistance = this.position.dist(this.end);
    let traveledDistance = totalDistance - currentDistance;

    this.fitness = (traveledDistance / totalDistance);
    this.fitness = this.fitness < 0 ? 0.0001 : this.fitness;
    this.fitness = pow(this.fitness, 2) + 0.01;
  }

  crossover(partner) {
    let genes = this.dna.crossover(this, partner);

    let child = new Vehicle(start, end, maxFrame, walls);
    child.dna.genes = genes;
    
    return child;
  }

  mutate(mutationRate) {
    this.dna.mutate(mutationRate);
  }

  applyForce(force) {
    let finalForce = p5.Vector.div(force, this.mass);

    this.acceleration.add(finalForce);
  }

  update(count) {
    if (!this.dead) {
      let direction = this.dna.genes[count];

      this.applyForce(direction);

      this.acceleration.limit(this.maxForce);

      this.velocity.add(this.acceleration);

      this.velocity.limit(this.maxSpeed);

      this.position.add(this.velocity);

      this.acceleration.mult(0);
    }
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

            if (distance < 6) {
              this.dead = true;
            }
          }
        }
      }

      if (closest) {
        stroke(255, 20);
        line(this.position.x, this.position.y, closest.x, closest.y);
      }
    }
  }

  display() {
    fill(250, 100);
    circle(this.position.x, this.position.y, 10);

    this.generateRays();
    this.castRays()
  }
}
