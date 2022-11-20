import	{grid} from './table.js'
import	{net} from './brain.js'

var send_button         = document.getElementById('send-button');
var train_button        = document.getElementById('train-button');
var play_button         = document.getElementById('play-button');
var text_color          = document.getElementById('text-color');
var background_color    = document.getElementById('backgound-color');
var background_color_play = document.getElementById('backgound-color-play');
var table_wrapper       = document.getElementById('wrapper');
var play_modal          = document.getElementById('play_modal');

var data = [];
grid.render(table_wrapper);

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
    let chanels = Object.values(picker.channels).map(Math.floor);

    let output = net.run({ 'r': chanels[0], 'g': chanels[1], 'b': chanels[2] });
    output = Math.round(Object.values(output)) * 255;

    play_modal.style.background = picker.toBackground();
    play_modal.style.color = `rgb{${output}, ${output}, ${output}}`;

    console.log(output, `rgb{${output}, ${output}, ${output}}`);
}

play_button.addEventListener('click', ()=>{
    let picker = background_color_play.jscolor;
    play(picker);
})

