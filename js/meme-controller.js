'use strict'
//foreground canvas
let gElCanvas
let gCtx
//background canvas
let gElBgCanvas
let gBgCtx
let gElInputs

//TODO:!!! when selecting a line adjust input values accordingly
function onInit() {
    assignGlobalVars()
    renderGallery()
    gElCanvas = document.getElementById('canvas-editor')
    gElBgCanvas = document.getElementById('canvas-background')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    initListeners()
}

//I feel no need for comments here as the func names seem rather self explanetory
function renderMeme(showSelector = true, combineLayers = false) {
    clearCanvas(gCtx)//resets main canvas, not background layer
    const meme = getMeme()
    const image = new Image()
    image.onload = () => {
        if (combineLayers) gCtx.drawImage(image, 0, 0)
        gBgCtx.drawImage(image, 0, 0)
        meme.lines.forEach((line) => {
            if (line.angle!=0) {
                gCtx.save()
                gCtx.rotate(Math.PI / 180 * line.angle, 0, 0)
                drawText(line, gCtx)
                // line.isRotated = false
                gCtx.restore()
                if (showSelector) renderSelector()
            } else {
                drawText(line, gCtx)
                if (showSelector) renderSelector()
            }
        });
    }
    image.src = `./img/templates/${meme.selectedImgId}.jpg`

    setInputValues()
}
function renderSelector() {//Draw rectangle around selected line, this'll be a headache I can tell
    console.log('drawing selector')
    const line = getMeme().lines[getCurrentLineIdx()]
    if (!line) return
    const padding = 4//used to determine padding of text inside 'border'
    const rectangle = {
        x: line.cornerCoords.x - padding / 2,
        y: line.cornerCoords.y - line.size / 2,
        xspan: line.txtWidth + padding,
        yspan: line.size + padding
    }
    gCtx.save()
    gCtx.rotate(Math.PI / 180 * line.angle, 0, 0)
    gCtx.beginPath()
    gCtx.rect(rectangle.x, rectangle.y, rectangle.xspan, rectangle.yspan)
    gCtx.stroke()
    gCtx.restore()
}
function clearCanvas(elContext) {// used for clearing selector
    elContext.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}
function onMoveText(direction) {
    const moveAmount = 20
    switch (direction) {
        case 'up':
            moveText(0, -moveAmount)
            break
        case 'down':
            moveText(0, moveAmount)
            break
        case 'left':
            moveText(-moveAmount, 0)
            break
        case 'right':
            moveText(moveAmount, 0)
            break
    }
    renderMeme()
}
function onRotateText(diff) {
    rotateText(diff)
    renderMeme()
}
function onTextChange(ev) {
    setLineText(ev.target.value)
    renderMeme()
}
function onImageChange(imgIdx) {
    onNavLinkClick({ target: { innerText: 'editor' } })
    setMemeImage(imgIdx)
    renderMeme()
}
function onColorChange(ev) {
    setTextColor(ev.target.value)
    renderMeme()
}
function onDownloadImage(ev) {//TODO: make sure the selector is removed before downloading!!
    renderMeme(false, true)
    setTimeout(() => {
        const elLink = ev.target
        const imgContent = gElCanvas.toDataURL('image/jpg')
        elLink.href = imgContent
        ev.href = self.href
    }, 500);
}
function onFontSizeChange(val) {
    setTextSize(val)
    renderMeme()
}
function onAddLine() {
    addLine()
    renderMeme()
    focusOnInput(gElInputs.textBox)
}
function onSwitchLine() {
    scrollLineIndex()
    renderMeme()
    focusOnInput(gElInputs.textBox)
}
function assignGlobalVars() {
    gElCanvas = document.getElementById('canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    gElBgCanvas = document.getElementById('canvas-background')
    gBgCtx = gElBgCanvas.getContext('2d')
    gElInputs = {
        textBox: document.getElementById('linetext'),
        colorPicker: document.getElementById('txtColorPicker')
    }
}
function focusOnInput(elinput) {
    window.setTimeout(() => elinput.focus(), 0)
}
function setInputValues(){
    if(!getMeme().lines[getCurrentLineIdx()])return
    gElInputs.textBox.value = getMeme().lines[getCurrentLineIdx()].txt
    gElInputs.colorPicker.value = getMeme().lines[getCurrentLineIdx()].color
}