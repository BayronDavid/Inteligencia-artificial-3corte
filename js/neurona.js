export class Neurona {
    entradas = 0;
    pesos = [];
    sesgo = 1 / 100;

    constructor(entradas = 0) {
        this.entradas = entradas;
        for (let i = 0; i < entradas; i++) {
            this.pesos[i] = this.random();
        }
    }
    random = () => (Math.random() - (1 / 2));

    pensar(dataset = []) {
        let respuesta = 0;
        for (let i = 0; i < this.entradas; i++) {
            respuesta += this.pesos[i] * dataset[i];
        }
        return respuesta;
    }

    entrenar(input, output) {
        let error_total = 0;
        // Entrenamiento
        for (let entrada = 0; entrada < this.entradas; entrada++) {
            let respuesta = this.pensar(input[entrada]);
            let error = output[entrada] - respuesta;
            // Valor absoluto del error
            error_total += (error < 0 ? (error * -1) : error);
            this.aprender(error, entrada);
        }
        return error_total;
    }

    entrenarHasta(repeticiones, input, output) {
        console.log("Aprendiendo...");
        for (let i = 0; i < repeticiones; i++) {
            this.entrenar(input, output)
        }
    }

    aprender(error, peso) {
        this.pesos[peso] += error * this.sesgo;
    }
}



// const input = [
//     [1, 0, 0], // Piedra
//     [0, 1, 0], // Papel
//     [0, 0, 1] // Tijera
// ];
// const output = [
//     -1, // Piedra entonces papel
//     0,  // Papel entonces tijeras
//     1   // Tijeras entonces piedra
// ];

// const cerebro = [];
// cerebro[0] = new neurona(3);

// for (var i = 0; i < 1000; i++) {
//     console.log(cerebro[0].entrenar(input, output))
// }