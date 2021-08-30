class Menu {
    constructor(menuData) {
        this.debounceTimeOut = 0; // Переменная для Debounce
        this.debounceTimeOutScroll = 0; // Переменная для Debounce скролл
        this.lastScrollTop = 0; // Для определения направления скролла
        this.windowInnerWidth = window.innerWidth; // Ширина экрана
        this.arrOffsetTopItem = []; // Массив для офсетТопа каждого блока

        this.menu = menuData.menu;
        this.menu__link = menuData.menu__link;
        this.first_line = menuData.first_line;

        if (location.hash !== '') {
            this.scrollToTarget(location.hash);
        }

        this.menu.addEventListener('click', this.toggleMenuMobile.bind(this));

        setTimeout(() => {
            this.menu__link.forEach((item, index) => {
                let objName = item.hash.slice(1)
                this.arrOffsetTopItem.push({block: objName, px: document.querySelector(`${item.hash}`).offsetTop})
            })
        }, 300)

        // Лаврик Подсвечивание пункта меню по скроллу
        this.menu.addEventListener('click', this.highlightItemMenu.bind(this));

        window.addEventListener('scroll', () => {
            clearTimeout(this.debounceTimeOutScroll)
            this.debounceTimeOutScroll = setTimeout(this.onScrollHideMenu.bind(this), 150)
        })
    }

    highlightItemMenu(e) {
        e.preventDefault();
        if (e.target.classList.contains('menu__link')) {
            this.menu.querySelector('.menu__link-active').classList.remove('menu__link-active');
            e.target.classList.add('menu__link-active');
            this.scrollToTarget(e.target.hash);
        }
    }

    onScrollHideMenu() {
        let top = window.pageYOffset;
        if (this.lastScrollTop > top && this.first_line.classList.contains('menu-scroll-hide')) {
            this.first_line.classList.remove('menu-scroll-hide')
        } else if (this.lastScrollTop < top && !this.first_line.classList.contains('menu-scroll-hide') && top > 1000) {
            this.first_line.classList.add('menu-scroll-hide')
        }
        this.lastScrollTop = top;
        this.switchItemMenu(top)
    }

    switchItemMenu(top) {
        for (let item of this.arrOffsetTopItem) {
            if (top + 500 >= item.px) {
                for (let itemLink of this.menu__link) {
                    if (itemLink.hash.slice(1) === item.block) {
                        this.menu__link.forEach(el => {
                            if (el.classList.contains('menu__link-active')) {
                                el.classList.remove('menu__link-active')
                            }
                        })
                        itemLink.classList.add('menu__link-active');
                        break
                    }
                }
            }
        }
    }

    getResize() {
        this.windowInnerWidth = window.innerWidth
    }

    scrollToTarget(id) {
        let target = document.querySelector(id);
        if (target !== null) {
            let pos = target.offsetTop - 50;
            window.scrollTo({
                top: pos,
                behavior: 'smooth'
            });
        }
    }

    toggleMenuMobile() {
        this.windowInnerWidth = window.innerWidth
        if (this.windowInnerWidth < 721) {
            if (this.first_line.classList.contains('active-item-menu')) {
                this.first_line.classList.remove('active-item-menu')
            } else {
                this.first_line.classList.add('active-item-menu')
                this.first_line.animate([
                    {opacity: 0},
                    {opacity: 1}
                ], {duration: 300});
            }
        }
    }
}