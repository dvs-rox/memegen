'use strict'
const gElGallery = document.querySelector('.gallery')
function renderGallery() {
    let strHtml = ``
    for (var i = 1; i < 10; i++) {
        strHtml += `<article class="card"><img src="./img/templates/${i}.jpg" onclick="onImageChange(${i})"></article>`
    }
    strHtml += ``
    gElGallery.innerHTML = strHtml
}