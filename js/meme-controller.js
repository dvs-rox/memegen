'use strict'
//foreground canvas
let gElCanvas
let gCtx
//background canvas
let gElBgCanvas
let gBgCtx
let gElInputs= {}
let gImageDimensions

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
function renderMeme(showSelector = true, combineLayers = false, image = new Image()) {
    clearCanvas(gCtx)//resets main canvas, not background layer
    const meme = getMeme()
    image.onload = () => {
        resizeCanvas(image)
        if (combineLayers) {
            console.log('squishing layers')
            gCtx.drawImage(image, 0, 0, gImageDimensions.sWidth, gImageDimensions.sHeight)
        }
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
    const padding = 0//used to determine padding of text inside 'border'
    const rectangle = {
        x: line.cornerCoords.x - padding,
        y: line.cornerCoords.y - line.fontAtts.size,
        xspan: line.txtWidth + padding,
        yspan: line.txtHeight
    }
    gCtx.save()
    gCtx.rotate(Math.PI / 180 * line.angle, 0, 0)
    gCtx.beginPath()
    gCtx.rect(rectangle.x, rectangle.y, rectangle.xspan, rectangle.yspan)
    gCtx.stroke()
    gCtx.restore()
}
function drawText(line, context) {
    const rows = line.txts
    const padding = 2
    setContextAttributes(line, context)

    let txtHeight = padding
    rows.forEach(row => {
        context.wordSpacing = '700px'
        context.fillText(row, line.cornerCoords.x, line.cornerCoords.y + txtHeight)
        context.strokeText(row, line.cornerCoords.x, line.cornerCoords.y + txtHeight)
        txtHeight += line.fontAtts.size + padding
    })
    line.txtHeight = txtHeight
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
        colorPicker: document.getElementById('txtColorPicker'),
        lineWrap: document.getElementById('lineWrap')
    }

    gElInputs.lineWrap.value = 5
    gElInputs.lineWrap.title = `wrap every ${gElInputs.lineWrap.value} words`
}
function focusOnInput(elinput) {
    window.setTimeout(() => elinput.focus(), 0)
}
function setInputValues() {
    if (!getMeme().lines[getCurrentLineIdx()]) return
    //
    const line = getMeme().lines[getCurrentLineIdx()]
    gElInputs.textBox.value = line.txts.join(' ')
    //colorpicker stuff
    gElInputs.colorPicker.value = line.fontAtts.color
    document.querySelector('.fa-palette').style.color = line.color
    //linewrap
    gElInputs.lineWrap.value =line.lineBreak
    document.querySelector('.editor-controls label h3 span').innerText = line.lineBreak

}
function resizeCanvas(image) {
    const canvasContainer = document.querySelector('.canvas-container')
    const aspectRatio = image.width > image.height ? image.width / image.height : image.height / image.width
    const orientation = image.width > image.height ? 'landscape' : 'portrait'
    let newWidth
    let newHeight
    if (orientation === 'landscape') {
        newWidth = 500 * aspectRatio
        newHeight = 500
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
function setCustomImage(img) {

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
function onSetLineWrap(el) {
    setLineWrap(el.value)
    const span = document.querySelector('.lineWrap-container span')
    span.innerText = getMeme().lines[getCurrentLineIdx()].lineBreak
    const str = `wrap every ${getMeme().lines[getCurrentLineIdx()].lineBreak} words`
    el.title = str
    updateRows()
    updateTextWidth()
    renderMeme()
}
function onImageChange(imgIdx) {
    onNavLinkClick({ target: document.getElementById('editorLink') })//pretty proud of this hack ngl lol
    setMemeImage(imgIdx)
    renderMeme()
}
function onColorChange(ev) {
    setTextColor(ev.target.value)
    document.querySelector('.fa-palette').style.color = ev.target.value
    renderMeme()
}
function onDownloadImage(ev) {
    renderMeme(false, true)
    const elLink = ev.target
    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL('image/jpg')
        elLink.href = imgContent
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
    setInputValues()
    focusOnInput(gElInputs.textBox)
}
function onRemoveLine() {
    removeLine()
    renderMeme()
}
function onSwitchLine() {
    scrollLineIndex()
    renderMeme()
    focusOnInput(gElInputs.textBox)
    setInputValues()
}
function onShareToFacebook() {
    getDataUrl()//bad name, no time to organize
}
