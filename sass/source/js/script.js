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
