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

})

