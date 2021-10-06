/* Анимация блока с изображением 3D */
class Card3D {
    constructor(obj) {
        this.varDebounce = 0;
        this.card = document.querySelector(obj.card);
        this.anim1 = document.querySelector(obj.anim1);
        this.anim2 = document.querySelector(obj.anim2);
        this.anim3 = document.querySelector(obj.anim3);
        this.anim4 = document.querySelector(obj.anim4);
        this.arr_element = [this.anim1, this.anim2, this.anim3, this.anim4];

        this.card.addEventListener('mousemove', this.mainAnimate.bind(this));

        this.card.addEventListener('mouseleave', (e) => {
            setTimeout(() => {
                this.card.removeAttribute('style');
                this.returnToPlace();
            }, 150)
        })

        this.card.addEventListener('mouseout', (e) => {
            setTimeout(() => {
                this.card.removeAttribute('style');
                this.returnToPlace();
            }, 150)
        })
    }

    mainAnimate(e) {
        clearTimeout(this.varDebounce);
        this.varDebounce = setTimeout(() => {
            let rect = e.target.getBoundingClientRect();
            let offset_x = e.offsetX || e.layerX
            let offset_y = e.offsetY || e.layerY
            let x = 100 * offset_x / rect.width;
            let y = 100 * offset_y / rect.height;

            this.returnToPlace();

            if (x < 50 && y < 50) {
                this.card.style.transform = `perspective(1200px) rotateY(-15deg) rotateX(15deg)`;
                this.anim1.style.transform = `perspective(1200px) translateZ(250px) rotate(266deg) translateX(10px) translateY(5px)`;
                this.anim1.style.filter = `grayscale(0%)`;
            } else if (x > 50 && y < 50) {
                this.card.style.transform = `perspective(1200px) rotateY(15deg) rotateX(15deg)`;
                this.anim2.style.transform = `perspective(1200px) translateZ(350px) translateX(15px) translateY(15px) rotate(226deg) translate(27px, -25px)`;
                this.anim2.style.filter = `grayscale(0%)`;
            } else if (x < 50 && y > 50) {
                this.card.style.transform = `perspective(1200px) rotateY(-15deg) rotateX(-15deg)`;
                this.anim4.style.transform = `perspective(1200px) translateZ(350px) translateX(15px) translateY(10px)`;
                this.anim4.style.filter = `grayscale(0%)`;
            } else if (x > 50 && y > 50) {
                this.card.style.transform = `perspective(1200px) rotateY(15deg) rotateX(-15deg)`;
                this.anim3.style.transform = `perspective(1200px) translateZ(450px) translateX(15px) translateY(10px)`;
                this.anim3.style.filter = `grayscale(0%)`;
            }
        }, 10);
    }

    returnToPlace() {
        this.arr_element.forEach(item => item.removeAttribute('style'));
    }
}