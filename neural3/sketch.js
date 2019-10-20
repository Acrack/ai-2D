const LIFESPAN = 100;

let start;
let end;
let popMax;
let mutationRate;
let population;
let stats;
let bestFitness;
let walls = [];
let speedSlider; 
let inside = [];
let outside = [];
let checkPoints = [];

function setup() {
  tf.setBackend('cpu');

  bestFitness = createP("Best");
  bestFitness.position(10, 460);
  bestFitness.class("best");

  stats = createP("Stats");
  stats.position(10, 480);
  stats.class("stats");

  createCanvas(800, 450);

  popMax = 100;
  mutationRate = 0.01;

  buildTrack();

  population = new Population(start, end, mutationRate, popMax, walls);

  speedSlider = createSlider(1, 10, 1);
}

function draw() {
  background(0);

  const cycles = speedSlider.value();

  for (let n = 0; n < cycles; n++) {
    for (let i = 0; i < population.elements.length; i++) {
      population.elements[i].castRays();
      population.elements[i].check(checkPoints);
      population.elements[i].update();
      population.elements[i].display();
    }

    if (population.isDead()) {
      population.calculateFitness();

      population.evaluate(checkPoints);

      population.generate(checkPoints);

      buildTrack();

      population.updateData(start, end, walls);
    }
  }

  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
  }

  fill(255);
  circle(start.x, start.y, 5);
  circle(end.x, end.y, 5);

  for (let i = 0; i < population.elements.length; i++) {
    population.elements[i].display();
  }

  displayInfo();
}

function buildTrack() {
  checkPoints = [];
  inside = [];
  outside = [];
  walls = [];

  background(0);
  stroke(255);
  strokeWeight(2);
  noFill();
  let noiseMax = 25;
  const total = 30;
  let startX = random(1000);
  let startY = random(1000);

  for (let i = 0; i < total; i++) {
    let a = map(i, 0, total, 0, TWO_PI);
    let xoff = map(cos(a), -1, 1, 0, noiseMax) + startX;
    let yoff = map(sin(a), -1, 1, 0, noiseMax) + startY;
    let r = map(noise(xoff, yoff), 0, 1, 100, height / 2);
    let x1 = width / 2 + (r - 25) * cos(a);
    let y1 = height / 2 + (r - 25) * sin(a);
    let x2 = width / 2 + (r + 25) * cos(a);
    let y2 = height / 2 + (r + 25) * sin(a);
    checkPoints.push(new Wall(x1, y1, x2, y2));
    inside.push(createVector(x1, y1));
    outside.push(createVector(x2, y2));
  }

  for (let i = 0; i < checkPoints.length; i++) {
    let a1 = inside[i];
    let b1 = inside[(i + 1) % checkPoints.length];
    walls.push(new Wall(a1.x, a1.y, b1.x, b1.y));
    let a2 = outside[i];
    let b2 = outside[(i + 1) % checkPoints.length];
    walls.push(new Wall(a2.x, a2.y, b2.x, b2.y));
  }

  start = checkPoints[0].midPoint();
  end = checkPoints[checkPoints.length - 2].midPoint();

  let a = inside[inside.length - 1];
  let b = outside[outside.length - 1];
  walls.push(new Wall(a.x, a.y, b.x, b.y));
}

function displayInfo() {
  let best = population.getBest();

  bestFitness.html("Best: " + nf(best.toFixed(3)));

  let statstext = "total generations: " + population.getGenerations() + "<br>";
  statstext += "average fitness: " + nf(population.getAverageFitness().toFixed(3)) + "<br>";
  statstext += "total population: " + popMax + "<br>";
  statstext += "mutation rate: " + floor(mutationRate * 100) + "%";

  stats.html(statstext);
}