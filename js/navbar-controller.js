const gElNavbar = document.querySelector('nav')
const gElEditor = document.querySelector('.editor-container')

function onNavLinkClick(ev) {
    const selectedLink = ev.target
    cleanNavBar()
    hideAllSections()
    ev.target.classList.add('selected')
    switch (selectedLink.innerText.toLowerCase()) {
        case 'editor':
            gElEditor.style= ''
            break
        case 'gallery':
            gElGallery.style = ''
            break
        case 'about':
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