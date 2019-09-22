class DNA {
  constructor(target) {
    this.target = target;
    this.fitness = 0;
    this.genes = [];
    this.generateGenome(target);
  }

  selectChar() {
    let c = floor(random(63, 122));
    
    if (c === 63) {
      c = 32;
    }

    if (c === 64) {
      c = 46;
    }

    return String.fromCharCode(c);
  }

  generateGenome() {
    for (let i = 0; i < this.target.length; i++) {
      this.genes[i] = this.selectChar();
    }
  }

  getPhrase() {
    return this.genes.join("");
  }

  calculateFitness() {
    let score = 0;

    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == this.target.charAt(i)) {
        score++;
      }
    }

    this.fitness = (score / this.target.length);
    this.fitness = pow(this.fitness, 2) + 0.01;
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
        this.genes[i] = this.selectChar();
      }
    }
  }
}
