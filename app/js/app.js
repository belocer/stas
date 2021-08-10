window.addEventListener('load', () => {

    /* vvv Меню vvv */
    let menu = document.querySelector('.menu');
    let first_line = document.querySelector('.first-line');

    menu.addEventListener('click', toggleMenuMobile)

    function toggleMenuMobile(e) {
        first_line.classList.toggle('active-item-menu')
    }
    /* ^^^ Меню ^^^ */
})