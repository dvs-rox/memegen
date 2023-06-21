'use strict'
let gElCanvas 
let gCtx 

function onInit(){
    gElCanvas = document.getElementById('canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
}

function renderMeme() {
    const meme = getMeme()
    const image = new Image()
    image.onload = ()=>{
        gCtx.drawImage(image,0,0)
        drawText(meme.lines[0])
    }
    image.src = `./img/templates/${meme.selectedImgId}.jpg`
}
function drawText(line){
    gCtx.strokeStyle ='Black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`

    gCtx.fillText(line.txt, 50, 30)
    gCtx.strokeText(line.txt, 50, 30)
}
function onTextChange(ev){
    setLineText(ev.target.value,0)
    renderMeme()
}
function onImageChange(imgIdx){
    setMemeImage(imgIdx)
    renderMeme()
}