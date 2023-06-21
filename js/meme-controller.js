'use strict'
let gElCanvas 
let gCtx 

function onInit(){
    gElCanvas = document.getElementById('canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const image = new Image()
    image.onload = ()=>{
        gCtx.drawImage(image,0,0)
        drawText(meme.lines[0])
    }
    image.src = `./img/templates/${meme.selectedImgId}.jpg`
    // const image = new Image()
    // image.onload = () => {
    //     gCtx.drawImage(image, 0, 0)
    //     drawText()
    // }
    // image.src = './img/templates/2.jpg'
}
function drawText(line){
    // lines:[
    //     {
    //         txt:`I have no clue what I'm doing`,
    //         size:20,
    //         color:'white'
    //     }
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    gCtx.fillText(line.txt,20,50)
}