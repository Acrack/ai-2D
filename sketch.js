function setup() {
  createCanvas(720, 400);

  ball = new Ball();
}

function draw() {
  background(0);

  ball.move();
  ball.bounce();
  ball.display();
}