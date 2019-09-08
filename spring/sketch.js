function setup() {
  createCanvas(720, 400);

  restlength = 200;
  origin = createVector(width/2, 0);
  ball = new Ball(origin, width/2, 220);
}

function draw() {
  background(255);

  let spring = p5.Vector.sub(ball.position, origin);
  currentLength = spring.mag();
  spring.normalize();
  let k = 0.05;
  let stretch = currentLength - restlength;
  spring.mult(-k * stretch);

  ball.applyForce(spring);

  gravity = createVector(0, 0.3);
  gravity.mult(ball.mass);
  ball.applyForce(gravity);

  if (mouseIsPressed) {
  	wind = createVector(0.2, 0);
  	wind.mult(ball.mass);
  	ball.applyForce(wind);
  }

  ball.update(spring);
  ball.display();
}