'use strict'
let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
}

function renderMeme() {
    const meme = getMeme()
    const image = new Image()
    image.onload = () => {
        gCtx.drawImage(image, 0, 0)
        drawText(meme.lines[0])
    }
    image.src = `./img/templates/${meme.selectedImgId}.jpg`
}
function drawText(line) {
    gCtx.strokeStyle = 'Black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    // TODO: figure out line breaks!

    // console.log(gCtx.measureText(line.txt))
    // if (line.txt.length * line.size > 500) { 
    //     for (var i = 0; i < line.txt.length; i++) {
    //         if(i)
    //     }
    // }
    gCtx.textAlign = 'center'
    gCtx.fillText(line.txt, gElCanvas.width / 2, line.size)
    gCtx.strokeText(line.txt, gElCanvas.width / 2, line.size)
}
function onTextChange(ev) {
    setLineText(ev.target.value, 0)
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
function onDownloadImage(ev) {
    const elLink = ev.target
    const imgContent = gElCanvas.toDataURL('image/jpg')
    elLink.href = imgContent
}
function onFontSizeChange(val) {
    setTextSize(val)
    renderMeme()
}