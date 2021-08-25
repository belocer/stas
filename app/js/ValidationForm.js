class ValidationForm {
    constructor(formData) {
        this.debounceTimeOut = 0;
        this.arrErrors = [];
        this.input__name = formData.input__name;
        this.input__email = formData.input__email;
        this.input__phone = formData.input__phone;
        this.formTag = formData.formTag;
        this.label__name = formData.label__name;
        this.label__email = formData.label__email;
        this.label__phone = formData.label__phone;
        this.form__errors = this.formTag.querySelectorAll('.form__errors');
        this.form__input = this.formTag.querySelectorAll('.form__input');
        this.form__btn = formData.form__btn;
        this.buttonTextSend = formData.buttonTextSend || 'Отправить сообщение';
        this.buttonTextSent = formData.buttonTextSent || 'Отправлено';

        this.regPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/; // телефон
        this.regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email
        this.regName = /^[a-zA-Zа-яА-Яё ,.'-]+$/i; // Имя
        this.libErrorsText = {
            phoneFormat: 'Указанный номер не соответствует формату!',
            phoneEmpty: 'Не заполнено поле, - номера телефона!',
            emailFormat: 'Указанный email не соответствует формату!',
            nameEmpty: 'Не верно заполнено поле, - Имя!',
            emptyField: 'Не заполнено поле, - ',
        };

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
            this.form__btn.textContent = this.buttonTextSend;
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
                this.form__btn.textContent = this.buttonTextSend;
            } else {
                this.form__btn.textContent = this.buttonTextSent;
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

//     let debounceTimeOut // Переменная для Debounce
//
//     let form__name = document.getElementById('form__name');
//     let form__email = document.getElementById('form__email');
//     let form__phone = document.getElementById('form__phone');
//     let header__form = document.getElementById('header__form');
//
//     let label__name = document.querySelector('label[for="form__name"]');
//     let label__email = document.querySelector('label[for="form__email"]');
//     let label__phone = document.querySelector('label[for="form__phone"]');
//
//     let form__errors = document.querySelectorAll('.form__errors');
//
//     let form__input = header__form.querySelectorAll('.form__input')
//
//     let form__btn = document.querySelector('.form__btn');
//
//     let arrErrors = [];
//
// // Регулярки для полей
//     let regPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/; // телефон
//     let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email
//     let regName = /^[a-zA-Zа-яА-Я]+$/ui; // Имя
//
//     let libErrorsText = {
//         phoneFormat: 'Указанный номер не соответствует формату!',
//         phoneEmpty: 'Не заполнено поле, - номера телефона!',
//         emailFormat: 'Указанный email не соответствует формату!',
//         nameEmpty: 'Не верно заполнено поле, - Имя!',
//         emptyField: 'Не заполнено поле, - ',
//     }
//
//     form__input.forEach(item => {
//         item.addEventListener('input', (e) => {
//             e.preventDefault()
//             clearTimeout(debounceTimeOut)
//             debounceTimeOut = setTimeout(validateForm, 500)
//         })
//     });
//
//     function validateForm() {
//         validateFormController(regPhone, form__phone, label__phone, libErrorsText.phoneFormat)
//         validateFormController(regEmail, form__email, label__email, libErrorsText.emailFormat)
//         validateFormController(regName, form__name, label__name, libErrorsText.nameEmpty)
//     }
//
//     header__form.addEventListener('submit', validateFormSubmit);
//
//     function validateFormSubmit(e) {
//         e.preventDefault();
//         form__input.forEach(item => {
//             if (testForEmptiness(item.value)) {
//                 arrErrors.push({
//                     place: item.id,
//                     textError: libErrorsText.emptyField + item.getAttribute('placeholder')
//                 });
//                 switchBtn(false);
//                 form__btn.textContent = 'Жду звонка';
//             } else {
//                 switchBtn(true);
//                 form__btn.textContent = 'Отправлено!';
//             }
//             showErrors();
//         })
//     }
//
//     function validateFormController(regularExpression, field, label, errorsText) {
//         if (!regexMatchCheck(regularExpression, field.value) && field.value.length > 2) {
//             if (!arrErrors.find(item => item.place === field.id)) {
//                 arrErrors.push({place: field.id, textError: errorsText})
//             }
//             showErrors();
//             switchBtn(false);
//         } else {
//             switchBtn(true);
//             deleteElArrErrors(field);
//             showErrors();
//         }
//     }
//
//     function deleteElArrErrors(el) {
//         arrErrors.forEach((item, index, arrErrors) => {
//             if (item.place === el.id) {
//                 arrErrors.splice(index, 1)
//             }
//         })
//     }
//
//     function showErrors() {
//         if (arrErrors.length > 0) {
//             arrErrors.forEach(item => {
//                 let ul = document.createElement('Ul');
//                 let li = document.createElement('LI');
//                 li.textContent = item.textError;
//                 ul.appendChild(li);
//                 let error_place = document.querySelector('#' + item.place).parentNode;
//                 error_place.querySelector('.form__errors').innerHTML = ul.innerHTML;
//             })
//         } else {
//             form__errors.forEach(item => item.innerHTML = '')
//         }
//     }
//
//     function testForEmptiness(str) {
//         return str.length === 0;
//     }
//
//     function regexMatchCheck(reg, inp) {
//         return reg.test(inp);
//     }
//
//     function switchBtn(status) {
//         status ? form__btn.disabled = false : form__btn.disabled = true;
//     }