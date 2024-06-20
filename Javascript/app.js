const swiper1 = new Swiper('.swiper1',  {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    breakpoints: {
      500:{
          slidesPerView:2,
      },
      768:{
          slidesPerView:3,
      },
      1250: {
          slidesPerView:4,
      },
  },
    centeredSlides: false,
    slidesOffsetAfter: 100,
    slidesOffsetbefore: 100,
    spaceBetween: 20,
    slidesPerGroup: 1,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },

  });
  
  const swiper2 = new Swiper('.swiper2',  {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    breakpoints: {
      500:{
          slidesPerView:2,
      },
      768:{
          slidesPerView:3,
      },
      1250: {
          slidesPerView:4,
      },
  },
    centeredSlides: false,
    slidesOffsetAfter: 100,
    slidesOffsetbefore: 100,
    spaceBetween: 20,
    slidesPerGroup: 1,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },

  });

  const swiper3 = new Swiper('.swiper3',  {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    breakpoints: {
      500:{
          slidesPerView:2,
      },
      768:{
          slidesPerView:3,
      },
      1250: {
          slidesPerView:4,
      },
  },
    centeredSlides: false,
    slidesOffsetAfter: 100,
    slidesOffsetbefore: 100,
    spaceBetween: 20,
    slidesPerGroup: 1,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },

  });