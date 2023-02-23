let navMain = document.querySelector('.header__nav');
let navToggle = document.querySelector('.header__button');

navMain.classList.remove('header__nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('header__nav--closed')) {
    navMain.classList.remove('header__nav--closed');
    navMain.classList.add('header__nav--opened');
  } else {
    navMain.classList.add('header__nav--closed');
    navMain.classList.remove('header__nav--opened');
  }
});

const swiper = new Swiper('.swiper', {
  loop: true,

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  });

  var map = L.map('map').setView([59.968302, 30.317429], 18);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/#map=18/59.96812/30.31687">OpenStreetMap</a>'
}).addTo(map);

var greenIcon = L.icon({
  iconUrl: '/img/Map-Pin.png',


  iconSize:     [38, 50],
  iconAnchor:   [22, 44]
});

var marker = L.marker([59.968302, 30.317428], {icon: greenIcon}).addTo(map);
