class Vehicle {
  constructor(start, end, walls, brain) {
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(8, 8, 1);
    }

    this.dead = false;
    this.angle = PI;
    this.mass = 1;
    this.maxSpeed = 3;
    this.maxForce = 0.6;
    this.sight = 50;
    this.resolution = 360 / 8;

    this.start = start;
    this.end = end;
    this.fitness = 0;
    this.finished = false;

    this.position = createVector(start.x, start.y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.walls = walls;
    this.index = 0;
    this.counter = 0;
    this.goal;

    this.rays = [];

    for (let i = -90; i < 90; i += 25) {
      this.rays[i] = new Ray(this.position, radians(i));
    }
  }

  calculateFitness() {
    this.fitness = pow(2, this.index);
  }

  crossover(partner) {
  }

  mutate(mutationRate) {
    this.brain.mutate(0.05);
  }

  dispose() {
    this.brain.dispose();
  }

  applyForce(force) {
    let finalForce = p5.Vector.div(force, this.mass);

    this.acceleration.add(finalForce);
  }

  update() {
    if (!this.dead) {
      this.acceleration.limit(this.maxForce);

      this.velocity.add(this.acceleration);

      this.velocity.limit(this.maxSpeed);

      this.position.add(this.velocity);

      this.acceleration.mult(0);
    }
    
    this.counter++;

    if (this.counter > LIFESPAN) {
      this.dead = true;
    }

    for (let i = -90; i < 90; i += 25) {
      this.rays[i].position = this.position;
      this.rays[i].rotate(this.velocity.heading());
    }
  }

  check(checkPoints) {
    if (!this.finished) {
      this.goal = checkPoints[this.index]; 
      const distance = this.plDistance(this.goal.a, this.goal.b, this.position.x, this.position.y);

      if (distance < 5) {
        this.index++;
        this.counter = 0;

        if (this.index == checkPoints.length - 1) {
          this.finished = true;
          this.dead = true;
        }
      }
    }
  }

  castRays() {
    const inputs = [];

    for (let i = -90; i < 90; i += 25) {
      let ray = this.rays[i];
      let closest = null;
      let record = this.sight;

      for (let j = 0; j < this.walls.length; j++) {
        let wall = this.walls[j];
        let point = ray.cast(wall);

        if (point) {
          let distance = p5.Vector.dist(this.position, point);

          if (distance < record && distance < this.sight) {
            record = distance;
            closest = point;

            if (record < 2) {
              this.dead = true;
            }
          }
        }
      }

      if (closest) {
        //stroke(255, 20);
        //line(this.position.x, this.position.y, closest.x, closest.y);
      }

      inputs.push(map(record, 0, 50, 1, 0));
    }

    const output = this.brain.predict(inputs);
    this.angle = map(output[0], 0, 1, -PI, PI);
    this.angle = this.angle + this.velocity.heading();

    let steering = p5.Vector.fromAngle(this.angle);
    steering.setMag(this.maxSpeed);
    steering.sub(this.velocity);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  }

  plDistance(p1, p2, x, y) {
    const num = abs((p2.y - p1.y) * x - (p2.x - p1.x) * y + (p2.x * p1.y) - (p2.y * p1.x));
    const den = p5.Vector.dist(p1, p2);

    return num / den;
  }

  display() {
    push();
    translate(this.position.x, this.position.y)
    fill(250, 100);
    const heading = this.velocity.heading();
    rectMode(CENTER);
    rotate(heading);
    rect(0, 0, 10, 5);
    pop();

    if (this.goal) {
      this.goal.display();
    }
  }
}
