class DNA {
  constructor(start, end, maxFrame) {
    this.start = start;
    this.end = end;
    this.genes = [];
    this.maxFrame = maxFrame;
    this.generateGenome();
  }

  generateGenome() {
    for (let i = 0; i < this.maxFrame; i++) {
      let randomVector = createVector(random(- 0.01, 0.01), random(- 0.01, 0.01));
      randomVector.setMag(1);

      this.genes[i] = randomVector;
    }
  }

  crossover(partnerA, partnerB) {
    let genes = [];
    let midpoint = floor(random(this.genes.length));

    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        genes[i] = partnerA.dna.genes[i];
      } else {
        genes[i] = partnerB.dna.genes[i];
      }
    }

    return genes;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = p5.Vector.fromAngle(radians(this.genes[i] + random(1, 5)));
      }
    }
  }
}
