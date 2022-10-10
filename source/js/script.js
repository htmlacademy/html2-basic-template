// ========SWIPER========//

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// ========MENU========//

const navNoJs = document.querySelector(".main-nav");
const navMain = document.querySelector(".main-nav__list");
const navToggle = document.querySelector(".toggle-button");

const navMenu = document.querySelector(".main-nav__list");
const burger = document.querySelector(".main-nav__toggle");
const navCross = document.querySelector(".main-nav__cross");

const hideElement = (navMenu) => {
  navMenu.classList.add("hide");
};

const showElement = (navMenu) => {
  navMenu.classList.remove("hide");
  navCross.classList.remove("hide");
};

burger.addEventListener("click", () => {
  showElement(navMenu);
  hideElement(burger);
});

navCross.addEventListener("click", () => {
  hideElement(navMenu);
  showElement(burger);
});

hideElement(navMenu);
showElement(burger);

// ========MAP========//

var mapOptions = {
  center: [59.968263982080266, 30.316556371903854],
  zoom: 20,
};

var map = new L.map("map", mapOptions);
var layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);
map.addLayer(layer);

var marker;

var pinIcon = L.icon({
  iconUrl: "../img/map-pin.svg",
  iconSize: [38, 50], // size of the icon
  iconAnchor: [22, 0], // point of the icon which will correspond to marker's location
});

L.marker([59.968263982080266, 30.316556371903854], { icon: pinIcon }).addTo(
  map
);
