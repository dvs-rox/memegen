'use strict'

// gMeme.line----
//     txts: [], //refactor to string array for each row,
//     lineBreak:5,
//     angle: 0,
//     cornerCoords: {
//         x: gElCanvas.width / 2 - gCtx.measureText(text).width,//measureText to only filter longest string
//         y: gElCanvas.height / 2
//     },
//     txtWidth: _measureLongestString(this.txts),
//     fontAtts:{
//             color: 'white',
//             size: 40,

//
// }
// 
function addLine(text) {
    gMeme.lines.push({
        txtWidth: 0,
        txtHeight: 0,
        lineBreak: 5,
        cornerCoords: {
            x: 0,//measureText to only filter longest string
            y: gElCanvas.height / 2
        },
        angle: 0,
        txt: 'text me please',
        txts: ['text me', 'please'],
        fontAtts: {
            strokeColor: 'black',
            color: 'white',
            size: 40,
            align: 'left',
            baseLine: 'top',
            fontFamily: 'Impact'
        }
    })
    gCurrentLineIndex = gMeme.lines.length - 1
    const line = gMeme.lines[gCurrentLineIndex]
    line.cornerCoords.x = 250
    updateTextWidth(line)
    renderMeme()
}
function updateTextWidth(line) {
    // if (line.txts.length <= 1) return
    var longest = line.txts.reduce((a, b) => {
        return a.length > b.length ? a : b
    }, ''.length)
    line.txtWidth = longest.length * line.fontAtts.size - line.fontAtts.size / 2
}
function drawText(line, context) {
    const rows = line.txts
    const padding = 2
    // debugger
    context.strokeStyle = line.fontAtts.strokeColor
    context.fillStyle = line.fontAtts.color
    context.font = `${line.fontAtts.size}px ${line.fontAtts.fontFamily}`
    context.textAlign = line.fontAtts.align
    context.textBaseLine = line.fontAtts.baseLine

    let txtHeight = padding
    rows.forEach(row => {
        context.fillText(row, line.cornerCoords.x, line.cornerCoords.y + txtHeight)
        context.strokeText(row, line.cornerCoords.x, line.cornerCoords.y + txtHeight)
        txtHeight += line.fontAtts.size + padding
    })
    line.txtHeight = txtHeight
}
// function drawText(line, context) {
//     if (!line) return
//     // const rows = line.txt.split('$#')//custom linebreak thing
//     // console.log(rows)
//     const meme = getMeme()
//     context.strokeStyle = 'Black'
//     context.fillStyle = line.color
//     context.font = `${line.size}px Impact`
//     context.textAlign = 'left'
//     context.textBaseLine = 'top'
//     // line.txt = line.txt.toUpperCase()
//     var printed = line.txt.toUpperCase()
//     context.fillText(line.txt, line.cornerCoords.x, line.cornerCoords.y + line.size / 2)
//     context.strokeText(line.txt, line.cornerCoords.x, line.cornerCoords.y + line.size / 2)
//     line.txtWidth = _measureLongestString(txts)
// }
function moveText(xDiff = 0, yDiff = 0) {
    const line = gMeme.lines[gCurrentLineIndex]
    line.cornerCoords.x = line.cornerCoords.x + xDiff
    line.cornerCoords.y = line.cornerCoords.y + yDiff
    renderMeme()
}
function rotateText(dif = 45) {//actually correlates to rotating the canvas back and forth but semantically it does result in rotated text. May be moved into meme-service if it makes more sense
    gMeme.lines[gCurrentLineIndex].angle += dif
    gMeme.lines[gCurrentLineIndex].isRotated = true
}
