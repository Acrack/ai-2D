let perceptron;
let inputs;
let output;
let points; 
let guess; 
let trainingIndex;

function setup() {
  createCanvas(400, 400);
  
  trainingIndex = 0;
  pointsLength = 100;
  points = [];

  for (let i = 0; i < pointsLength; i++) {
    points[i] = new Point(random(-1, 1), random(-1, 1));
  }

  perceptron = new Perceptron();
}

function draw() {
  background(200);
  
  stroke(0);

  let p1 = new Point(-1, f(-1));
  let p2 = new Point(1, f(1));

  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());

  let p3 = new Point(-1, perceptron.guessY(-1));
  let p4 = new Point(1, perceptron.guessY(1));

  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());

  for (let i = 0; i < pointsLength; i++) {
    let point = points[i];

    point.show(); 
  }

  for (let i = 0; i < pointsLength; i++) {
    let point = points[i];
    let inputs = [point.x, point.y, point.bias];
    let target = point.label;

    let guess = perceptron.guess(inputs);

    if (guess == target) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }

    noStroke();
    ellipse(point.pixelX(), point.pixelY(), 4, 4);
  }

  let point = points[trainingIndex];
  let inputs = [point.x, point.y, point.bias];
  let target = point.label;
  perceptron.train(inputs, target);

  trainingIndex++;

  if (trainingIndex == pointsLength) {
    trainingIndex = 0;
  }
}

function f(x) {
  return 0.3 * x + 0.2;
}