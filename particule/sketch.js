function setup() {
  createCanvas(720, 400);

  elements = 100;
  population = [];

  for (let i = 0; i < elements; i++) {
    population.push(new Particule());
  }
}

function draw() {
  background(200);
  
  /*attractor = new Attractor();
  
  attractor.display();

  liquid.display();*/

  for (let i = 0; i < population.length; i++) {
    let particule = population[i];

    /*gravity = createVector(0, 0.3);
    gravity.mult(ball.mass);
    ball.applyForce(gravity);

    if (liquid.contains(ball)) {
      liquid.drag(ball);
    }

    if (mouseIsPressed) {
      attractor.attract(ball);
    }*/
    
    particule.update();
    particule.edges();
    particule.display();

    if (particule.isDead()) {
      population.splice(particule);

      for (let i = 0; i < elements; i++) {
        population.push(new Particule());
      }

      //background(255, 0, 0);
    }
  }
}