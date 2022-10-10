const navSite = document.querySelector ('.header__site-nav');
const navToggle = document.querySelector ('.header__toggle');
const navWrapper = document.querySelector ('.header__wrapper');

navSite.classList.remove('header__site-nav--nojs');
navToggle.classList.remove('header__toggle--nojs');
navWrapper.classList.remove('header__wrapper--nojs');

navSite.classList.add('header__site-nav--closed');
navToggle.classList.add('header__toggle--closed');

navToggle.addEventListener('click', function () {

  if (navSite.classList.contains('header__site-nav--closed')) {
    navSite.classList.remove('header__site-nav--closed');
    navSite.classList.add('header__site-nav--open');
  } else {
    navSite.classList.add('header__site-nav--closed');
    navSite.classList.remove('header__site-nav--open');
  }

  if (navToggle.classList.contains('header__toggle--closed')) {
    navToggle.classList.remove('header__toggle--closed');
    navToggle.classList.add('header__toggle--open');
  } else {
    navToggle.classList.add('header__toggle--closed');
    navToggle.classList.remove('header__toggle--open');
  }
});
