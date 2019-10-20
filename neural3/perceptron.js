class Perceptron {
  constructor() {
    this.learningRate = 0.01;
    this.weightsLength = 3;
    this.weights = [];

    for (let i = 0; i < this.weightsLength; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  sign(n) {
    if (n >= 0) {
      return 1;
    } else {
      return -1;
    }
  }

  guess(inputs) {
    let sum = 0;

    for (let i = 0; i < this.weightsLength; i++) {
      sum += inputs[i] * this.weights[i];
    }

    let output = this.sign(sum);

    return output;
  }

  train(inputs, target) {
    let guess = this.guess(inputs);
    let error = target - guess;

    for (let i = 0; i < this.weightsLength; i++) {
      this.weights[i] += error * inputs[i] + this.learningRate;
    }
  }

  guessY(x) {
    let w0 = this.weights[0];
    let w1 = this.weights[1];
    let w2 = this.weights[2];

    return -(w2 / w1) - (w0 / w1) * x;
  }
}
