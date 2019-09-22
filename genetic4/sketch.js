let start;
let end;
let popMax;
let mutationRate;
let population;
let stats;
let walls = [];

function setup() {
  createCanvas(600, 450);

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

  popMax = 2;
  mutationRate = 0.01;

  population = new Population(start, end, mutationRate, popMax, walls);
}

function draw() {
  background(0);

  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
  }

  fill(255);
  circle(end.x, end.y, 10);

  for (let i = 0; i < population.elements.length; i++) {
    population.elements[i].applyForce(createVector(0, -0.1));
    population.elements[i].update();
    population.elements[i].display();
  }

  /*population.generate();

  population.calculateFitness();

  population.evaluate();

  if (population.isFinished()) {
    noLoop();
  }*/
}
