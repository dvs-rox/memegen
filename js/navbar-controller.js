const gElNavbar = document.querySelector('nav')
const gElEditor = document.querySelector('.editor-container')

function onNavLinkClick(ev) {
    const selectedLink = ev.target
    cleanNavBar()
    hideAllSections()
    switch (selectedLink.innerText.toLowerCase()) {
        case 'editor':
            selectedLink.classList.add('selected')
            gElEditor.style= ''
            break
        case 'gallery':
            selectedLink.classList.add('selected')
            gElGallery.style = ''
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
function hideAllSections() {
    const elSections = document.querySelectorAll('section')
    elSections.forEach(section => {
        section.style = 'display:none'
    });
}