class Population {
  constructor (start, end, count, mutationRate, popMax, walls) {
    this.start = start;
    this.end = end;
    this.mutationRate = mutationRate;
    this.popMax = popMax;
    this.walls = walls;
    this.elements = [];
    this.generations = 0;
    this.finished = false;
    this.best = 0;
    this.perfectScore = 1;
    this.maxFitness = 0;
    this.avgFitness = 0;

    for (let i = 0; i < this.popMax; i++) {
      this.elements[i] = new Vehicle(start, end, count, walls);
    }
  }

  calculateFitness() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].calculateFitness();
    }
  }

  generate() {
    let maxFitness = 0;
    let total = 0;

    for (let i = 0; i < this.elements.length; i++) {
      total += this.elements[i].fitness;

      if (this.elements[i].fitness > maxFitness) {
        maxFitness = this.elements[i].fitness;
      }
    }

    this.avgFitness = total / this.elements.length;

    let newElements = [];

    for (let i = 0; i < this.elements.length; i++) {
      let partnerA = this.acceptReject(maxFitness);
      let partnerB = this.acceptReject(maxFitness);

      let child = partnerA.crossover(partnerB);

      child.mutate(this.mutationRate);

      newElements[i] = child;
    }

    this.elements = newElements;

    this.generations++;
  }

  acceptReject(maxFitness) {
    while (true) {
      let index = floor(random(this.elements.length));
      let partner = this.elements[index];
      let randomFitness = random(maxFitness);

      if (randomFitness < partner.fitness) {
        return partner;
      }
    }
  }

  evaluate() {
    let worldRecord = 0.0;
    let index = 0;

    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].fitness > worldRecord) {
        worldRecord = this.elements[i].fitness;
        index = i;
      }
    }

    this.best = this.elements[index].fitness;
    
    if (worldRecord >= this.perfectScore) {
      this.finished = true;
    }
  }

  isDead() {
    for (let i = 0; i < this.elements.length; i++) {
      if (!this.elements[i].dead) {
        return false;
      }
    }

    return true;
  }

  getAverageFitness() {
    return this.avgFitness;
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  getBest() {
    return this.best;
  }
}
