const gElNavbar = document.querySelector('nav')
const gElEditor = document.querySelector('.editor')

function onNavLinkClick(ev) {
    const selectedLink = ev.target
    cleanNavBar()
    hideAllSections()
    switch (selectedLink.innerText.toLowerCase()) {
        case 'editor':
            selectedLink.classList.add('selected')
            gElEditor.classList.add('visible')
            renderMemeSectionHtml()
            renderMeme()
            break
        case 'gallery':
            selectedLink.classList.add('selected')
            gElGallery.classList.add('visible')
            console.log(gElGallery)
            renderGallery()
            break
        case 'about':
            selectedLink.classList.add('selected')
            break
    }
}
function cleanNavBar() {
    const listAnchors = gElNavbar.querySelectorAll('a')
    listAnchors.forEach(a => {
        a.classList.remove('selected')
    });
}
function hideAllSections(){
    const elSections = document.querySelectorAll('section div')
    elSections.forEach(section => {
        section.classList.remove('visible')
        section.classList.add('hidden')
        section.innerHTML = ''
    });
}