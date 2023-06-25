const gElNavbar = document.querySelector('nav')
const gElEditor = document.querySelector('.editor-container')

function onNavLinkClick(ev) {
    const selectedLink = ev.target
    cleanNavBar()
    hideAllSections()
    ev.target.classList.add('selected')
    switch (selectedLink.innerText.toLowerCase()) {
        case 'editor':
            gElEditor.style = ''
            gElInputs.textBox.value = ''
            break
        case 'gallery':
            document.querySelector('.gallery-container').style = ''
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
    console.log(elSections)
    elSections[2] = null
    elSections.forEach(section => {
        section.style = 'display:none'
    });
    elSections[2].style = ''//hackity hack
}