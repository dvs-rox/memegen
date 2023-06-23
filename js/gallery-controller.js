'use strict'
const gImgCount = 21
const gElGallery = document.querySelector('.gallery-container')
function renderGallery() {
    let strHtml = ``
    for (var i = 1; i <= gImgCount; i++) {
        strHtml += `<article class="card"><img src="./img/templates/${i}.jpg" onclick="onImageChange(${i})"></article>`
    }
    gElGallery.innerHTML = strHtml
}