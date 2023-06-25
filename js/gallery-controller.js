'use strict'
let gImageSearchParams = []
const gImgCount = 21
const gElGallery = document.querySelector('.gallery-container')
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
        { tags: 'trump cunt fascist orange dog' },//1
        { tags: 'dog dogs couple' },//2
        { tags: 'dog baby blanket' },//3
        { tags: 'cat laptop keyboard sleepy tired' },//4
        { tags: 'baby success determined fist victory' },//5
        { tags: 'aliens suit conspiracy' },//6
        { tags: 'baby shocked striped' },//7
        { tags: 'wonka lean smug smirk hat bowtie' },//8
        { tags: 'baby evil hand smile lake' },//9
        { tags: 'trans drake shades' },//cba to number them all
        { tags: 'boxing kiss' },
        { tags: 'point blame' },
        { tags: 'toast glass leonardo dicaprio titanic' },
        { tags: 'morpheus shades red pill blue pill' },
        { tags: 'mordor lord of the rings lotr' },
        { tags: 'captain kirk happy smile laugh' },
        { tags: 'putin dog russia fascist' },
        { tags: 'buzz woody toy story' },
        { tags: 'gru despicable me minion' },
        { tags: 'spongebob buff training' },
        { tags: 'poo winnie classy dumb' }
    ]
}

function renderBySearchParams() {
    gImageSearchParams.forEach(tags => {
        if (tags.tags.split(' ').includes('dog')) console.log(tags)
    });
}