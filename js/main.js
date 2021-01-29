/*jslint browser: true*/
/*global $, document, window,Typed*/
$(document).ready(function () {
    "use strict";
    $('.slider').ripples();
    
    $('.work').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    $('.owl-carousel').owlCarousel({
        items: 3,
        autoplay: true,
        loop: true,
        smartSpeed: 700,
        autoplayHoverPause: true
    });
    
});
var typed = new Typed('.anitext', {
        strings: ['I Love <span class="primary">Coding!!</span>', 'And to <span class="primary">Share!!</span>'],
        typeSpeed: 60,
        backSpeed: 60,
        loop: true
    });

var typed = new Typed('.conTextHeading', {
        strings: ['CONTACT US'],
        typeSpeed: 60,
        backSpeed: 60,
        loop: true
    });

$(window).scroll(function () {
    "use strict";
    var top = $(window).scrollTop();
    if (top >= 60) {
        $(".nav").addClass("secondary");
    } else {
        $(".nav").removeClass("secondary");
    }
});