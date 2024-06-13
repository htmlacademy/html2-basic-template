/* в этот файл добавляет скрипты*/

const nav = document.querySelector('.nav');
const navToggle = nav.querySelector('.nav__button');
const siteList = nav.querySelector('.site-list');

navToggle.addEventListener('click', () => {
  if (siteList.classList.contains('site-list--opened')) {
    siteList.classList.remove('site-list--opened');
    siteList.classList.add('site-list--closed');
    navToggle.classList.remove('nav__button--opened');
    navToggle.classList.add('nav__button--closed');
  } else {
    siteList.classList.remove('site-list--closed');
    siteList.classList.add('site-list--opened');
    navToggle.classList.add('nav__button--opened');
    navToggle.classList.remove('nav__button--closed');
  }
});
