function setup() {
  createCanvas(720, 400);

  elements = 5;
  population = [];

  for (let i = 0; i < elements; i++) {
    population.push(new Ball());
  }
}

function draw() {
  background(0);

  for (let i = 0; i < population.length; i++) {
    gravity = createVector(0, 0.3);
    gravity.mult(population[i].mass);
    population[i].applyForce(gravity);
    
    if (mouseIsPressed) {
      wind = createVector(0.2, 0);
      population[i].applyForce(wind);
    }

    population[i].update();
    population[i].bounce();
    population[i].display();
  }
}