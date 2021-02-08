/*jslint browser: true*/
/*global $, window,Typed*/
$(window).scroll(function () {
    "use strict";
    var top = $(window).scrollTop();
    if (top >= 60) {
        $(".nav").addClass("secondary");
    } else {
        $(".nav").removeClass("secondary");
    }
});

var typed = new Typed('.anitext', {
        strings: ['I Love <span class="primary">Coding!!</span>', 'And to <span class="primary">Share!!</span>'],
        typeSpeed: 60,
        backSpeed: 60,
        loop: true
    });