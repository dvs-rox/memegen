'use strict'
let gImageSearchParams = []
const gImgCount = 21
let gElGallery = document.querySelector('.gallery-container section')
function renderGallery() {
    let strHtml = ``
    for (var i = 1; i <= gImgCount; i++) {
        strHtml += `<article class="card"><img src="./img/templates/${i}.jpg" onclick="onImageChange(${i})"></article>`
    }
    gElGallery.innerHTML = strHtml
    initImageSearchParams()
}

function initImageSearchParams() {
    gImageSearchParams = [
        'trump cunt fascist orange dog',//1
        'dog dogs couple',//2
        'dog baby blanket',//3
        'cat laptop keyboard sleepy tired',//4
        'baby success determined fist victory',//5
        'aliens suit conspiracy',//6
        'baby shocked striped',//7
        'wonka lean smug smirk hat bowtie',//8
        'baby evil hand smile lake',//9
        'trans drake shades',//cba to number them all
        'boxing kiss',
        'point blame',
        'toast glass leonardo dicaprio titanic',
        'morpheus shades red pill blue pill',
        'mordor lord of the rings lotr',
        'captain kirk happy smile laugh',
        'putin dog russia fascist',
        'buzz woody toy story',
        'gru despicable me minion',
        'spongebob buff training',
        'poo winnie classy dumb'
    ]
}

function renderBySearchParams(ev) {
    const searchParams = ev.target.value.split(' ')
    // console.log(searchParams)
    let images
    let idxs=[]
    for (var i = 0; i < searchParams.length; i++) {
        images = gImageSearchParams.filter((str, idx) => { if (str.includes(searchParams[i])) idxs.push(idx+1)  })
    }
    let strHtml = ``
    idxs.forEach(idx => {
        strHtml += `<article class="card"><img src="./img/templates/${idx}.jpg" onclick="onImageChange(${idx})"></article>`
    });
    // for (var i = 1; i <= gImgCount; i++) {
    //     strHtml += `<article class="card"><img src="./img/templates/${i}.jpg" onclick="onImageChange(${i})"></article>`
    // }
    gElGallery.innerHTML = strHtml

}