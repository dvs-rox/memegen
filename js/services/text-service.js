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
            strokeColor: '#000000',
            color: '#FFFFFF',
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
function removeLine(line = gMeme.lines[gCurrentLineIndex]) {
    gMeme.lines.splice(gCurrentLineIndex, 1)
}
function updateTextWidth(line = getMeme().lines[gCurrentLineIndex]) {
    const ctx = gCtx
    setContextAttributes(line, ctx)
    var longest = ''
    line.txts.forEach(row => {
        if (ctx.measureText(row).width > ctx.measureText(longest).width) longest = row
    })
    console.log('longest:', longest)
    line.txtWidth = ctx.measureText(longest).width+line.fontAtts.size
}
function setContextAttributes(line, context) {
    context.strokeStyle = line.fontAtts.strokeColor
    context.fillStyle = line.fontAtts.color
    context.font = `${line.fontAtts.size}px ${line.fontAtts.fontFamily}`
    context.textAlign = line.fontAtts.align
    context.textBaseLine = line.fontAtts.baseLine
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
}
function setLineText(text, lineIdx = gCurrentLineIndex) {
    if(!getMeme().lines[lineIdx])addLine('add text here')
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
function setLineWrap(val) {
    gMeme.lines[gCurrentLineIndex].lineBreak = val
}
function setTextColor(color, lineIdx = gCurrentLineIndex) {
    gMeme.lines[lineIdx].fontAtts.color = color
}
function setTextSize(sizeDiff, line = gCurrentLineIndex) {
    if (gMeme.lines[line].fontAtts.size + sizeDiff < 20) return
    gMeme.lines[line].fontAtts.size += sizeDiff
    updateTextWidth()
}