// Algoritmo basado en https://towardsdatascience.com/creating-a-neural-network-from-scratch-302e8fb61703


const sigmoid = (x) => {
    return Math.exp(x) / (Math.exp(x) + 1)
};

const dSigmoid = (x) => {
  return sigmoid(x) * (1 - sigmoid(x))
}


const tanh = (x)=>{
  return Math.tanh(x);
}

export class Neurona {
  constructor(layers) {
    this.weights = layers.slice(0, -1).map((layerSize, index) => {
      const nextLayerSize = layers[index+1]
      return (
        [...Array(nextLayerSize)].map(() => {
          return (
            [...Array(layerSize)].map(w => math.random())
          )
        })
      );
    })
  }

  feedForward (input) {
    let activations = input;
    for (let layer of this.weights) {
      activations = layer.map(weights => {
        return sigmoid(math.dot(activations, weights))
      })
    }
    return activations
  }

  backProp (x, y) {
    const originalCost = this.cost(x, y)
    let gradientVector = []

    this.weights.forEach((layer, lIndex) => {
      const dLayer = [];
      layer.forEach((neuron, nIndex) => {
        const dNeuron = []
        neuron.forEach((weight, wIndex) => {
          let original = weight;
          this.weights[lIndex][nIndex][wIndex] += 0.01;
          let newCost = this.cost(x, y);
          let delWeight = (newCost - originalCost) / 0.01;
          dNeuron.push(delWeight)
          this.weights[lIndex][nIndex][wIndex] = original
        })
        dLayer.push(dNeuron)
      })
      gradientVector.push(dLayer);
    })
    gradientVector.forEach((layer, lIndex) => {
      layer.forEach((neuron, nIndex) => {
        neuron.forEach((del, wIndex) => {
          this.weights[lIndex][nIndex][wIndex] -= del;
        })
      })
    })
  };

  cost (x, y) {
    const activations = this.feedForward(x);
    const costVector = activations.map((yhat, index) => {
      return ( yhat - y[index] )**2
    })
    return math.sum(costVector);
  }

  train ({ input, output, epochs }) {
    for (let n = 0; n < epochs; n++) {
      input.forEach((x, index) => {
        this.backProp(x, output[index]);
      });
    }
  }

  run (x) {
    return this.feedForward(x);
  }
}

const dataGen = (num)=>{
  let x = [];
  let y = [];

  for (let i = 0; i < num; i++) {
    let val1 = math.random(0, 1);    
    let val2 = math.random(0, 1);    
    let val3 = math.random(0, 1);    
    x.push([val1, val2, val3])
    y.push(val1-val2<0?[1]:[0])
  }
  return {x, y}
}


// const net = new Neurona([3, 5, 1]);
// const {x, y} = dataGen(10);

// net.train({input: x, output:y, epochs:1});

// console.log("test: ", net.run([0.5, 0.1, 0.2]));
// console.log("test: ", net.run([0.5, 0.5, 0.5]));
// console.log("test: ", net.run([0.1, 0.1, 0.1]));
// console.log("test: ", net.run([0.2, 0.2, 0.2]));
// console.log("test: ", net.run([0.3, 0.3, 0.3]));
// console.log("test: ", net.run([0.4, 0.4, 0.4]));