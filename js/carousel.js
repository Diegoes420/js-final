// Carrousel

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        nav: true,
        navText: ["<i class='fas fa-chevron-left f-color-l'></i>","<i class='fas fa-chevron-right f-color-r'></i>"],
        slideBy: 1,
        items:4,
        dots: false,
        margin:10,
        autoplay: true,
        autoplayTimeout:2500,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            775: {
                items: 2
            },
            1200: {
                items: 3
            },
            1400: {
                items: 4
            }
        },
    });
});
