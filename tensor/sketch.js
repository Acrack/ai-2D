const model = tf.sequential();

const hidden = tf.layers.dense({
  units: 4,
  inputShape: [2],
  activation: 'sigmoid'
});

model.add(hidden);

const output = tf.layers.dense({
  units: 1,
  activation: 'sigmoid'
});

model.add(output);

model.compile({
  optimizer: tf.train.sgd(0.1),
  loss: 'meanSquaredError',
});

const xs = tf.tensor2d([
  [0, 0],
  [0.5, 0.5],
  [1, 1]
]);

const ys = tf.tensor2d([
  [1],
  [0.5],
  [0]
]);

train().then(() => {
  console.log('Training complete');

  let outputs = model.predict(xs);
  outputs.print();
});

async function train() {
  for (let i = 0; i < 1000; i++) {

    const response = await model.fit(xs, ys, {
      shuffle: true,
      epochs: 10
    });
    console.log(response.history.loss[0]);
  }
}
