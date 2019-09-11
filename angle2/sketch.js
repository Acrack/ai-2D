function setup() {
  createCanvas(720, 400);

  this.angle = 0;
  this.aVel = 0.0; 
  this.aAcc = 0.001;
}

function draw() {
  background(200);

  this.aVel += this.aAcc;
  this.angle += this.aVel;
  this.aVel = constrain(aVel, 0, 0.5);

  push();
    translate(width / 2, height / 2);
    let vector = createVector(0, -100);
    vector.setMag(100);

    drawVector(vector);
    drawArrows(vector);
  pop();

  push();
    translate(width / 2, height / 2);
    vector.rotate(this.angle);

    if (angle > 120) {
      this.angle = this.angle * -1;
    }

    vector.setMag(angle + 10);

    drawVector(vector);
    drawArrows(vector);
  pop();
}

function drawVector(vector) {
  line(0, 0, vector.x, vector.y);
}

function drawArrows(vector) {
  translate(vector.x, vector.y);
  let arrow = p5.Vector.fromAngle(vector.heading());
  arrow.setMag(5);
  rotate(radians(135));
  line(0, 0, arrow.x, arrow.y);
  rotate(radians(90));
  line(0, 0, arrow.x, arrow.y);
}
