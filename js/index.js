import {Neurona} from './perceptron.js'
// Import initial datasets
import bw_data  from '../data/BlackWhite.json'  assert {type: 'json'} 
import gs_data  from '../data/Grayscale.json'   assert {type: 'json'} 
import rgb_data from '../data/RGB.json'         assert {type: 'json'} 

var send_button             = document.getElementById('send-button');
var train_button            = document.getElementById('train-button');
var text_color              = document.getElementById('text-color');
var background_color        = document.getElementById('backgound-color');
var background_color_play   = document.getElementById('backgound-color-play');

var clear_button            = document.getElementById('clear-button');

var tbody                   = document.getElementById('tbody');
var thead                   = document.getElementById('thead');

var play_txt_bg             = document.getElementById('play_txt_bg');
var play_txt                = document.getElementById('play_txt');
var deco5                   = document.getElementById('deco5');
var play_contrast           = document.getElementById('play_contrast');
var output_text             = document.getElementById('output_text');

// Select mode
const bw_rd     =  document.getElementById("bw") 
const gs_rd     = document.getElementById("gs") 
const rgb_rd    = document.getElementById("rgb") 


const epochs  = document.getElementById("epochs") 

const mode_inputs = document.querySelectorAll(".mode_input")

var type_mode = 'bw';

var net = [];

var local_data = [];


// Initializations
window.onload = function(){
    local_data = bw_data;
    // Table
    fieldTable(bw_data);
    // create neural networks by type_mode
    createNet();
    // Train initial data
    train(bw_data);
    // PLay initial data
    play(background_color_play.jscolor);
}

// Listen mode_inputs changes
mode_inputs.forEach(input=>{
    input.addEventListener('change', ()=>{
        switch(input.id){
            case 'bw': 
            if(input.checked){
                type_mode = input.id;
                reset(bw_data);
            }
                break;
            case 'gs': 
                if (input.checked) {                    
                    type_mode = input.id;
                    reset(gs_data);
                }
                break;
            case 'rgb': 
                if (input.checked) {                    
                    type_mode = input.id;
                    reset(rgb_data);
                }
                break;
        }
    })
})

send_button.addEventListener('click', ()=>{
    let chanelsBG = Object.values(background_color.jscolor.channels).map(Math.floor);
    let chanelsTxt = Object.values(text_color   .jscolor.channels).map(Math.floor);
    
    // Si es blanco y negro o escala de grises,  no invertir colores 
    if(bw_rd.checked || gs_rd.checked){
        chanelsTxt[0] = math.mean(chanelsTxt[0], chanelsTxt[1], chanelsTxt[2]);
        if (type_mode == "bw") {
            // Funcion de escalonaje
            chanelsTxt[0] = chanelsTxt[0]/255 <= 0.5 ? 0 : 255;
        }
        local_data.push([chanelsBG[0], chanelsBG[1], chanelsBG[2], chanelsTxt[0]])
        fieldTable([[chanelsBG[0], chanelsBG[1], chanelsBG[2], chanelsTxt[0]]])
    }else{
        // Se envierten las entradas y salidas con el fin de generar mas datos de entrenamiento
        // Si entra [0, 0, 0] -> [255, 255, 255] se genera otro dato [22, 255, 0] -> [0, 0, 0]
        local_data.push([chanelsTxt[0], chanelsTxt[1], chanelsTxt[2], chanelsBG[0], chanelsBG[1], chanelsBG[2]])
        fieldTable([[chanelsTxt[0], chanelsTxt[1], chanelsTxt[2], chanelsBG[0], chanelsBG[1], chanelsBG[2]]])
        fieldTable([[chanelsBG[0], chanelsBG[1], chanelsBG[2], chanelsTxt[0], chanelsTxt[1], chanelsTxt[2]]])
    }
})

train_button.addEventListener('click', ()=>{
    train(local_data);
    play(background_color_play.jscolor)
    console.log(JSON.stringify(local_data));
})

background_color_play.oninput = function () {
        let picker = background_color_play.jscolor;
        play(picker);
}

clear_button.addEventListener('click', ()=>{
    clear();
})

