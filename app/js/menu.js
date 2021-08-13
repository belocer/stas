let debounceTimeOut // Переменная для Debounce
let debounceTimeOutScroll // Переменная для Debounce скролл
let windowInnerWidth // Ширина экрана
let first_line = document.querySelector('.first-line');

function getResize() {
    windowInnerWidth = window.innerWidth
    return windowInnerWidth
}

window.addEventListener('resize', () => {
    clearTimeout(debounceTimeOut)
    debounceTimeOut = setTimeout(getResize, 200)
})

window.addEventListener('scroll', () => {
    clearTimeout(debounceTimeOutScroll)
    debounceTimeOutScroll = setTimeout(onScrollHideMenu, 150)
})

/* Скрыть показать меню */
let lastScrollTop = 0;
function onScrollHideMenu(e) {
    let top = window.pageYOffset;
    if (lastScrollTop > top && first_line.classList.contains('menu-scroll-hide')) {
        first_line.classList.remove('menu-scroll-hide')
    } else if (lastScrollTop < top && !first_line.classList.contains('menu-scroll-hide')) {
        first_line.classList.add('menu-scroll-hide')
    }
    lastScrollTop = top;
}

window.addEventListener('load', () => {
    // Скрыть показать меню на мобиле
    let menu = document.querySelector('.menu');
    let first_line = document.querySelector('.first-line');

    menu.addEventListener('click', toggleMenuMobile)

    function toggleMenuMobile(e) {
        windowInnerWidth = getResize()
        if (windowInnerWidth < 721) {
            if (first_line.classList.contains('active-item-menu')) {
                first_line.classList.remove('active-item-menu')
            } else {
                first_line.classList.add('active-item-menu')
                first_line.animate([
                    {opacity: 0},
                    {opacity: 1}
                ], {duration: 300});
            }
        }
    }

    // Lavrik Подсвечивание пункта меню по скроллу
    menu.addEventListener('click', function(e){
        let link = e.target;
        if(link.classList.contains('menu__link')){
            e.preventDefault();
            menu.querySelector('.menu__link-active').classList.remove('menu__link-active');
            link.classList.add('menu__link-active');
            scrollToTarget(link.hash);
        }
    });

    if(location.hash !== ''){
        scrollToTarget(location.hash);
    }

    function scrollToTarget(id){
        let target = document.querySelector(id);
        if(target !== null){
            let pos = target.offsetTop - 70;
            window.scrollTo({
                top: pos,
                behavior: 'smooth'
            });
        }
    }
})