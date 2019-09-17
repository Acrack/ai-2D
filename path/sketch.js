let angle = 0;
let aVel = 0.0; 
let aAcc = 1/10;
const history = [];

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(200);

  push();
    translate(width / 2, height / 2);
    let path = createVector(200, 150);
    line(0, 0, path.x, path.y);
  pop();

  let currentDirection = createVector(mouseX, mouseY);
  line(width / 2, height / 2, mouseX, mouseY);

  push();
    translate(width / 2, height / 2);
    let projection = resolveProjection(currentDirection, path);
    line(mouseX - width / 2, mouseY - height / 2, projection.x - width / 2, projection.y - height / 2);
  pop();
}

function resolveProjection(currentDirection, path) {
  let normalizedPath = path.normalize();
  
  return normalizedPath.mult(currentDirection.dot(path));
}

function drawArrows(vector) {
  translate(vector.x, vector.y);
  let arrow = p5.Vector.fromAngle(vector.heading() - PI, 5);
  rotate(PI / 4);
  line(0, 0, arrow.x, arrow.y);
  rotate(-PI / 2);
  line(0, 0, arrow.x, arrow.y);
}
 