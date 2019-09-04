function setup() {
  createCanvas(720, 400);

  elements = 5;
  population = [];

  for (let i = 0; i < elements; i++) {
    population.push(new Ball(random(10, 50), random(50, 200)));
  }
}

function draw() {
  background(0);
  stroke(255);

  for (let i = 0; i < population.length; i++) {
    population[i].move();
    population[i].bounce();
    population[i].display();
  }
}