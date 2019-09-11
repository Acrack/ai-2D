function setup() {
  createCanvas(720, 400);
}

function draw() {
  background(200);
  
  push();
  translate(width / 2, height / 2);
  
  let vector = createVector(50, 50);
  vector.setMag(100);
  line(0, 0, vector.x, vector.y);

  translate(vector.x, vector.y);

  let arrow = vector.copy();
  arrow.setMag(5);

  rotate(radians(135));
  
  line(0, 0, arrow.x, arrow.y);
  
  rotate(radians(90));
  
  line(0, 0, arrow.x, arrow.y);
  pop();
}
