window.addEventListener('load', () => {

    let form__name = document.getElementById('form__name');
    let form__email = document.getElementById('form__email');
    let form__phone = document.getElementById('form__phone');
    let header__form = document.getElementById('header__form');

    let label__name = document.querySelector('label[for="form__name"]');
    let label__email = document.querySelector('label[for="form__email"]');
    let label__phone = document.querySelector('label[for="form__phone"]');

    let form__btn = document.querySelector('.form__btn');

    let arrErrors = [];

// Регулярки для полей
    let regPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/; // телефон
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email

    header__form.querySelectorAll('.form__input').forEach(item => item.addEventListener('input', validateForm));

    function validateForm(e) {
        e.preventDefault()
        if (!regexMatchCheck(regPhone, form__phone.value)) {
            if (!arrErrors.find(item => item.place === 'form__phone')) {
                arrErrors.push({place: 'form__phone', textError: 'Телефон - Не соответствует!'})
            }
            showErrors(label__phone.querySelector('.form__errors'));
            switchBtn(false);
        } else {
            switchBtn(true);
            deleteElArrErrors(form__phone)
            showErrors(label__phone.querySelector('.form__errors'));
        }
    }

    function deleteElArrErrors(el) {
        arrErrors.forEach((item, index, arrErrors) => {
            if (item.place === el.id) {
                arrErrors.splice(index, 1)
            }
        })
    }

    function showErrors(label) {
        if (arrErrors.length > 0) {
            arrErrors.forEach(item => {
                let ul = document.createElement('Ul');
                let li = document.createElement('LI');
                li.textContent = item.textError;
                ul.appendChild(li);
                label.innerHTML = ul.innerHTML;
            })
        } else {
            label.innerHTML = ''
        }
    }

    function testForEmptiness(str) {
        return str.length !== 0;
    }

    function checkForLength(str) {
        return str.length;
    }

    function regexMatchCheck(reg, inp) {
        return reg.test(inp);
    }

    function switchBtn(status) {
        status ? form__btn.disabled = false : form__btn.disabled = true;
    }
})

/***
 * Проверить на -
 * пустоту
 * длинну
 * регулярку
 * вывести оповещение
 * блокировать и разблокировать кнопку
 * валидацию в html
 * ***/