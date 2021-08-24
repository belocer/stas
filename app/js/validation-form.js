class ValidationForm {
    constructor(objForClass) {
        this.debounceTimeOut = 0;
        this.arrErrors = [];
        this.input__name = objForClass.input__name;
        this.input__email = objForClass.input__email;
        this.input__phone = objForClass.input__phone;
        this.formTag = objForClass.formTag;
        this.label__name = objForClass.label__name;
        this.label__email = objForClass.label__email;
        this.label__phone = objForClass.label__phone;
        this.form__errors = this.formTag.querySelectorAll('.form__errors');
        this.form__input = this.formTag.querySelectorAll('.form__input');
        this.form__btn = objForClass.form__btn;
        this.regPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/; // телефон
        this.regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email
        this.regName = /^[a-zA-Zа-яА-Яё ,.'-]+$/i; // Имя
        this.libErrorsText = {
            phoneFormat: 'Указанный номер не соответствует формату!',
            phoneEmpty: 'Не заполнено поле, - номера телефона!',
            emailFormat: 'Указанный email не соответствует формату!',
            nameEmpty: 'Не верно заполнено поле, - Имя!',
            emptyField: 'Не заполнено поле, - ',
        }

        this.form__input.forEach(item => {
            item.addEventListener('input', () => {
                clearTimeout(this.debounceTimeOut);
                this.debounceTimeOut = setTimeout(() => {
                    this.validateForm();
                }, 500);
            })
        });

        this.formTag.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateFormSubmit();
        });
    }

    validateFormController(regularExpression, field, label, errorText) {
        if (!this.regexMatchCheck(regularExpression, field.value.trim()) && field.value.trim().length > 2) {
            if (!this.arrErrors.find(item => item.place === field.id)) {
                this.arrErrors.push({place: field.id, textError: errorText});
            }
            this.switchBtn(false);
            this.form__btn.textContent = 'Отправить сообщение';
        } else {
            this.switchBtn(true);
            this.deleteElArrErrors(field);
        }
        this.showErrors();
    }

    validateForm() {
        this.validateFormController(this.regName, this.input__name, this.label__name, this.libErrorsText.nameEmpty);
        this.validateFormController(this.regEmail, this.input__email, this.label__email, this.libErrorsText.emailFormat);
        this.validateFormController(this.regPhone, this.input__phone, this.label__phone, this.libErrorsText.phoneFormat);
    }

    validateFormSubmit() {
        this.form__input.forEach(item => {
            if (this.testForEmptiness(item.value.trim())) {
                this.arrErrors.push({
                    place: item.id,
                    textError: this.libErrorsText.emptyField + item.getAttribute('placeholder')
                });
                this.switchBtn(false);
                this.form__btn.textContent = 'Отправить сообщение';
            } else {
                this.form__btn.textContent = 'Отправлено!';
                this.switchBtn(false);
            }
            this.showErrors();
        })
    }

    deleteElArrErrors(el) {
        this.arrErrors.forEach((item, index, arr) => {
            if (item.place === el.id) {
                arr.splice(index, 1);
            }
        });
    }

    showErrors() {
        this.form__errors.forEach(item => item.innerHTML = '');
        if (this.arrErrors.length > 0) {
            this.arrErrors.forEach(item => {
                let ul = document.createElement('Ul');
                let li = document.createElement('LI');
                li.textContent = item.textError;
                ul.appendChild(li);
                let error_place = document.querySelector('#' + item.place).parentNode;
                error_place.querySelector('.form__errors').innerHTML = ul.innerHTML;
            })
        } else {
            this.form__errors.forEach(item => item.innerHTML = '');
        }
    }

    testForEmptiness(str) {
        return str.length === 0;
    }

    regexMatchCheck(reg, inp) {
        return reg.test(inp);
    }

    switchBtn(status) {
        status ? this.form__btn.disabled = false : this.form__btn.disabled = true;
    }
}

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
    };
    new ValidationForm(objForClassFromFooter);
})