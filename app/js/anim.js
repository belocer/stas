window.addEventListener('load', () => {
    /* Анимация глаза */

    document.addEventListener('mousemove', move_eye)

    let scr_w = document.documentElement.clientWidth
    let scr_h = document.documentElement.clientHeight

    function move_eye(e) {

        let x1 = scr_w / 3
        let x2 = (scr_w / 3) * 2 + 200
        let y1 = scr_h / 3
        let y2 = (scr_h / 3) * 2 + 200

        if (document.getElementById('pupil')) {
            let pupil = document.getElementById('pupil')
            pupil.style.transition = `all .2s`

            let dot = document.getElementById('dot')
            dot.style.transition = `all .2s`

            if (e.clientX < x1 && e.clientY < y1) {
                pupil.style.transform = `translate(-9px, -11px)`
                dot.style.top = '3px'
                dot.style.left = '4px'
            } else if (e.clientX > x1 && e.clientX < x2 && e.clientY < y1) {
                pupil.style.transform = `translate(1px, -14px)`
                dot.style.top = '3px'
                dot.style.left = '7px'
            } else if (e.clientX > x2 && e.clientY < y1) {
                pupil.style.transform = `translate(8px, -12px)`
                dot.style.top = '3px'
                dot.style.left = '11px'
            } else if (e.clientX < x1 && e.clientY > y1 && e.clientY < y2) {
                pupil.style.transform = `translate(-12px, -8px)`
                dot.style.top = '7px'
                dot.style.left = '3px'
            } else if (e.clientX > x1 && e.clientX < x2 && e.clientY > y1 && e.clientY < y2) {
                pupil.style.transform = `translate(0px, -9px)`
                dot.style.top = '7px'
                dot.style.left = '7px'
            } else if (e.clientX > x2 && e.clientY < y2 && e.clientY > y1) {
                pupil.style.transform = `translate(13px, -9px)`
                dot.style.top = '7px'
                dot.style.left = '11px'
            } else if (e.clientX < x1 && e.clientY > y2) {
                pupil.style.transform = `translate(-9px, -4px)`
                dot.style.top = '11px'
                dot.style.left = '3px'
            } else if (e.clientX > x1 && e.clientX < x2 && e.clientY > y2) {
                pupil.style.transform = `translate(1px, -4px)`
                dot.style.top = '12px'
                dot.style.left = '8px'
            } else if (e.clientX > x2 && e.clientY > y2) {
                pupil.style.transform = `translate(8px, -5px)`
                dot.style.top = '11px'
                dot.style.left = '11px'
            }
        }
    }

    /* Анимация блока с изображением 3D */
    let varDebounce = 0;
    let card = document.querySelector('.wrap-for-animation');
    let anim1 = document.querySelector('.anim1-element');
    let anim2 = document.querySelector('.anim2-element');
    let anim3 = document.querySelector('.anim3-element');
    let anim4 = document.querySelector('.anim4-element')
    let arr_element = [anim1, anim2, anim3, anim4];
    card.addEventListener('mousemove', (e) => {
        clearTimeout(varDebounce);
        varDebounce = setTimeout(() => {
            let rect = e.target.getBoundingClientRect();
            let x = 100 * e.offsetX / rect.width;
            let y = 100 * e.offsetY / rect.height;

            returnToPlace()

            if (x < 50 && y < 50) {
                card.style.transform = `perspective(1200px) rotateY(-15deg) rotateX(15deg)`
                anim1.style.transform = `perspective(1200px) translateZ(200px) rotate(266deg) translateX(5px) translateY(5px)`
                anim1.style.filter = `grayscale(0%)`
            } else if (x > 50 && y < 50) {
                card.style.transform = `perspective(1200px) rotateY(15deg) rotateX(15deg)`
                anim2.style.transform = `perspective(1200px) translateZ(200px) translateX(10px) translateY(10px) rotate(226deg) translate(27px, -25px)`
                anim2.style.filter = `grayscale(0%)`
            } else if (x < 50 && y > 50) {
                card.style.transform = `perspective(1200px) rotateY(-15deg) rotateX(-15deg)`
                anim4.style.transform = `perspective(1200px) translateZ(200px) translateX(10px) translateY(10px)`
                anim4.style.filter = `grayscale(0%)`
            } else if (x > 50 && y > 50) {
                card.style.transform = `perspective(1200px) rotateY(15deg) rotateX(-15deg)`
                anim3.style.transform = `perspective(1200px) translateZ(200px) translateX(10px) translateY(10px)`
                anim3.style.filter = `grayscale(0%)`
            }
        }, 10);
    });

    card.addEventListener('mouseleave', (e) => {
        setTimeout(() => {
            card.removeAttribute('style')
            returnToPlace();
        }, 150)
    })

    card.addEventListener('mouseout', (e) => {
        setTimeout(() => {
            card.removeAttribute('style')
            returnToPlace();
        }, 150)
    })

    function returnToPlace() {
        arr_element.forEach(item => item.removeAttribute('style'))
    }
})

