let target;
let popMax;
let mutationRate;
let population;
let bestPhrase;
let allPhrases;
let stats;

function setup() {
  bestPhrase = createP("Best phrase:");
  bestPhrase.position(10, 10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  stats.position(10, 200);
  stats.class("stats");

  target = "To be or not to be THAT is the question.";
  popMax = 1000;
  mutationRate = 0.01;

  population = new Population(target, mutationRate, popMax);
}

function draw() {
  population.naturalSelection();

  population.generate();

  population.calculateFitness();

  population.evaluate();

  if (population.isFinished()) {
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  let answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  let statstext = "total generations: " + population.getGenerations() + "<br>";
  statstext += "average fitness: " + nf(population.getAverageFitness().toFixed(3)) + "<br>";
  statstext += "total population: " + popMax + "<br>";
  statstext += "mutation rate: " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}