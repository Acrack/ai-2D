class Population {
  constructor (start, end, mutationRate, popMax, walls) {
    this.start = start;
    this.end = end;
    this.mutationRate = mutationRate;
    this.popMax = popMax;
    this.walls = walls;
    this.elements = [];
    this.generations = 0;
    this.finished = false;
    this.best = 0;
    this.maxFitness = 0;
    this.avgFitness = 0;

    for (let i = 0; i < this.popMax; i++) {
      this.elements[i] = new Vehicle(start, end, walls);
    }
  }

  check(checkPoints) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].check(checkPoints);
    }
  }

  calculateFitness() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].calculateFitness();
    }
  }

  generate(checkPoints) {
    const perfectScore = checkPoints.length - 1;
    let maxFitness = 0;
    let total = 0;

    for (let i = 0; i < this.elements.length; i++) {
      total += this.elements[i].index;

      if (this.elements[i].fitness > maxFitness) {
        maxFitness = this.elements[i].fitness;
      }
    }

    this.avgFitness = total / this.elements.length;
    this.avgFitness = map(this.avgFitness, 0, perfectScore, 0, 1); 

    let newElements = [];

    for (let i = 0; i < this.elements.length; i++) {
      let parent = this.pickOne(maxFitness);

      let child = new Vehicle(this.start, this.end, this.walls, parent.brain);
      child.mutate(this.mutationRate);

      newElements[i] = child;
    }

    this.elements = newElements;

    this.generations++;
  }

  pickOne(maxFitness) {
    while (true) {
      let index = floor(random(this.elements.length));
      let parent = this.elements[index];
      let randomFitness = random(maxFitness);

      if (randomFitness < parent.fitness) {
        return parent;
      }
    }
  }

  evaluate(checkPoints) {
    const perfectScore = checkPoints.length - 1;
    let worldRecord = 0.0;
    let index = 0;

    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].fitness > worldRecord) {
        worldRecord = this.elements[i].fitness;
        index = i;
      }
    }

    let selectedIndex = this.elements[index].index;

    this.best = map(selectedIndex, 0, perfectScore, 0, 1); 

    if (worldRecord >= pow(2, perfectScore)) {
      this.finished = true;
    }
  }

  updateData(start, end, walls) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].start = start;
      this.elements[i].end = end;
      this.elements[i].walls = walls;
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
