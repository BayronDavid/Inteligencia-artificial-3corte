import	{grid} from './table.js'
// import	{net} from './brain.js'
import initial_data from '../data/BN_data.json' assert {type: 'json'} 

var send_button             = document.getElementById('send-button');
var train_button            = document.getElementById('train-button');
var play_button             = document.getElementById('play-button');
var text_color              = document.getElementById('text-color');
var background_color        = document.getElementById('backgound-color');
var background_color_play   = document.getElementById('backgound-color-play');
var table_wrapper           = document.getElementById('wrapper');
var play_color_container    = document.getElementById('play-color');
var play_output_text        = document.getElementById('play-output');

var data = [];
var net = new brain.NeuralNetwork();
// Initializations
window.onload = function(){
    // Table
    grid.render(table_wrapper);
    // Train initial data
    net.train(initial_data)
    // PLay initial data
    play(background_color_play.jscolor)
}

send_button.addEventListener('click', ()=>{
    let chanels = Object.values(background_color.jscolor.channels).map(Math.floor);
    let b_w = Math.round(text_color.jscolor.channels.r / 255);
    data.push([chanels[0], chanels[1], chanels[2], b_w])
    grid.updateConfig({
        data
    }).forceRender();

})

train_button.addEventListener('click', ()=>{
    let obj = []; 
    grid.config.data.forEach(item => {
        obj.push({'input':{'r': item[0], 'g': item[1], 'b':item[2]}, 'output':{'class': item[3]}});
    });
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