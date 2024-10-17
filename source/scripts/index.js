/* в этот файл добавляет скрипты*/
const header = document.querySelector('.header');
const headerToggle = document.querySelector('.js-toggle-button');

header.classList.remove('header--nojs');

headerToggle.addEventListener('click', function () {
  if (header.classList.contains('header--closed')) {
    header.classList.remove('header--closed');
    header.classList.add('header--opened');
  } else {
    header.classList.add('header--closed');
    header.classList.remove('header--opened');
  }
});
