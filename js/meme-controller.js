'use strict'
let gElCanvas
let gCtx

//TODO:!!! when selecting a line adjust input values accordingly
function onInit() {
    renderMemeSectionHtml()//also calls renderMeme for reasons
    gElCanvas = document.getElementById('canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    initListeners()
}

//I feel no need for comments here as the func names seem rather self explanetory
function renderMeme() {

    clearCanvas()//reset canvas, I suspect this absolutely sucks since it has to load everytime
    const meme = getMeme()
    const image = new Image()
    image.onload = () => {
        gCtx.drawImage(image, 0, 0)
        meme.lines.forEach((line, lineIdx) => {
            drawText(line, lineIdx)
        });
        renderSelector()
    }
    image.src = `./img/templates/${meme.selectedImgId}.jpg`
}
function renderSelector() {//Draw rectangle around selected line, this'll be a headache I can tell
    const line = getMeme().lines[getCurrentLineIdx()]
    const padding = 4//used to determine padding of text inside 'border'
    gCtx.beginPath()
    gCtx.rect(line.cornerCoords.x - padding / 2, line.cornerCoords.y, line.txtWidth + padding, line.size)
    gCtx.stroke()
}
function clearCanvas() {// used for clearing selector
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}
function drawText(line, lineIdx) {
    gCtx.strokeStyle = 'Black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseLine = 'middle'
    // TODO: figure out line breaks!

    // console.log(gCtx.measureText(line.txt))
    // if (line.txt.length * line.size > 500) { 
    //     for (var i = 0; i < line.txt.length; i++) {
    //         if(i)
    //     }
    // }
    switch (lineIdx) {
        case 0: {
            gCtx.fillText(line.txt, gElCanvas.width / 2, line.size)
            gCtx.strokeText(line.txt, gElCanvas.width / 2, line.size)
            //setting params for selector
            line.txtWidth = gCtx.measureText(line.txt).width
            line.cornerCoords = {
                x: (gElCanvas.width - line.txtWidth) / 2,
                y: line.size / 10// idk why this works lmao (magic number)
            }
            break;
        }
        case 1: {
            gCtx.fillText(line.txt, gElCanvas.width / 2, gElCanvas.height - line.size / 2)
            gCtx.strokeText(line.txt, gElCanvas.width / 2, gElCanvas.height - line.size / 2)
            //setting params for selector
            line.txtWidth = gCtx.measureText(line.txt).width
            line.cornerCoords = {
                x: (gElCanvas.width - line.txtWidth) / 2,
                y: gElCanvas.height - line.size * 1.4// idk why this works lmao (magic number)
            }

            break;
        }
        default: {
            gCtx.fillText(line.txt, gElCanvas.width / 2, gElCanvas.height / 2)
            gCtx.strokeText(line.txt, gElCanvas.width / 2, gElCanvas.height / 2)
            line.txtWidth = gCtx.measureText(line.txt).width
            line.cornerCoords = {
                x: (gElCanvas.width - line.txtWidth) / 2,
                y: gElCanvas.height / 2 - line.size// idk why this works lmao (magic number)
            }
            break;
        }
    }

}
function onTextChange(ev) {
    setLineText(ev.target.value)
    renderMeme()
}
function onImageChange(imgIdx) {
    setMemeImage(imgIdx)
    renderMeme()
}
function onColorChange(ev) {
    setTextColor(ev.target.value)
    renderMeme()
}
function onDownloadImage(ev) {//TODO: make sure the selector is removed before downloading!!
    const elLink = ev.target
    const imgContent = gElCanvas.toDataURL('image/jpg')
    elLink.href = imgContent
}
function onFontSizeChange(val) {
    setTextSize(val)
    renderMeme()
}
function onAddLine() {
    addLine()
    renderMeme()
}
function onSwitchLine() {
    renderMeme()
    scrollLineIndex()
}
function renderMemeSectionHtml() {
    const elDiv = document.querySelector('.editor-container div')
    elDiv.innerHTML = `<canvas width="500" height="500" id="canvas-editor">
    </canvas>
    <div class="editor-controls">
        <input name="linetext" id="linetext" title="line text input" type="text" oninput="onTextChange(event)">
        <input name="txtColorPicker" id="txtColorPicker" title="color picker for text color of current line"
            type="color" oninput="onColorChange(event)">
        <button name="txtIncrease" title="Increase font size" onclick="onFontSizeChange(4)">increase font
            size</button>
        <button name="txtDecrease" title="decrease font size" onclick="onFontSizeChange(-4)">decrease font
            size</button>
        <button name="addLine" title="add line" onclick="onAddLine()">add line</button>
        <button name="switchLine" title="switch line" onclick="onSwitchLine()">switch line</button>
    </div>

    <a name="imgDownload" title="download your meme" href="#" onclick="onDownloadImage(event)" download="my meme.jpg">download image</a>`
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}