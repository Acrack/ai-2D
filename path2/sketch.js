function setup() {
  createCanvas(800, 450);

  path = new Path();
  path.generatePath();
  
  elements = 500;
  population = [];

  for (let i = 0; i < elements; i++) {
    population.push(new Vehicule(random(1, width), random(1, height), random(1, 8)));
  }
}

function draw() {
  background(200);

  for (let i = 0; i < population.length; i++) {
    let vehicule = population[i];

    vehicule.align(population);
    vehicule.update();
    vehicule.edges();
    vehicule.display();
  }
}

function resolveProjection(currentDirection, path) {
  let normalizedPath = path.normalize();
  
  return normalizedPath.mult(currentDirection.dot(path));
}
 