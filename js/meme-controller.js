'use strict'
//foreground canvas
let gElCanvas
let gCtx
//background canvas
let gElBgCanvas
let gBgCtx
let gElInputs
let gImageDimensions
//TODO:!!! when selecting a line adjust input values accordingly
function onInit() {
    assignGlobalVars()
    renderGallery()
    initMeme()
    gElCanvas = document.getElementById('canvas-editor')
    gElBgCanvas = document.getElementById('canvas-background')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    initListeners()
}


function renderMeme(showSelector = true, combineLayers = false) {
    clearCanvas(gCtx)//resets main canvas, not background layer
    const meme = getMeme()
    const image = new Image()
    image.onload = () => {
        resizeCanvas(image)
        if (combineLayers) gCtx.drawImage(image, 0, 0, gImageDimensions.sWidth, gImageDimensions.sHeight)
        gBgCtx.drawImage(image, 0, 0, gImageDimensions.sWidth, gImageDimensions.sHeight)
        meme.lines.forEach((line) => {
            if (line.angle != 0) {
                gCtx.save()
                gCtx.rotate(Math.PI / 180 * line.angle, 0, 0)
                drawText(line, gCtx)
                gCtx.restore()
                if (showSelector) renderSelector()
            } else {
                drawText(line, gCtx)
                if (showSelector) renderSelector()
            }
        });
    }
    image.src = `./img/templates/${meme.selectedImgId}.jpg`
    focusOnInput(gElInputs.textBox)
    // setInputValues()
}
function renderSelector() {//Draw rectangle around selected line, this'll be a headache I can tell(it was)
    const line = getMeme().lines[getCurrentLineIdx()]
    if (!line) return
    const padding = 4//used to determine padding of text inside 'border'
    const rectangle = {
        x: line.cornerCoords.x - padding,
        y: line.cornerCoords.y - line.fontAtts.size,
        xspan: line.txtWidth/2+padding,
        yspan: line.txtHeight
    }
    gCtx.save()
    gCtx.rotate(Math.PI / 180 * line.angle, 0, 0)
    gCtx.beginPath()
    gCtx.rect(rectangle.x, rectangle.y, rectangle.xspan, rectangle.yspan)
    gCtx.stroke()
    gCtx.restore()
}
function clearCanvas(elContext) {// used mainly for clearing selector
    elContext.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
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
function setInputValues() {
    if (!getMeme().lines[getCurrentLineIdx()]) return
    gElInputs.textBox.value = getMeme().lines[getCurrentLineIdx()].txts.join(' ')
    gElInputs.colorPicker.value = getMeme().lines[getCurrentLineIdx()].color
}
function resizeCanvas(image) {
    const canvasContainer = document.querySelector('.canvas-container')
    const aspectRatio = image.width > image.height ? image.width / image.height : image.height / image.width
    const orientation = image.width > image.height ? 'landscape' : 'portrait'
    let newWidth
    let newHeight
    if (orientation === 'landscape') {
        newWidth = 500 * aspectRatio
        newHeight = 600
    } else {
        newWidth = 500
        newHeight = 500 * aspectRatio
    }
    gImageDimensions = { sWidth: newWidth, sHeight: newHeight }
    gElCanvas.width = newWidth
    gElBgCanvas.width = newWidth
    gElCanvas.height = newHeight
    gElBgCanvas.height = newHeight
    canvasContainer.style.height = newHeight + 'px'
    canvasContainer.style.width = newWidth + 'px'
}

//event driven
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
    onNavLinkClick({ target: { innerText: 'editor' } })//pretty proud of this hack ngl lol
    setMemeImage(imgIdx)
    renderMeme()
}
function onColorChange(ev) {
    setTextColor(ev.target.value)
    renderMeme()
}
function onDownloadImage(ev) {
    renderMeme(false, true)
    const elLink = ev.target
    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL('image/jpg')
        elLink.href = imgContent
        // ev.href = self.href
    }, 300);
    setTimeout(() => {
        ev.target.href
    }, 300);
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

