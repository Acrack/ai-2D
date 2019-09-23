let start;
let end;
let count;
let popMax;
let mutationRate;
let population;
let stats;
let bestFitness;
let walls = [];

function setup() {
  bestFitness = createP("Best");
  bestFitness.position(10, 460);
  bestFitness.class("best");

  stats = createP("Stats");
  stats.position(10, 480);
  stats.class("stats");

  createCanvas(800, 450);

  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(width, height, 0, height));
  walls.push(new Wall(0, height, 0, 0));
  
  walls.push(new Wall(100, 100, 100, 400));
  walls.push(new Wall(100, 100, 500, 100));
  walls.push(new Wall(150, 150, 150, 400));
  walls.push(new Wall(500, 150, 150, 150));

  walls.push(new Wall(100, 400, 150, 400));
  walls.push(new Wall(500, 100, 500, 150));

  start = createVector((100 + 150) / 2, 380);
  end = createVector(500, (100 + 150) / 2);

  count = 0;
  maxFrame = 400;
  popMax = 500;
  mutationRate = 0.01;

  population = new Population(start, end, maxFrame, mutationRate, popMax, walls);
}

function draw() {
  background(0);

  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
  }

  fill(255);
  circle(end.x, end.y, 10);

  for (let i = 0; i < population.elements.length; i++) {
    population.elements[i].update(count);
    population.elements[i].display();
  }

  count++;

  if (population.isDead()) {
    count = maxFrame;
  }

  if (count === maxFrame) {
    population.calculateFitness();

    population.evaluate();

    population.generate();

    if (population.isFinished()) {
      noLoop();
    }

    count = 0;
  }

  displayInfo();
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