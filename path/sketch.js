function setup() {
  createCanvas(800, 450);

  path = new Path();
  
  elements = 100;
  population = [];

  for (let i = 0; i < elements; i++) {
    population.push(new Vehicule(random(1, 50), random(1, 50), random(1, 8)));
  }
}

function draw() {
  background(200);

  path.display();

  for (let i = 0; i < population.length; i++) {
    let vehicule = population[i];

    vehicule.follow(path);
    vehicule.update();
    vehicule.edges();
    vehicule.display();
  }
}

function resolveProjection(currentDirection, path) {
  let normalizedPath = path.normalize();
  
  return normalizedPath.mult(currentDirection.dot(path));
}
 