'use strict'
let gCursor = {
    x: 0,
    y: 0
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
        setLineIndex(lineIdx)
        renderMeme()
    }
}
//sets
function _setCursorPosition(event) {//used only by event
    gCursor.x = event.offsetX
    gCursor.y = event.offsetY
}
