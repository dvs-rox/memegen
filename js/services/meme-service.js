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