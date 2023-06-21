'use strict'
let gElCanvas
let gCtx


function onInit() {
    gElCanvas = document.getElementById('canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
}

//I feel no need for comments here as the func names seem rather self explanetory
function renderMeme() {
    const meme = getMeme()
    const image = new Image()
    image.onload = () => {
        gCtx.drawImage(image, 0, 0)
        meme.lines.forEach((line, lineIdx) => {
            drawText(line, lineIdx)
        });
    }
    image.src = `./img/templates/${meme.selectedImgId}.jpg`
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
            line.cornerCoords = {
                x: (gElCanvas.width - gCtx.measureText(line.txt).width) / 2 - 2,
                y: line.size / 10
            }
            line.txtWidth = gCtx.measureText(line.txt).width
            break;
        }
        case 1: {
            gCtx.fillText(line.txt, gElCanvas.width / 2, gElCanvas.height - line.size / 2)
            gCtx.strokeText(line.txt, gElCanvas.width / 2, gElCanvas.height - line.size / 2)
            //setting params for selector
            // const x = (gElCanvas.width - gCtx.measureText(line.txt).width) / 2 - 2
            // const y = gElCanvas.height - line.size * 1.4
            // renderSelector(gCtx.measureText(line.txt).width + 4, line.size + 2, x, y)
            break;
        }
        default: {
            gCtx.fillText(line.txt, gElCanvas.width / 2, gElCanvas.height / 2)
            gCtx.strokeText(line.txt, gElCanvas.width / 2, gElCanvas.height / 2)
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
function onDownloadImage(ev) {
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
    renderSelector()
    scrollLineIndex()
}
function clearCanvas(){// used for clearing selector

}
function renderSelector() {//Draw rectangle around selected line, this'll be a headache I can tell
    const line = getMeme().lines[getCurrentLineIdx()]
    console.log(line)

    gCtx.beginPath()
    gCtx.rect(line.cornerCoords.x, line.cornerCoords.y, line.txtWidth, line.size)
    gCtx.stroke()
}