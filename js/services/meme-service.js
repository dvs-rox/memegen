'use strict'
var gImgs = []
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: `I have no clue what I'm doing`,
            size: 40,
            color: 'white'
        }
    ]
}
var gKeywordSearchCountMap

function getMeme() {
    return gMeme
}
function setLineText(text, lineIdx = 0) {
    gMeme.lines[lineIdx].txt = text
}
function setMemeImage(imageIdx) {
    gMeme.selectedImgId = imageIdx
}
function setTextColor(color, line = 0) {
    gMeme.lines[line].color = color
}
function setTextSize(sizeDiff, line = 0) {
    if(gMeme.lines[line].size+sizeDiff<20)return
    gMeme.lines[line].size+=sizeDiff
}