// These options apply to all color pickers on the page
jscolor.presets.default = {
    format: 'rgb'
};

function updateBG(picker) {
    // document.getElementById('text').style.background = picker.toBackground();
    document.getElementById('bg').style.background = picker.toBackground();
    document.getElementById('background-color').jscolor.showPicker();
}
function updateTxt(picker) {
    document.getElementById('text').style.background = picker.toBackground();
    document.getElementById('text-color').jscolor.show();

}

jscolor.trigger('input'); // triggers 'onInput' on all color pickers when they are ready
