/*
class ValidationForm {
    constructor() {
        this.debounceTimeOut = 0;
        this.form__name = document.getElementById('form__name');
        this.form__email = document.getElementById('form__email');
        this.form__phone = document.getElementById('form__phone');
        this.header__form = document.getElementById('header__form');

        this.label__name = document.querySelector('label[for="form__name"]');
        this.label__email = document.querySelector('label[for="form__email"]');
        this.label__phone = document.querySelector('label[for="form__phone"]');

        this.form__errors = document.querySelectorAll('.form__errors');

        this.form__input = this.header__form.querySelectorAll('.form__input')

        this.form__btn = document.querySelector('.form__btn');

        this.arrErrors = [];

// Регулярки для полей
        this.regPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/; // телефон
        this.regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email
        this.regName = /^[a-zA-Zа-яА-Я]+$/ui; // Имя

        this.libErrorsText = {
            phoneFormat: 'Указанный номер не соответствует формату!',
            phoneEmpty: 'Не заполнено поле, - номера телефона!',
            emailFormat: 'Указанный email не соответствует формату!',
            nameEmpty: 'Не верно заполнено поле, - Имя!',
            emptyField: 'Не заполнено поле, - ',
        }

        this.form__input.forEach(item => {
            item.addEventListener('input', (e) => {
                e.preventDefault()
                clearTimeout(this.debounceTimeOut)
                this.debounceTimeOut = setTimeout(this.validateForm, 500)
            })
        });

        this.header__form.addEventListener('submit', this.validateFormSubmit);
    }

    validateForm() {
        this.validateFormController(this.regPhone, this.form__phone, this.label__phone, this.libErrorsText.phoneFormat)
        this.validateFormController(this.regEmail, this.form__email, this.label__email, this.libErrorsText.emailFormat)
        this.validateFormController(this.regName, this.form__name, this.label__name, this.libErrorsText.nameEmpty)
    }

    validateFormSubmit(e) {
        e.preventDefault();
        this.form__input.forEach(item => {
            if (this.testForEmptiness(item.value)) {
                this.arrErrors.push({
                    place: item.id,
                    textError: this.libErrorsText.emptyField + item.getAttribute('placeholder')
                });
                this.switchBtn(false);
                this.form__btn.textContent = 'Жду звонка';
            } else {
                this.switchBtn(true);
                this.form__btn.textContent = 'Отправлено!';
            }
            this.showErrors();
        })
    }

    validateFormController(regularExpression, field, label, errorText) {
        if (!this.regexMatchCheck(regularExpression, field.value) && field.value.length > 2) {
            if (!this.arrErrors.find(item => item.place === field.id)) {
                this.arrErrors.push({place: field.id, textError: errorText})
            }
            this.showErrors();
            this.switchBtn(false);
        } else {
            this.switchBtn(true);
            this.deleteElArrErrors(field);
            this.showErrors();
        }
    }

    deleteElArrErrors(el) {
        this.arrErrors.forEach((item, index, arr) => {
            if (item.place === el.id) {
                arr.splice(index, 1)
            }
        })
    }

    showErrors() {
        if (this.arrErrors.length > 0) {
            this.arrErrors.forEach((item) => {
                let ul = document.createElement('Ul'), li = document.createElement('LI');
                li.textContent = item.textError;
                ul.appendChild(li);
                let error_place = document.querySelector('#' + item.place).parentNode;
                error_place.querySelector('.form__errors').innerHTML = ul.innerHTML;
            })
        } else {
            this.form__errors.forEach(item => item.innerHTML = '')
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
}*/
