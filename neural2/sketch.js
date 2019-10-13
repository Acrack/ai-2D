let nn;
let inputs;
let trainingData = [];

function setup() {
  createCanvas(400, 400);

  trainingData = [
    {
      inputs: [0, 1],
      targets: [1]
    },
    {
      inputs: [1, 0],
      targets: [1]
    },
    {
      inputs: [0, 0],
      targets: [0]
    },
    {
      inputs: [1, 1],
      targets: [0]
    }
  ];
  
  nn = new NeuralNetwork(2, 4, 1);
}

function draw() {
  background(0);

  for (let i = 0; i < 60000; i++) {
    let data = random(trainingData);
    nn.train(data.inputs, data.targets);
  }

  let resolution = 10;
  let cols = width / resolution;
  let rows = height / resolution;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2];
      let y = nn.feedforward(inputs);
      noStroke();
      fill(y * 255);
      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }
}