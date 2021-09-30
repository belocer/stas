class ScrollAnimation {
    constructor(obj) {
        this.blockInWich = document.querySelector(obj.blockInWich).offsetTop;
        this.listAnimateElement = document.querySelectorAll(obj.listAnimateElement);
        this.animationClassCSS = obj.animationClassCSS;
        this.addingSpeed = obj.addingSpeed || 50;
        this.distanceToElement = obj.distanceToElement || 1000;
        this.windowInnerHeight = window.innerHeight / 2
        this.varDebounce = 0;
        this.topScroll = 0;

        window.addEventListener('scroll', (e) => {
            clearTimeout(this.varDebounce);
            this.varDebounce = setTimeout(this.startAnimate.bind(this), 150);
            this.topScroll = window.pageYOffset;
            /* Подбор высоты срабатывания анимации в блоке по скроллу
            console.log('-------------------------');
            console.log(this.topScroll);
            console.log(this.blockInWich);*/
        })
    }

    startAnimate() {
        if (this.topScroll > (this.blockInWich - this.distanceToElement)) {
            let i = this.addingSpeed;
            this.listAnimateElement.forEach(item => {
                i += this.addingSpeed;
                setTimeout(() => item.classList.remove(this.animationClassCSS), i);
            });
        }

        if (this.topScroll > (this.blockInWich + this.distanceToElement) || this.topScroll < (this.blockInWich - this.distanceToElement)) {
            let i = this.addingSpeed;
            this.listAnimateElement.forEach(item => {
                i += this.addingSpeed;
                setTimeout(() => item.classList.add(this.animationClassCSS), i);
            });
        }
    }
}