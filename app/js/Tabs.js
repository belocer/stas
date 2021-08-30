class Tabs {
    constructor(tabsData) {
        this.tabs__btn = tabsData.tabs__btn; // Кнопки
        this.tabs__content_item = tabsData.tabs__contentItems; // Элементы содержимого вкладок
        this.duration = tabsData.duration || 500; // Время выполнения анимации
        this.tabs__btn.forEach(item => item.addEventListener('click', (e) => this.toggleTabContent(e)));
    }

    toggleTabContent(e) {
        // Анимация появления контента
        this.tabs__content_item.forEach(item => {
            if (item.classList.contains('active-tabs-item')) {
                item.classList.remove('active-tabs-item')
                item.animate([
                    {opacity: 1},
                    {opacity: 0}
                ], {duration: this.duration});
            }
        })

        this.tabs__content_item[e.target.dataset.tab].classList.add('active-tabs-item')

        this.tabs__content_item[e.target.dataset.tab].animate([
            {opacity: 0},
            {opacity: 1}
        ], {duration: this.duration});

        // Кнопки
        this.tabs__btn.forEach(item => {
            if (item.classList.contains('active-tabs-btn')) {
                item.classList.remove('active-tabs-btn')
            }
        })
        e.target.classList.add('active-tabs-btn')
    }
}