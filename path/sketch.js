function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(200);

  push();
    translate(width / 2, height / 2);

    let path = createVector(200, 0);
    line(0, 0, path.x, path.y);

    let currentDirection = createVector(mouseX - width / 2, mouseY - height / 2);
    line(0, 0, currentDirection.x, currentDirection.y);

    let projection = resolveProjection(currentDirection, path);
    line(currentDirection.x, currentDirection.y, projection.x, projection.y);
  pop();
}

function resolveProjection(currentDirection, path) {
  let normalizedPath = path.normalize();
  
  return normalizedPath.mult(currentDirection.dot(path));
}
 