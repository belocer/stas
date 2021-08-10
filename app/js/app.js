window.addEventListener('load', () => {

    /* vvv Меню vvv */
    let menu = document.querySelector('.menu');
    let first_line = document.querySelector('.first-line');

    menu.addEventListener('click', toggleMenuMobile)

    function toggleMenuMobile(e) {
        first_line.classList.toggle('active-item-menu')
    }
    /* ^^^ Меню ^^^ */

    /* vvv Второй экран Табы vvv */
    let tabs__btn = document.querySelectorAll('.tabs__btn'); // Кнопки
    let tabs__content_item = document.querySelectorAll('.tabs__content-item'); // Контент

    tabs__btn.forEach(item => item.addEventListener('click', showTabContent))

    function showTabContent (e) {
        tabs__content_item.forEach( item => {
            if (item.classList.contains('active-tabs-item')) {
                item.classList.remove('active-tabs-item')
            }
        })
        tabs__content_item[e.target.dataset.tab].classList.add('active-tabs-item')

        tabs__btn.forEach( item => {
            if (item.classList.contains('active-tabs-btn')) {
                item.classList.remove('active-tabs-btn')
            }
        })
        e.target.classList.add('active-tabs-btn')
    }
    /* ^^^ Второй экран табы ^^^ */
})




