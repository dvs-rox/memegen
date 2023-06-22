const gElNavbar = document.querySelector('nav')
function onNavLinkClick(ev) {
    const selectedLink = ev.target
    cleanNavBar()
    switch (selectedLink.innerText.toLowerCase()) {
        case 'editor':
            selectedLink.classList.add('selected')
            break
        case 'gallery':
            selectedLink.classList.add('selected')
            break
        case 'about':
            selectedLink.classList.add('selected')
            break
    }
}
function cleanNavBar() {
    const listAnchors = gElNavbar.querySelectorAll('a')
    // document.querySelector('.selected').classList.remove('selected')
    listAnchors.forEach(a => {
        console.log(a)
        a.classList.remove('selected')
    });
}