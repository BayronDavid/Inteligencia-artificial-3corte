var text_color_input    = document.getElementById("text-color");
var bg_color_input      = document.getElementById("background-color");

var bg_container        = document.getElementById("bg");
var text_container      = document.getElementById("text");


function change_text_color(){
    text_container.style.color = text_color_input.value;
}

function change_bg_color(){
    bg_container.style.backgroundColor = bg_color_input.value;
}