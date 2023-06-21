'use strict'
const gElGallery = document.querySelector('.gallery')
function renderGallery() {
    let strHtml = `<article class="card">`
    for (var i = 1; i < 10; i++) {
        strHtml += `<img src="./img/templates/${i}.jpg" onclick="onImageChange(${i})">`
    }
    strHtml += `</article>`
    gElGallery.innerHTML = strHtml
}