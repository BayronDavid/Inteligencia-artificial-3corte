export class Neurona {
    pesos = [];
    sesgo = null;
    ratioEntrenamiento = 0.001;

    constructor(numPesos) {
        for (let i = 0; i < numPesos; i++) {
            this.pesos[i] = this.random();
        }
        this.sesgo = this.random();

    }
    random = () => (Math.random() * (0.5 + 0.5)- (0.5));

    run(input){
        let output = 0;
        for (let index = 0; index < input.length; index++) {

            output += this.pesos[index] * input[index];
        }
        output += this.sesgo;
        return output;
    }

    train(epochs, input_, output_) {
        for (let i = 0; i < epochs; i++) {
            let errorEpoch = 0;
            for (let j = 0; j < input_.length; j++) {
                let currentInput = input_[j];
                let currentOutput   = output_[j];
                let output          = this.run(currentInput);
                let error           = currentOutput - output;  

                errorEpoch += Math.abs(error);
                // this.ajustePesos(error, currentInput)
            }            
            // console.log(errorEpoch /input_.length);
        }
    }

    ajustePesos(error, input){
        for (let i = 0; i < this.pesos.length; i++) {
            let ajuste = error * this.ratioEntrenamiento * input[i];
            this.pesos[i] += ajuste;         
        }
        let ajuste = error * this.ratioEntrenamiento * 1;
        this.sesgo += ajuste;
    }
}

