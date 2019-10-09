let perceptron;
let inputs;
let output;
let points; 
let guess; 

function setup() {
  createCanvas(400, 400);
  
  pointsLength = 200;
  points = [];

  for (let i = 0; i < pointsLength; i++) {
    points[i] = new Point();
  }

  perceptron = new Perceptron();
  inputs = [-1, 0.5];

  let guess = perceptron.guess(inputs);
}

function draw() {
  background(200);
  
  stroke(0);
  line(0, 0, width, height);

  for (let i = 0; i < pointsLength; i++) {
    let point = points[i];

    point.show(); 
  }
}