function fieldTable(data){
    let bg_color;
    let tx_color;

    let head;

    switch(type_mode){
        case 'bw':
            head = `<tr>
                            <th colspan="3">Background</th>
                            <th colspan="1">Text</th>
                        </tr>
                        <tr>
                            <th>R</th>
                            <th>G</th>
                            <th>B</th>
                            <th>B | W</th>
                        </tr>`

            thead.innerHTML = head;
            break;
        case 'gs':
            head = `<tr>
                            <th colspan="3">Background</th>
                            <th colspan="1">Text</th>
                        </tr>
                        <tr>
                            <th>R</th>
                            <th>G</th>
                            <th>B</th>
                            <th> Grayscale</th>
                        </tr>`

            thead.innerHTML = head;
            break;
        case 'rgb':
            head = `<tr>
                            <th colspan="3">Background</th>
                            <th colspan="3">Text</th>
                        </tr>
                        <tr>
                            <th>R</th>
                            <th>G</th>
                            <th>B</th>
                            <th>R</th>
                            <th>G</th>
                            <th>B</th>
                        </tr>`

            thead.innerHTML = head;
            break;
    }

    if(data.length != 0){
        data.forEach(item => {
            let count = 0;
            let tr = document.createElement('tr');
            item.forEach(color => {

                bg_color = `rgba(${item[0]}, ${item[1]}, ${item[2]}, 0.5)`;

                if(type_mode=="bw" || type_mode=="gs"){
                    // Si es b/n o scala de grises solo toma el primer color del rgb y lo repite en todos los canales 
                    tx_color = `rgba(${item[3]}, ${item[3]}, ${item[3]}, 0.7)`;
                }else{
                    tx_color = `rgba(${item[3]}, ${item[4]}, ${item[5]}, 0.5)`;
                }

                let td = document.createElement('td');
                td.innerText = color;
                tr.appendChild(td);

                td.style.background = count < 3 ? bg_color : tx_color;
                count += 1;
            })
            tbody.appendChild(tr);
        })
    }else{
        tbody.innerHTML = ""
    }
}

function train(data){
    if(data.length != 0){
        let input   = [];
        let outputs = [];
        let aux = []
        let aux_2= []

        data.forEach((item, index) => {
            input.push([item[0]/255, item[1]/255, item[2]/255]);

            if(type_mode == "bw" || type_mode == "gs"){
                aux.push([item[3] / 255]);
            }else{
                aux_2 = [];
                aux_2.push([item[3] / 255], [item[4] / 255], [item[5] / 255]);
                aux.push(aux_2);
            }
        });

        outputs.push(aux);

        net.forEach((net_, index) =>{
            console.log(input, outputs[index]);
            for (let i = 0; i < outputs[index].length; i++) {
                net_.train({ input: input, output: outputs[index], epochs: epochs.value});
            }
        })

    }else{
        console.log('Without data');
    }
}

function clear(){
    local_data = [];
    net = [];
    tbody.innerHTML = ""
    return null;
}

function play(picker) {
    if (document.readyState === 'complete') {
        let chanels = Object.values(picker.channels)
        let output = [];
        let color;
        let color_rgba;

        chanels = chanels.map(x=> Math.round(x/255));

        net.forEach(net_=>{
            output.push(net_.run([chanels[0], chanels[1], chanels[2]]));
        })


        output = output.map(x => { return Math.round(x * 255) });

        if (type_mode == "bw" || type_mode == "gs") {
            if (type_mode == "bw"){
                // Funcion de escalonaje
                output[0] = output[0]/255 <= 0.5 ?0:255;
            }
            color = `rgb(${output[0]}, ${output[0]}, ${output[0]})`
            color_rgba = `rgba(${output[0]}, ${output[0]}, ${output[0]}, 0.25)`
        }else{
            color = `rgb(${output[0]}, ${output[1]}, ${output[2]})`
            color_rgba = `rgba(${output[0]}, ${output[1]}, ${output[2]}, 0.25)`
        }


        play_txt_bg.setAttribute('fill', `${picker.toRGBString() }`);
        deco5.setAttribute('fill', ` rgba(${ output[0]}, ${ output[1]}, ${ output[2]}, 0.25)`);
        play_txt.style.color = color
        play_contrast.style.color  = `${picker.toRGBString()}`;
        play_contrast.style.backgroundColor = color;

        let text =
        `Text color:  ${color})
Background Color: ${picker.toRGBString() }
BackGround 2 color: ${color_rgba}
            ` 

        output_text.value = text;
    }
}

function reset(data){
    clear();
    fieldTable(data);
    createNet();
    train(data);
    play(background_color_play.jscolor);
}

function createNet(){
    net = [];
    switch (type_mode) {
        case 'bw':
            net.push(new Neurona([3, 4, 1]));
            break;
        case 'gs':
            net.push(new Neurona([3, 4, 1]));
            break;
        case 'rgb':
            net.push(new Neurona([3, 4, 1]));
            net.push(new Neurona([3, 4, 1]));
            net.push(new Neurona([3, 4, 1]));
            break;
    }
}