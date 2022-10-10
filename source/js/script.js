const swiper = new Swiper (".swiper", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
});

const map = L.map ('map-canvas').setView ({
  lat: 59.968288,
  lng: 30.317421,
}, 17);

const mapMainPin = L.icon (
  {
    iconUrl: 'img/map_pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  }
);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarker = L.marker (
  {
    lat: 59.968288,
    lng: 30.317421,
  },
  {
    draggable: false,
    icon: mapMainPin,
  },
);


mainMarker.addTo (map);
