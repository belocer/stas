/*** Оптимизировать! ***/
window.addEventListener('load', () => {

    let debounceTimeOut // Переменная для Debounce
    let debounceTimeOutScroll // Переменная для Debounce скролл
    let windowInnerWidth // Ширина экрана
    let menu = document.querySelector('.menu');

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
        } else if (lastScrollTop < top && !first_line.classList.contains('menu-scroll-hide') && top > 700) {
            first_line.classList.add('menu-scroll-hide')
        }
        lastScrollTop = top;
        switchItemMenu(top)
    }

// Подсвечивание пункта меню в зависимость от скролла
    let menu__link = document.querySelectorAll('.menu__link');
    let arrOffsetTopItem = [];
    menu__link.forEach((item, index) => {
        let objName = item.hash.slice(1)
        arrOffsetTopItem.push({block: objName, px: document.querySelector(`${item.hash}`).offsetTop})
    })

    function switchItemMenu(top) {
        for(let item of arrOffsetTopItem) {
            if(top + 100 >= item.px) {
                for(let itemLink of menu__link) {
                    if(itemLink.hash.slice(1) === item.block) {
                        document.querySelectorAll('.menu__link').forEach( i => {
                            if (i.classList.contains('menu__link-active')) {
                                i.classList.remove('menu__link-active')
                            }
                        })
                        itemLink.classList.add('menu__link-active');
                        break
                    }
                }
            }
        }
    }

    // Скрыть показать меню на мобиле
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

    // Лаврик Подсвечивание пункта меню по скроллу
    menu.addEventListener('click', function (e) {
        let link = e.target;
        if (link.classList.contains('menu__link')) {
            e.preventDefault();
            menu.querySelector('.menu__link-active').classList.remove('menu__link-active');
            link.classList.add('menu__link-active');
            scrollToTarget(link.hash);
        }
    });

    if (location.hash !== '') {
        scrollToTarget(location.hash);
    }

    function scrollToTarget(id) {
        let target = document.querySelector(id);
        if (target !== null) {
            let pos = target.offsetTop - 70;
            window.scrollTo({
                top: pos,
                behavior: 'smooth'
            });
        }
    }
})