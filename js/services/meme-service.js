'use strict'
//note: please feel free to ignore the silly flavour text in some comments, it is for my own amusement
var gImgs = []
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [],
    txtWidth: 20
}
let gCurrentLineIndex = 0
var gKeywordSearchCountMap

function addLine(text = 'add text here :DDDD') {
    gMeme.lines.push({
        txt: text,
        size: 40,
        angle: 0,
        isRotated:false,
        color: 'white',
        cornerCoords: {
            x: gElCanvas.width / 2 - gCtx.measureText(text).width,
            y: gElCanvas.height / 2
        },
        txtWidth: gCtx.measureText(text).width
    })
    gCurrentLineIndex = gMeme.lines.length - 1
    // const currentLine = gMeme.lines[gCurrentLineIndex]
    // switch (gCurrentLineIndex) {
    //     case 0:
    //         currentLine.cornerCoords = {
    //             x: (gElCanvas.width - currentLine.txtWidth) / 2,
    //             y: currentLine.size / 10// idk why this works lmao (magic number)
    //         }
    //         break
    //     case 1:
    //         currentLine.cornerCoords = {
    //             x: (gElCanvas.width - currentLine.txtWidth) / 2,
    //             y: gElCanvas.height - currentLine.size * 1.4// idk why this works lmao (magic number)
    //         }
    //         break
    //     default:
    //         currentLine.cornerCoords = {
    //             x: (gElCanvas.width - currentLine.txtWidth) / 2,
    //             y: gElCanvas.height / 2 - currentLine.size// idk why this works lmao (magic number)
    //         }
    //         break

    // }
    renderMeme()
}
function scrollLineIndex() {
    (gCurrentLineIndex + 1 >= gMeme.lines.length) ? setLineIndex(0) : setLineIndex(gCurrentLineIndex + 1)
}

//GETS
function getMeme() {
    return gMeme
}
function getCurrentLineIdx() {
    return gCurrentLineIndex
}
//SETS (only sets I get in lol)
function setLineText(text, lineIdx = gCurrentLineIndex) {
    gMeme.lines[lineIdx].txt = text
}
function setMemeImage(imageIdx) {
    gMeme.selectedImgId = imageIdx
}
function setTextColor(color, line = gCurrentLineIndex) {
    gMeme.lines[line].color = color
}
function setTextSize(sizeDiff, line = gCurrentLineIndex) {
    if (gMeme.lines[line].size + sizeDiff < 20) return
    gMeme.lines[line].size += sizeDiff
}
function setLineIndex(val) {
    gCurrentLineIndex = val
}