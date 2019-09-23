class DNA {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.genes = [];
    this.count = 25;
    this.generateGenome();
  }

  generateGenome() {
    for (let i = this.count; i > 0; i--) {
      let randomVector = createVector(random(- 0.01, 0.01), random(- 0.01, 0.01));
      randomVector.setMag(1);

      this.genes[this.count - i] = randomVector;
    }
  }

  crossover(partner) {
    let child = new DNA(this.target);

    let midpoint = floor(random(this.genes.length));

    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
    }

    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = p5.vector.fromAngle(radians(this.genes[i] + random(1, 10)));
      }
    }
  }
}
