'use strict'
//note: please feel free to ignore the silly flavour text in some comments, it is for my own amusement
var gImgs = []
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: `I have no clue what I'm doing`,
            size: 40,
            color: 'white'
        },
        {
            txt: `But I'm trying my best uwu`,
            size: 40,
            color: 'white'
        }
    ]
}
let gCurrentLineIndex = 0
var gKeywordSearchCountMap

function addLine(text = 'add text here :DDDD') {
    gMeme.lines.push({
        txt: text,
        size: 40,
        color: 'white'
    })
}
function scrollLineIndex() {
    (gCurrentLineIndex+1 >= gMeme.lines.length) ?  setLineIndex(0) : setLineIndex(gCurrentLineIndex + 1) 
    // if(gCurrentLineIndex+1 >= gMeme.lines.length)
    console.log(gCurrentLineIndex)
}

//GETS
function getMeme() {
    return gMeme
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