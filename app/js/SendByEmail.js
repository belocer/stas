class SendByEmail {

    constructor(obj) {
        this.arrInput = document.querySelectorAll(obj.arrInput)
        this.btnSend = document.querySelector(obj.btnSend)
        this.close_block_btn = document.querySelectorAll(obj.close_block_btn)
        this.text_error = document.querySelector(obj.text_error)
        this.close_block_btn[0].addEventListener('click', this.hide_block.bind(this))
        this.close_block_btn[1].addEventListener('click', this.hide_block.bind(this))
        this.block_thanks = document.querySelector(obj.block_thanks)
        this.block_error = document.querySelector(obj.block_error)
        this.loading_block = document.querySelector(obj.loading_block)
        this.btnSend.addEventListener('click', this.send_mail.bind(this))
    }

    send_mail(e) {
        e.preventDefault();
        this.loading_block.style.display = 'block';
        let data = new FormData();
        for (let i = 0; i < this.arrInput.length; i++) {
            data.append(this.arrInput[i].getAttribute('name'), this.arrInput[i].value)
        }

        fetch('/wp-admin/admin-ajax.php?action=sendEmail'/*'http://testajax/test.php'*/,
            {
                method: 'POST',
                body: data,
            })
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject(response);
                } else {
                    return response.json();
                }
            }, response => {
                this.text_error.textContent = response.error;
                console.log(response);
            })
            .then(response => {
                if (!response.res) {
                    this.show_result_block(this.block_error);
                } else {
                    this.show_result_block(this.block_thanks);
                }

                if (response.error.length > 0) {
                    this.text_error.textContent = `-"${response.error}"`;
                } else {
                    this.text_error.textContent = '';
                }

                return response;
            }, response => {
                this.text_error.textContent = response.error;
                console.log(response);
            })
            .catch(error => {
                this.show_result_block(this.block_error);
                this.text_error.textContent = error;
                console.log(error);
            })
    }

    show_result_block(block) {
        this.loading_block.style.display = '';
        block.style.display = 'block';
    }

    // Возвращаем всё на место
    hide_block(e) {
        e ? e.preventDefault() : ''
        this.arrInput.forEach((item) => item.value = '')
        this.block_thanks.style.display = ''
        this.block_error.style.display = ''
    }
}

