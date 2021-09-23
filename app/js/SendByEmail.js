class SendByEmail {

    constructor(obj) {
        this.arrInput = document.querySelectorAll(obj.arrInput)
        this.btnSend = document.querySelector(obj.btnSend)
        this.thanks_btn = document.querySelector(obj.thanks_btn)
        this.thanks_btn.addEventListener('click', this.hide_thanks_block.bind(this))
        this.block_thanks = obj.block_thanks
        this.btnSend.addEventListener('click', this.send_mail.bind(this))
    }

    send_mail(e) {
        e.preventDefault()
        let data = new FormData()
        for (let i = 0; i < this.arrInput.length; i++) {
            data.append(this.arrInput[i].getAttribute('name'), this.arrInput[i].value)
        }

        fetch('/wp-admin/admin-ajax.php?action=sendEmail',
            {
                method: 'POST',
                body: data,
            })
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject(response)
                } else {
                    return response
                }
            })
            .then(response => {
                if (response.status === 200) {
                    this.show_thanks_block()//.bind(this)
                }
                return response
            })
            .catch((response) => console.log(response))
    }

    show_thanks_block() {
        document.querySelector(this.block_thanks[0]).style.display = this.block_thanks[1]
    }

    // Возвращаем всё на место
    hide_thanks_block(e) {
        e ? e.preventDefault() : ''
        this.arrInput.forEach((item) => item.value = '')
        document.querySelector(this.block_thanks[0]).style.display = ''
    }
}

