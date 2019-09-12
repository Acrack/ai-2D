let angle = 0;
let aVel = 0.0; 
let aAcc = 1/30;
const history = [];

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(200);

  circle(width / 2, height / 2, 200);

  aVel += aAcc;
  angle += aVel;
  aVel = constrain(aVel, 0, 0.002);

  push();
    translate(width / 2, height / 2);
    let vector = createVector(100, 0);
    vector.setMag(100);
    line(0, 0, vector.x, vector.y);
  pop();

  push();
    translate(width / 2, height / 2);
    vector.rotate(-angle);
    vector.setMag(100);
    history.push(createVector(150, vector.y));

    line(0, 0, vector.x, vector.y);
    line(vector.x, vector.y, 150, vector.y);
    circle(150, vector.y, 5);
  pop();

  strokeWeight(2);

  translate(width / 2, height / 2);

  noFill();
  beginShape();
  for (let i = history.length; i > 0; i--) {
    let currentVector = history[i];
    
    if (typeof currentVector !== 'undefined') {
      vertex(currentVector.x ++, currentVector.y);
    }
  }
  endShape();
}

function drawArrows(vector) {
  translate(vector.x, vector.y);
  let arrow = p5.Vector.fromAngle(vector.heading() - PI, 5);
  rotate(PI / 4);
  line(0, 0, arrow.x, arrow.y);
  rotate(-PI / 2);
  line(0, 0, arrow.x, arrow.y);
}
 