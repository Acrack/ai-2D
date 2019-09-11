function setup() {
  createCanvas(760, 420);

  flowField = new FlowField(20);

  elements = 1000;
  population = [];

  for (let i = 0; i < elements; i++) {
    population.push(new Vehicule(random(1, 100), random(1, 100)));
  }
}

function draw() {
  background(200);

  if (mouseIsPressed) {
    flowField.display();
  }
  
  flowField.update();

  for (let i = 0; i < population.length; i++) {
    let vehicule = population[i];

    vehicule.follow(flowField);
    vehicule.update();
    vehicule.edges();
    vehicule.display();
  }
}