window.addEventListener('load', () => {
    // Меню
    let menuData = {
        menu: document.querySelector('.menu'),
        menu__link: document.querySelectorAll('.menu__link'),
        first_line: document.querySelector('.first-line'),
    };
    new Menu(menuData);

    if (window.location.href.split('/').length === 4) {
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
            block_thanks: '#header__form .messageSuccess', // блок спасибо, дисплэй который покажет его
            block_error: '#header__form .messageNotSuccess', // блок спасибо, дисплэй который покажет его
            close_block_btn: ['#header__form .messageSuccess__closeBTN', '#header__form .messageNotSuccess__closeBTN'], // Кнопки с крестиком, которые уберут блок "спасибо"
            text_error: '#header__form .text-error',
            loading_block: '#header__form .loadingio-eclipse',
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
            loading_block: '.contact__form .loadingio-eclipse',
        }
        let SendByEmailFooter = new SendByEmail(dataByEmailContact);

        // В случае если валидация не прошла, и ошибка не вывелась,
        // воспользуюсь методом вывода ошибки от класса SendByEmail
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

        // Анимация списка направлений
        let animData = {
            blockInWich: "#info_anim_list",
            listAnimateElement: '.info__list-item',
            animationClassCSS: 'anim_info_list',
            addingSpeed: 100,
            distanceToElement: 800
        }
        new ScrollAnimation(animData);

        // Анимация списка брэндов
        let animDataBrand = {
            blockInWich: "#partner",
            listAnimateElement: '.partner__item',
            animationClassCSS: 'anim_transform_rotate'
        }
        new ScrollAnimation(animDataBrand);

        // Анимация текста в инфо блоке
        let animDataText = {
            blockInWich: "#info_anim_text",
            listAnimateElement: '.info__p',
            animationClassCSS: 'anim_info_text',
            addingSpeed: 200,
            distanceToElement: 700
        }
        new ScrollAnimation(animDataText);

        /* Tiny Slider */
        tns({
            "container": ".tns-sl",
            "rewind": true,
            "items": 3,
            "mouseDrag": true,
            "autoplay": true,
            "autoplayTimeout": 3500,
            "swipeAngle": true,
            "speed": 300,
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
        tns({
            "container": ".tns-slider-info",
            "items": 1,
            "speed": 300,
            "autoplay": true,
            "autoplayHoverPause": true,
            "autoplayTimeout": 3500,
            "swipeAngle": false,
            "autoHeight": true,
        });
        tns({
            "container": ".tns-slider-infoSecond",
            "items": 1,
            "speed": 300,
            "autoplay": true,
            "autoplayHoverPause": true,
            "autoplayTimeout": 3500,
            "swipeAngle": false,
            "autoHeight": true,
        });

    }
})