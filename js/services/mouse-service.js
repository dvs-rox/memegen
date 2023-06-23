'use strict'
let gCursor = {
    x: 0,
    y: 0
}
let gDragInfo = {
    initCoords: {
        x: 0,
        y: 0
    },
    nextCoords: {
        x: 0,
        y: 0
    }
}
function initListeners() {
    gElCanvas.addEventListener('mousedown', _selectLineByCoords)
}
function _selectLineByCoords(event) {//first try baby let's gooooooooooooooo
    _setCursorPosition(event)
    const meme = getMeme()//get meme to iterate and get all line ranges
    const lineIdx = meme.lines.findIndex((line) => {
        const xStart = line.cornerCoords.x
        const xEnd = line.cornerCoords.x + line.txtWidth
        const yStart = line.cornerCoords.y
        const yEnd = line.cornerCoords.y + line.size
        if (gCursor.x > xStart && gCursor.x < xEnd && gCursor.y > yStart && gCursor.y < yEnd) {
            return line
        }
    })
    if (lineIdx != -1) {
        gDragInfo.initCoords = { x: gCursor.x, y: gCursor.y }
        _enableLineDragging()
        setLineIndex(lineIdx)
        focusOnInput(gElInputs.textBox)
        renderMeme()
    }
}
function _enableLineDragging() {
    console.log('enable line dragging')
    gElCanvas.addEventListener('mousemove', _repositionLine, false)
    gElCanvas.addEventListener('mouseup', _disableLineDragging)
}
function _disableLineDragging() {
    console.log('disable line dragging')
    gElCanvas.removeEventListener('mousemove', _repositionLine, false)
}
function _repositionLine(event) {
    gDragInfo.nextCoords = { x: event.offsetX, y: event.offsetY }
    const xDiff = gDragInfo.nextCoords.x - gDragInfo.initCoords.x
    const yDiff = gDragInfo.nextCoords.y - gDragInfo.initCoords.y
    gDragInfo.initCoords = {
        x: gDragInfo.nextCoords.x,
        y: gDragInfo.nextCoords.y
    }
    // debugger
    moveText(xDiff,yDiff)
}
//sets
function _setCursorPosition(event) {//used only by event
    gCursor.x = event.offsetX
    gCursor.y = event.offsetY
}
