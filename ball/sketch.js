function setup() {
  createCanvas(720, 400);

  liquid = new Liquid(0, height * (2/3), width, height/3, -0.1);

  elements = 5;
  population = [];

  for (let i = 0; i < elements; i++) {
    population.push(new Ball());
  }
}

function draw() {
  background(200);
  
  attractor = new Attractor();
  
  attractor.display();

  liquid.display();

  for (let i = 0; i < population.length; i++) {
    let ball = population[i];

    gravity = createVector(0, 0.3);
    gravity.mult(ball.mass);
    ball.applyForce(gravity);

    if (liquid.contains(ball)) {
      liquid.drag(ball);
    }

    if (mouseIsPressed) {
      attractor.attract(ball);
    }
    
    ball.update();
    ball.edges();
    ball.display();
  }
}