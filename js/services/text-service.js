'use strict'

// function drawText(line, lineIdx) {//deprecated, to be replaced
//     gCtx.strokeStyle = 'Black'
//     gCtx.fillStyle = line.color
//     gCtx.font = `${line.size}px Impact`
//     gCtx.textAlign = 'center'
//     gCtx.textBaseLine = 'middle'
//     // TODO: figure out line breaks!

//     line.txt = line.txt.toUpperCase()

//     // switch (lineIdx) {
//     //     case 0: {
//     //         line.txtWidth = gCtx.measureText(line.txt).width
//     //         line.cornerCoords = {
//     //             x: (gElCanvas.width - line.txtWidth) / 2,
//     //             y: line.size / 10// idk why this works lmao (magic number)
//     //         }
//     //         break;
//     //     }
//     //     case 1: {
//     //         line.txtWidth = gCtx.measureText(line.txt).width
//     //         line.cornerCoords = {
//     //             x: (gElCanvas.width - line.txtWidth) / 2,
//     //             y: gElCanvas.height - line.size * 1.4// idk why this works lmao (magic number)
//     //         }

//     //         break;
//     //     }
//     //     default: {
//     //         line.txtWidth = gCtx.measureText(line.txt).width
//     //         line.cornerCoords = {
//     //             x: (gElCanvas.width - line.txtWidth) / 2,
//     //             y: gElCanvas.height / 2 - line.size// idk why this works lmao (magic number)
//     //         }
//     //         break;
//     //     }
//     // }
//     // debugger
//     drawTextByCorner(line)
// }
function drawText(line, context) {

    // clearCanvas(context)
    if (!line) return
    context.strokeStyle = 'Black'
    context.fillStyle = line.color
    context.font = `${line.size}px Impact`
    context.textAlign = 'left'
    context.textBaseLine = 'top'
    line.txt = line.txt.toUpperCase()
    context.fillText(line.txt, line.cornerCoords.x, line.cornerCoords.y + line.size / 2)
    context.strokeText(line.txt, line.cornerCoords.x, line.cornerCoords.y + line.size / 2)
    line.txtWidth = gCtx.measureText(line.txt).width
}
function moveText(xDiff = 0, yDiff = 0) {
    const line = gMeme.lines[gCurrentLineIndex]
    line.cornerCoords.x = line.cornerCoords.x + xDiff
    line.cornerCoords.y = line.cornerCoords.y + yDiff
    renderMeme()
}
function rotateText(dif = 45) {//actually correlates to rotating the canvas back and forth but semantically it does result in rotated text. May be moved into meme-service if it makes more sense
    gMeme.lines[gCurrentLineIndex].angle += dif
    gMeme.lines[gCurrentLineIndex].isRotated = true
    // gCtx.save()
    // gCtx.rotate(deg,0,0)
    // drawText(gMeme.lines[0],gCtx)
    // gCtx.restore()
}
