window.addEventListener('load', () => {

    /* Второй экран Табы */
    let tabs__btn = document.querySelectorAll('.tabs__btn'); // Кнопки
    let tabs__content_item = document.querySelectorAll('.tabs__content-item'); // Контент

    tabs__btn.forEach(item => item.addEventListener('click', toggleTabContent))

    function toggleTabContent(e) {
        // Анимация появления контента
        tabs__content_item.forEach(item => {
            if (item.classList.contains('active-tabs-item')) {
                item.classList.remove('active-tabs-item')
                item.animate([
                    {opacity: 1},
                    {opacity: 0}
                ], {duration: 700});
            }
        })

        tabs__content_item[e.target.dataset.tab].classList.add('active-tabs-item')

        tabs__content_item[e.target.dataset.tab].animate([
            {opacity: 0},
            {opacity: 1}
        ], {duration: 700});

        // Кнопки
        tabs__btn.forEach(item => {
            if (item.classList.contains('active-tabs-btn')) {
                item.classList.remove('active-tabs-btn')
            }
        })
        e.target.classList.add('active-tabs-btn')
    }
})


/* Tiny Slider */
tns({
    "container": ".tns-sl",
    "rewind": true,
    "items": 3,
    "mouseDrag": true,
    "autoplay": true,
    "autoplayTimeout": 3000,
    "swipeAngle": true,
    "speed": 5000,
    "controls": false,
    "autoplayButton": false,
    "gutter": 10,
    "responsive": {
        "1100": {
            "items": 3
        },
        "895": {
            "items": 2
        },
        "400": {
            "items": 1
        },
        "300": {
            "items": 1
        }
    },
});