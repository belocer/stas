/* Tiny Slider */
tns({
    "container": ".tns-sl",
    "rewind": true,
    "items": 3,
    "mouseDrag": true,
    "autoplay": true,
    "autoplayTimeout": 3000,
    "swipeAngle": true,
    "speed": 5000,
    "controls": false,
    "autoplayButton": false,
    "gutter": 10,
    "responsive": {
        "1100": {
            "items": 3
        },
        "895": {
            "items": 2
        },
        "400": {
            "items": 1
        },
        "300": {
            "items": 1
        }
    },
});