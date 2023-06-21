'use strict'
var gImgs = []
var gMeme = {
    selectedImgId:5,
    selectedLineIdx:0,
    lines:[
        {
            txt:`I have no clue what I'm doing`,
            size:20,
            color:'white'
        }
    ]
}
var gKeywordSearchCountMap

function getMeme(){
    return gMeme
}
function setLineText(text, lineIdx){
    gMeme.lines[lineIdx].txt = text
}
function setMemeImage(imageIdx){
    gMeme.selectedImgId = imageIdx
}