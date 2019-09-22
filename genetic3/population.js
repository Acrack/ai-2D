class Population {
  constructor (target, mutationRate, popMax) {
    this.target = target;
    this.mutationRate = mutationRate;
    this.popMax = popMax;
    this.matingPool = [];
    this.elements = [];
    this.generations = 0;
    this.finished = false;
    this.best = "";
    this.perfectScore = 1;

    for (let i = 0; i < this.popMax; i++) {
      this.elements[i] = new DNA(this.target);
    }

    this.calculateFitness();
  }

  calculateFitness() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].calculateFitness();
    }
  }

  generate() {
    let maxFitness = 0;

    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].fitness > maxFitness) {
        maxFitness = this.elements[i].fitness;
      }
    }

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

    this.best = this.elements[index].getPhrase();
    
    if (worldRecord >= this.perfectScore) {
      this.finished = true;
    }
  }

  getAverageFitness() {
    let total = 0;

    for (let i = 0; i < this.elements.length; i++) {
      total += this.elements[i].fitness;
    }

    return total / (this.elements.length);
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

  allPhrases() {
    let everything = "";

    let displayLimit = min(this.elements.length, 50);

    for (let i = 0; i < displayLimit; i++) {
      everything += this.elements[i].getPhrase() + "<br>";
    }

    return everything;
  }
}
