/* в этот файл добавляет скрипты*/
document.querySelector('body').classList.remove('nojs')
let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-nav__toggle');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


const swiper = new Swiper('.promo', {
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
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

const map = L.map('map').setView([59.968322, 30.317522], 18);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mapIcon = L.icon({
  iconUrl: './img/svg/map_pin.svg',
  iconSize: [38, 50],
  iconAnchor: [18, 50],
});

const marker = L.marker({
  lat: 59.968322,
  lng: 30.317522
}, {
  draggable: false,
  icon: mapIcon,
},
);
marker.addTo(map);
