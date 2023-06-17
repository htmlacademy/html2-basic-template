const coffeeSwiper = new Swiper('.swiper', {
  direction: "horizontal",
  loop: !0,
  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev'
  },
  pagination: {
    el: '.swiper__pagination',
    clickable: true,
  }
});
