'use strict'
var gCustomImage
function onFileUpload(elInput) {
    console.log(elInput)
    const imgData = getBase64Image(elInput.files[0])
    localStorage.setItem('imgData', imgData)
    getCustomImage()
}
function getCustomImage() {
    const dataImage = localStorage.getItem('imgData')
    const image = new Image()
    image.src = "data:image/jpg;base64," + dataImage
    console.log(image.src)
    if (dataImage) {
        renderMeme(true, false)
    }
}