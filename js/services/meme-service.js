'use strict'
//note: please feel free to ignore the silly flavour text in some comments, it is for my own amusement
var gImgs = []
// var gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [],
//     txtWidth: 20
// }
var gMeme = { //refactor to string array for each row,
    // selectedImgId: 5,
    // selectedLineIdx: 0,
    // lines: [{
    //     txtWidth: 30,
    //     lineBreak: 5,
    //     cornerCoords: {
    //         x: gElCanvas.width / 2 - gCtx.measureText(text).width,//measureText to only filter longest string
    //         y: gElCanvas.height / 2
    //     },
    //     txts: ['text me'],
    //     fontAtts: {
    //         strokeColor: 'black',
    //         color: 'white',
    //         size: 40,
    //         align: 'left',
    //         baseLine: 'top'
    //     }
    // }]
}
function initMeme() {
    gMeme = { //refactor to string array for each row,
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: []
    }
}
let gCurrentLineIndex = 0
var gKeywordSearchCountMap
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

function setMemeImage(imageIdx) {
    gMeme.selectedImgId = imageIdx
}

function setLineIndex(val) {
    gCurrentLineIndex = val
}