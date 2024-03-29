function setup() {
  createCanvas(800, 450);

  path = new Path();
  path.generatePath();
  
  elements = 1;
  population = [];

  for (let i = 0; i < elements; i++) {
    population.push(new Vehicule(random(1, width), random(1, height), random(2, 4)));
  }
}

function draw() {
  background(200);

  path.display();

  if (mouseIsPressed) {
    population.push(new Vehicule(mouseX, mouseY, random(2, 4)));
  }

  for (let i = 0; i < population.length; i++) {
    let vehicule = population[i];

    vehicule.applyBehaviours(population);

    if (mouseIsPressed) {
      //population.push(new Vehicule(mouseX, mouseY, random(2, 4)));
    }

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
 