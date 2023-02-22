let navMenu = document.querySelector('.menu-nav');
let navToggle = document.querySelector('.menu-nav__toggle');

navMenu.classList.remove('menu-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMenu.classList.contains('menu-nav--closed')) {
    navMenu.classList.remove('menu-nav--closed');
    navMenu.classList.add('menu-nav--opened');
  } else {
    navMenu.classList.add('menu-nav--closed');
    navMenu.classList.remove('menu-nav--opened');
  }
});

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  });
