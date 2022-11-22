import	{net} from './brain.js'
import initial_data from '../data/BN_data.json' assert {type: 'json'} 

var send_button             = document.getElementById('send-button');
var train_button            = document.getElementById('train-button');
var play_button             = document.getElementById('play-button');
var text_color              = document.getElementById('text-color');
var background_color        = document.getElementById('backgound-color');
var background_color_play   = document.getElementById('backgound-color-play');
var play_color_container    = document.getElementById('play-color');
var play_output_text        = document.getElementById('play-output');
var clear_button            = document.getElementById('clear-button');
var tbody                   = document.getElementById('tbody');


var data = [];
// Initializations
window.onload = function(){
    data = initial_data;
    // Table
    fieldTable(initial_data)
    // Train initial data
    train(initial_data)
    // PLay initial data
    play(background_color_play.jscolor)
}

send_button.addEventListener('click', ()=>{
    let chanelsBG = Object.values(background_color.jscolor.channels).map(Math.floor);
    let chanelsTxt = Object.values(text_color   .jscolor.channels).map(Math.floor);
    data.push([chanelsBG[0], chanelsBG[1], chanelsBG[2], chanelsTxt[0], chanelsTxt[1], chanelsTxt[2]])
    fieldTable([[chanelsBG[0], chanelsBG[1], chanelsBG[2], chanelsTxt[0], chanelsTxt[1], chanelsTxt[2]]])
})

train_button.addEventListener('click', ()=>{
    train(data);
    console.log(JSON.stringify(data));
})

play_button.addEventListener('click', ()=>{
    let picker = background_color_play.jscolor;
    play(picker);
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
            let tx_color = `rgba(${item[3]}, ${item[4]}, ${item[5]}, 0.2)`
            let bg_color = `rgba(${item[0]}, ${item[1]}, ${item[2]}, 0.2)`
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
        data.forEach(item => {
            net_r.push({ 'input': { 'r': item[0], 'g': item[1], 'b': item[2] }, 'output': { 'r': item[3] / 255 } });
            net_g.push({ 'input': { 'r': item[0], 'g': item[1], 'b': item[2] }, 'output': { 'g': item[4] / 255 } });
            net_b.push({ 'input': { 'r': item[0], 'g': item[1], 'b': item[2] }, 'output': { 'b': item[5] / 255 } });
        });

        net[0].train(net_r);
        net[1].train(net_g);
        net[2].train(net_b);
    }else{
        console.log('Without data');
    }
}

function clear(){
    data = [];
    tbody.innerHTML = ""
}

function play(picker) {
    if (document.readyState === 'complete') {


        let chanels = Object.values(picker.channels)
        let output = [];
        output.push(net[0].run({ 'r': chanels[0], 'g': chanels[1], 'b': chanels[2] }));
        output.push(net[1].run({ 'r': chanels[0], 'g': chanels[1], 'b': chanels[2] }));
        output.push(net[2].run({ 'r': chanels[0], 'g': chanels[1], 'b': chanels[2] }));

        output = output.map(x => { return Math.round(Object.values(x) * 255) });

        play_color_container.style.background = picker.toBackground();
        play_color_container.style.color = `rgb(${output[0]}, ${output[1]}, ${output[2]})`;
        // play_output_text.innerHTML = JSON.stringify({ 'r': chanels[0], 'g': chanels[1], 'b': chanels[2], output });
    }
}