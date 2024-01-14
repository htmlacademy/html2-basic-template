const toggleButtonElement = document.querySelector('.main-header__button');
const menuElement = document.querySelector('.main-header__nav');
const nojsElement = document.querySelector('.no-js');

nojsElement.classList.remove('no-js');

toggleButtonElement.addEventListener('click', function () {
  toggleButtonElement.classList.toggle('main-header__toggle-closed');
  menuElement.classList.toggle('main-nav__opened')
})
