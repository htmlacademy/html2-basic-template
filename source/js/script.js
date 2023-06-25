let navHeader = document.querySelector('.header-nav');
let navToggle = document.querySelector('.header-nav__toggle');

navHeader.classList.remove('header-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navHeader.classList.contains('header-nav--closed')) {
    navHeader.classList.remove('header-nav--closed');
    navHeader.classList.add('header-nav--opened');
  } else {
    navHeader.classList.add('header-nav--closed');
    navHeader.classList.remove('header-nav--opened');
  }
});
