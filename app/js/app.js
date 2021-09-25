window.addEventListener('load', () => {
    // Валидация формы в header
    let objForClass = {
        input__name: document.getElementById('form__name'),
        input__email: document.getElementById('form__email'),
        input__phone: document.getElementById('form__phone'),
        formTag: document.getElementById('header__form'),
        label__name: document.querySelector('label[for="form__name"]'),
        label__email: document.querySelector('label[for="form__email"]'),
        label__phone: document.querySelector('label[for="form__phone"]'),
        form__btn: document.querySelector('.form__btn'),
    };
    new ValidationForm(objForClass);

    // Валидация формы в footer
    let objForClassFromFooter = {
        input__name: document.getElementById('contact__inp-name'),
        input__email: document.getElementById('contact__inp-mail'),
        input__phone: document.getElementById('contact__inp-phone'),
        formTag: document.querySelector('.contact__form'),
        label__name: document.querySelector('label[for="contact__inp-name"]'),
        label__email: document.querySelector('label[for="contact__inp-mail"]'),
        label__phone: document.querySelector('label[for="contact__inp-phone"]'),
        form__btn: document.querySelector('.contact__btn'),
        buttonTextSend: 'Жду звонка',
        buttonTextSent: 'Sent - Типо отправлено',
    };
    let resultValidationForm = new ValidationForm(objForClassFromFooter);

    // Send E-mail fetch
    let dataByEmail = {
        arrInput: '#header__form input', // передача массива с инпутами
        btnSend: '#header__form .form__btn', // кнопка отправить
        arrHideElements: [], // массив элементов которые нужно скрыть, что бы показать блок спасибо
        block_thanks: ['#header__form .messageSuccess', 'block'], // блок спасибо, дисплэй который покажет его
        block_error: ['#header__form .messageNotSuccess', 'block'], // блок спасибо, дисплэй который покажет его
        close_block_btn: ['#header__form .messageSuccess__closeBTN', '#header__form .messageNotSuccess__closeBTN'], // Кнопки с крестиком, которые уберут блок "спасибо"
        text_error: '#header__form .text-error',
    }
    let SendByEmailHeader = new SendByEmail(dataByEmail);

    let dataByEmailContact = {
        arrInput: '.contact__form .form__input', // передача массива с инпутами
        btnSend: '.contact__form .contact__btn', // кнопка отправить
        arrHideElements: [], // массив элементов которые нужно скрыть, что бы показать блок спасибо
        block_thanks: ['.contact__form .messageSuccess', 'block'], // блок спасибо, дисплэй который покажет его
        block_error: ['.contact__form .messageNotSuccess', 'block'], // блок спасибо, дисплэй который покажет его
        close_block_btn: ['.contact__form .messageSuccess__closeBTN', '.contact__form .messageNotSuccess__closeBTN'], // Кнопки с крестиком, которые уберут блок "спасибо"
        text_error: '.contact__form .text-error',
    }
    let SendByEmailFooter = new SendByEmail(dataByEmailContact);

    // В случае если валидация не прошла, и ошибка не вывелась, воспользуюсь методом вывода ошибки от класса SendByEmail
    if (resultValidationForm.arrErrors.length > 0) {
        SendByEmailHeader.show_result_block('#header__form .messageNotSuccess')
        SendByEmailFooter.show_result_block('.contact__form .messageNotSuccess')
    }

    // Табы
    let tabsData = {
        tabs__btn: document.querySelectorAll('.tabs__btn'),
        tabs__contentItems: document.querySelectorAll('.tabs__content-item'),
        duration: 700, // default 500
    }
    new Tabs(tabsData);

    // Меню
    let menuData = {
        menu: document.querySelector('.menu'),
        menu__link: document.querySelectorAll('.menu__link'),
        first_line: document.querySelector('.first-line'),
    };
    new Menu(menuData);

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
})