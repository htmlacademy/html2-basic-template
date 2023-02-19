/* в этот файл добавляет скрипты*/

// Map script with Leaflet
const map = L.map("map-canvas")
  .setView({
    lat: 59.96831,
    lng: 30.31748,
  }, 18);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: "/../img/icons/stack.svg#map-marker",
  iconSize: [38, 50],
  iconAnchor: [19, 50],
});

const mainPinMarker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});


// Slider script with swiper.js
const swiper = new Swiper(".swiper", {
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});

// Select
const customSelect = document.querySelector(".select__wrapper");
const select = customSelect.querySelector("select");
const selectDropdown = document.createElement("DIV");
selectDropdown.classList.add("select__dropdown");
selectDropdown.textContent = select.options[select.selectedIndex].textContent;
customSelect.appendChild(selectDropdown);

// div for options list
const optionsList = document.createElement("UL");
optionsList.classList.add("select__list", "select__list--hide");

for (let i = 0; i < select.length; i++) {
  const option = document.createElement("LI");
  option.classList.add("select__item");
  option.textContent = select.options[i].textContent;


  option.addEventListener("click", () => {
    select.selectedIndex = i;
    selectDropdown.textContent = option.textContent;
    optionsList.querySelector(".select__item--active").classList.remove("select__item--active");
    option.classList.add("select__item--active");
    selectDropdown.classList.toggle("select__dropdown--active");
    optionsList.classList.toggle("select__list--hide");
  });

  optionsList.appendChild(option);
  customSelect.appendChild(optionsList);
};

const optionActive = optionsList.firstChild;
optionActive.classList.add("select__item--active");

selectDropdown.addEventListener("click", () => {
  selectDropdown.classList.toggle("select__dropdown--active");
  optionsList.classList.toggle("select__list--hide");
})

// Header navigation
const header = document.querySelector(".header");
const navToggle = document.querySelector(".nav__toggle");
const navWrapper = document.querySelector(".nav__wrapper");
const links = document.querySelectorAll(".site-list__link");

header.classList.remove("header--nojs");
navToggle.classList.remove("nav__toggle--hidden");
navWrapper.classList.remove("nav__wrapper--nojs");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("nav__toggle--open");
  navWrapper.classList.toggle("nav__wrapper--open");
})

links.forEach(element => {
  element.addEventListener("click", () => {
    navToggle.classList.toggle("nav__toggle--open");
    navWrapper.classList.toggle("nav__wrapper--open");
  });
});
