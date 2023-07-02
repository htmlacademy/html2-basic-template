document.querySelector('body').classList.remove('nojs');

const mainNav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navToggle.addEventListener('click', () => {
  if (!mainNav.classList.contains('main-nav--opened')) {
    mainNav.classList.add('main-nav--opened');
  } else {
    mainNav.classList.remove('main-nav--opened');
  }
});

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    loop: true,
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.slider__arrow--left',
    prevEl: '.slider__arrow--right',
  },
});
