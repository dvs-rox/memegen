'use strict'
let gElCanvas
let gCtx

//TODO:!!! when selecting a line adjust input values accordingly
function onInit() {
    renderGallery()
    gElCanvas = document.getElementById('canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    initListeners()
}

//I feel no need for comments here as the func names seem rather self explanetory
function renderMeme(showSelector = true) {
    clearCanvas()//reset canvas, I suspect this absolutely sucks since it has to load everytime
    const meme = getMeme()
    const image = new Image()
    image.onload = () => {
        gCtx.drawImage(image, 0, 0)
        meme.lines.forEach((line) => {
            drawText(line)
        });
        if (showSelector) renderSelector()
    }
    image.src = `./img/templates/${meme.selectedImgId}.jpg`
}
function renderSelector() {//Draw rectangle around selected line, this'll be a headache I can tell
    const line = getMeme().lines[getCurrentLineIdx()]
    if(!line)return
    const padding = 4//used to determine padding of text inside 'border'
    const rectangle = {
        x: line.cornerCoords.x - padding / 2,
        y: line.cornerCoords.y - line.size / 2,
        xspan: line.txtWidth + padding,
        yspan: line.size+padding
    }
    console.log(rectangle)
    gCtx.beginPath()
    gCtx.rect(rectangle.x, rectangle.y, rectangle.xspan, rectangle.yspan)
    gCtx.stroke()
}
function clearCanvas() {// used for clearing selector
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
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
    renderMeme(false)
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
}
function onSwitchLine() {
    renderMeme()
    scrollLineIndex()
}