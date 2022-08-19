const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 10,
    init: true,
  
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  
  
    breakpoints: {
        620: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        680: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        920: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1240: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }
  
  });