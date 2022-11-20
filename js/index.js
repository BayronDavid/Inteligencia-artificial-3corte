import	{grid} from './table.js'
// import	{net} from './brain.js'
import initial_data from '../data/BN_data.json' assert {type: 'json'} 

var send_button             = document.getElementById('send-button');
var train_button            = document.getElementById('train-button');
var play_button             = document.getElementById('play-button');
var text_color              = document.getElementById('text-color');
var background_color        = document.getElementById('backgound-color');
var background_color_play   = document.getElementById('backgound-color-play');
var play_color_container    = document.getElementById('play-color');
var play_output_text        = document.getElementById('play-output');

var tbody       = document.getElementById('tbody');



var data = [];
var net = new brain.NeuralNetwork();
// Initializations
window.onload = function(){
    // Table
    fielTableStart()
    // Train initial data
    net.train(initial_data)
    // PLay initial data
    play(background_color_play.jscolor)
}

send_button.addEventListener('click', ()=>{
    let chanelsBG = Object.values(background_color.jscolor.channels).map(Math.floor);
    let chanelsTxt = Object.values(text_color   .jscolor.channels).map(Math.floor);
    let b_w = Math.round(text_color.jscolor.channels.r / 255);
    data.push([chanelsBG[0], chanelsBG[1], chanelsBG[2], chanelsTxt[0], chanelsTxt[1], chanelsTxt[2]])
    fieldTable(data)
})

train_button.addEventListener('click', ()=>{
    let obj = []; 
    data.forEach(item => {
        obj.push({'input':{'r': item[0], 'g': item[1], 'b':item[2]}, 'output':{'class': item[3]}});
    });

    console.log(data);
    net.train(obj);
})

function play(picker){
    if (document.readyState === 'complete') {
        let chanels = Object.values(picker.channels).map(Math.floor);
        let output  = net.run({ 'r': chanels[0], 'g': chanels[1], 'b': chanels[2] });
        output      = Math.round(Object.values(output)) * 255;
        
        play_color_container.style.background   = picker.toBackground();
        play_color_container.style.color        = `rgb(${output}, ${output}, ${output})`;
        play_output_text.innerHTML = JSON.stringify({ 'r': chanels[0], 'g': chanels[1], 'b': chanels[2], output });
    }
}

play_button.addEventListener('click', ()=>{
    let picker = background_color_play.jscolor;
    play(picker);
})

background_color_play.oninput = function () {
        let picker = background_color_play.jscolor;
        play(picker);
    
}

function fielTableStart(){
    initial_data.forEach(item => {
        // data.push([item.input.r, item.input.r, item.input.b, item.output.class])
        let tr = document.createElement('tr');
        for (const [key, value] of Object.entries(item)) {
            for (const [key_, value_] of Object.entries(value)){
                let td = document.createElement('td');
                td.innerText = value_;
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    })
}

function fieldTable(data){
    tbody.innerHTML = "";
    fielTableStart();
    data.forEach(item =>{
        let tr = document.createElement('tr');
        item.forEach(color =>{
            let td = document.createElement('td');
            td.innerText = color;
            tr.appendChild(td);
        })
        tbody.appendChild(tr);
    })
}