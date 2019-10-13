class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
    this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);
    this.weightsIH.randomize();
    this.weightsHO.randomize();

    this.biasH = new Matrix(this.hiddenNodes, 1);
    this.biasO = new Matrix(this.outputNodes, 1);
    this.biasH.randomize();
    this.biasO.randomize();

    this.learningRate = 0.1;
  }

  feedforward(inputArray) {
    let inputs = Matrix.fromArray(inputArray);

    let hidden = Matrix.multiply(this.weightsIH, inputs);
    hidden.add(this.biasH);
    hidden.map(this.sigmoid);

    let outputs = Matrix.multiply(this.weightsHO, hidden);
    outputs.add(this.biasO);
    outputs.map(this.sigmoid);

    return outputs.toArray();
  }

  train(inputArray, targetArray) {
    let inputs = Matrix.fromArray(inputArray);

    let hidden = Matrix.multiply(this.weightsIH, inputs);
    hidden.add(this.biasH);
    hidden.map(this.sigmoid);

    let outputs = Matrix.multiply(this.weightsHO, hidden);
    outputs.add(this.biasO);
    outputs.map(this.sigmoid);

    ////////////////////////////////////////////////////

    let targets = Matrix.fromArray(targetArray);
    let outputErrors = Matrix.subtract(targets, outputs);

    let gradients = Matrix.map(outputs, this.dsigmoid);
    gradients.multiply(outputErrors);
    gradients.multiply(this.learningRate);

    let hiddenTransposed = Matrix.transpose(hidden);
    let deltaWeightsHO = Matrix.multiply(gradients, hiddenTransposed);

    this.weightsHO.add(deltaWeightsHO);
    this.biasO.add(gradients);

    ////////////////////////////////////////////////////

    let weightsHOTransposed = Matrix.transpose(this.weightsHO);
    let hiddenErrors = Matrix.multiply(weightsHOTransposed, outputErrors);

    let hiddenGradients = Matrix.map(hidden, this.dsigmoid);
    hiddenGradients.multiply(hiddenErrors);
    hiddenGradients.multiply(this.learningRate);

    let inputsTransposed = Matrix.transpose(inputs);
    let deltaWeightsIH = Matrix.multiply(hiddenGradients, inputsTransposed);

    this.weightsIH.add(deltaWeightsIH);
    this.biasH.add(hiddenGradients);
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  dsigmoid(y) {
    return y * (1 - y);
  }
}
