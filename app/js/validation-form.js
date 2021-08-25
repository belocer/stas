window.addEventListener('load', () => {
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
    new ValidationForm(objForClassFromFooter);
})