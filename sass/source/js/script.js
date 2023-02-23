// Nav

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

// Swiper

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

// Map

let mapImage = document.querySelector('.map__location');

mapImage.classList.remove('map__nojs');

const map = L.map('map').setView([59.968276, 30.317405], 20);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const mapPinIcon = L.icon({
  iconUrl: './img/icons/stack.svg#map-pin',
  iconSize: [38, 50],
  iconAnchor: [38, 20],
});

const marker = L.marker(
  {
    lat: 59.968276,
    lng: 30.317405,
  },
  {
    icon: mapPinIcon,
  }
);

marker.addTo(map);

map.on('click', function() {
  if (!map.scrollWheelZoom.enabled()) {
    map.scrollWheelZoom.enable();
  }
});
map.on('mouseout', function() {
  map.scrollWheelZoom.disable();
});
