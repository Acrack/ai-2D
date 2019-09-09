function setup() {
  createCanvas(720, 400);

  vehiculeA = new Vehicule(20, 20);
  vehiculeB = new Vehicule(width/2, height/2);
}

function draw() {
  background(200);

  vehiculeA.seek(vehiculeB.position);

  vehiculeA.update(true);
  vehiculeB.update();

  vehiculeA.edges();
  vehiculeB.edges();

  vehiculeA.display();
  vehiculeB.display();
}