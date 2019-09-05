function setup() {
  createCanvas(720, 400);

  length = 180;
  origin = createVector(width/2, 0);
  ball = new Ball(origin, length, PI/4);
}

function draw() {
  background(255);

  ball.display();
}