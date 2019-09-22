let walls = [];
let particule;

function setup() {
  createCanvas(800, 450);

  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(width, height, 0, height));
  walls.push(new Wall(0, height, 0, 0));
  
  walls.push(new Wall(100, 100, 100, 350));
  walls.push(new Wall(100, 100, 500, 100));
  walls.push(new Wall(500, 100, 500, 350));

  particule = new Particule();
}

function draw() {
  background(0);

  let mouse = createVector(mouseX, mouseY);

  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
  }
  
  particule.seek(mouse);
  particule.generateRays();
  particule.castRays(walls);
  particule.update();
  particule.display();
}