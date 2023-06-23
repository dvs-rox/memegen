'use strict'

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
        txts: ['text me please'],
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
function updateTextWidth(line = getMeme().lines[gCurrentLineIndex]) {
    // if (line.txts.length <= 1) return
    var longest = line.txts.reduce((a, b) => {
        return a.length > b.length ? a : b
    }, ''.length)
    console.log(longest)
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
        console.log('row :', row)
        context.fillText(row, line.cornerCoords.x, line.cornerCoords.y + txtHeight)
        context.strokeText(row, line.cornerCoords.x, line.cornerCoords.y + txtHeight)
        txtHeight += line.fontAtts.size + padding
    })
    line.txtHeight = txtHeight
}
function updateRows(line = getMeme().lines[gCurrentLineIndex]) {
    const words = line.txt.split(' ')
    const lineBreak = line.lineBreak
    const rows = []
    // if (words.length < lineBreak) rows[0] = words.join(' ')
    while (words.length > 0) {
        const row = words.splice(0, lineBreak)
        rows.push(row.join(' '))
        line.txts = rows
    }
    // for (var i = 0; i < words.length/lineBreak; i ++) {
    //     // debugger
    //     console.log(i)
    //     console.log(lineBreak)
    //     // const row = words.slice(i / lineBreak, i + lineBreak)
    //     row.join(' ')
    //     const row = words.splice(i)
    //     console.log(row.join(' '))
    //     rows.push(row)
    // }
    // line.txts =''
}
function setLineText(text, lineIdx = gCurrentLineIndex) {
    const line = getMeme().lines[lineIdx]
    updateTextWidth()
    line.txt = text
    updateRows()
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
}
//saving for a rainy day
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