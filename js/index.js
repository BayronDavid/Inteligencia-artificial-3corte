// import	{net} from './brain.js'
// import {Neurona} from './neurona.js';
import {Neurona} from './perceptron.js'

// Import initial datasets

import bw_data  from '../data/BlackWhite.json'  assert {type: 'json'} 
import gs_data  from '../data/Grayscale.json'   assert {type: 'json'} 
import rgb_data from '../data/RGB.json'         assert {type: 'json'} 
import hex_data from '../data/hex.json'         assert {type: 'json'} 

var send_button             = document.getElementById('send-button');
var train_button            = document.getElementById('train-button');
var text_color              = document.getElementById('text-color');
var background_color        = document.getElementById('backgound-color');
var background_color_play   = document.getElementById('backgound-color-play');

var clear_button            = document.getElementById('clear-button');
var tbody                   = document.getElementById('tbody');

var play_txt_bg             = document.getElementById('play_txt_bg');
var play_txt                = document.getElementById('play_txt');
var deco5                   = document.getElementById('deco5');
var play_contrast           = document.getElementById('play_contrast');
var output_text             = document.getElementById('output_text');

// Select mode
const bw_rd   = document.getElementById("bw") 
const gs_rd   = document.getElementById("gs") 
const rgb_rd  = document.getElementById("rgb") 
const hex_rd  = document.getElementById("hex") 

const epochs  = document.getElementById("epochs") 

const mode_inputs = document.querySelectorAll(".mode_input")

var net = [];

net[0] = new Neurona([3, 4, 1]);
net[1] = new Neurona([3, 4, 1]);
net[2] = new Neurona([3, 4, 1]);

var data = [];
// Initializations
window.onload = function(){
    data = bw_data;
    // Table
    fieldTable(bw_data)
    // Train initial data
    train(bw_data)
    // PLay initial data
    play(background_color_play.jscolor)
}

// Listen mode_inputs changes

mode_inputs.forEach(input=>{
    input.addEventListener('change', ()=>{
        switch(input.id){
            case 'bw': 
                reset(bw_data);
                break;
            case 'gs': 
                reset(gs_data);
                break;
            case 'rgb': 
                reset(rgb_data);
                break;
            case 'hex': 
                reset(hex_data);
                break;
        }
    })
})

send_button.addEventListener('click', ()=>{
    let chanelsBG = Object.values(background_color.jscolor.channels).map(Math.floor);
    let chanelsTxt = Object.values(text_color   .jscolor.channels).map(Math.floor);

    data.push([chanelsBG[0], chanelsBG[1], chanelsBG[2], chanelsTxt[0], chanelsTxt[1], chanelsTxt[2]])
    
    // Si es blanco y negro o escala de grises,  no invertir colores 
    if(bw_rd.checked || gs_rd.checked){
        fieldTable([[chanelsBG[0], chanelsBG[1], chanelsBG[2], chanelsTxt[0], chanelsTxt[1], chanelsTxt[2]]])
    }else{
        console.log('entro', gs_rd.checked);
        // Se envierten las entradas y salidas con el fin de generar mas datos de entrenamiento
        // Si entra [0, 0, 0] -> [255, 255, 255] se genera otro dato [22, 255, 0] -> [0, 0, 0]
        data.push([chanelsTxt[0], chanelsTxt[1], chanelsTxt[2], chanelsBG[0], chanelsBG[1], chanelsBG[2]])
        fieldTable([[chanelsTxt[0], chanelsTxt[1], chanelsTxt[2], chanelsBG[0], chanelsBG[1], chanelsBG[2]]])
        fieldTable([[chanelsBG[0], chanelsBG[1], chanelsBG[2], chanelsTxt[0], chanelsTxt[1], chanelsTxt[2]]])
    }

})

train_button.addEventListener('click', ()=>{
    train(data);
    console.log(JSON.stringify(data));
})

background_color_play.oninput = function () {
        let picker = background_color_play.jscolor;
        play(picker);
}

clear_button.addEventListener('click', ()=>{
    clear();
})

function fieldTable(data){
    if(data.length != 0){
        data.forEach(item => {
            let tx_color = `rgba(${item[3]}, ${item[4]}, ${item[5]}, 0.5)`
            let bg_color = `rgba(${item[0]}, ${item[1]}, ${item[2]}, 0.5)`
            let count = 0;
            let tr = document.createElement('tr');
            item.forEach(color => {
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
        let net_r = [];
        let net_g = [];
        let net_b = [];

        let output_net_r = [];
        let output_net_g = [];
        let output_net_b = [];


        data.forEach(item => {
            net_r.push([item[0]/255, item[1]/255, item[2]/255]);
            net_g.push([item[0]/255, item[1]/255, item[2]/255]);
            net_b.push([item[0]/255, item[1]/255, item[2]/255]);

            output_net_r.push([item[3] / 255]);
            output_net_g.push([item[4] / 255]);
            output_net_b.push([item[5] / 255]);
        });

        
        net[0].train({ input: net_r, output: output_net_r, epochs: 200 });
        net[1].train({ input: net_g, output: output_net_g, epochs: 200 });
        net[2].train({ input: net_b, output: output_net_b, epochs: 200 });
    }else{
        console.log('Without data');
    }
}

function clear(){
    data = [];
    tbody.innerHTML = ""

    net[0] = new Neurona([3, 5, 1]);
    net[1] = new Neurona([3, 5, 1]);
    net[2] = new Neurona([3, 5, 1]);
}

function play(picker) {
    if (document.readyState === 'complete') {
        let chanels = Object.values(picker.channels)
        chanels = chanels.map(x=> Math.round(x));
        let output = [];
 
        output.push(net[0].run([chanels[0], chanels[1], chanels[2]]));
        output.push(net[1].run([chanels[0], chanels[1], chanels[2]]));
        output.push(net[2].run([chanels[0], chanels[1], chanels[2]]));

        output = output.map(x => { return Math.round(x * 255) });

        play_txt_bg.setAttribute('fill', `${picker.toRGBString() }`);
        deco5.setAttribute('fill', ` rgba(${ output[0]}, ${ output[1]}, ${ output[2]}, 0.25)`);
        play_txt.style.color  = ` rgb(${output[0]}, ${output[1]}, ${output[2]})`
        play_contrast.style.color  = `${picker.toRGBString()}`;
        play_contrast.style.backgroundColor = ` rgb(${output[0]}, ${output[1]}, ${output[2]})`;

        let text =
        `Text color:  rgb(${output[0]}, ${output[1]}, ${output[2]})
Background Color: ${picker.toRGBString() }
BackGround 2 color: rgba(${ output[0]}, ${output[1]}, ${output[2]}, 0.25)
            ` 

        output_text.value = text;
    }
}

function reset(data_){
    clear();
    data = data_;
    fieldTable(data)
    train(data)
    play(background_color_play.jscolor)
}