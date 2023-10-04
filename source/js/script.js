/* в этот файл добавляет скрипты*/

let mainHeader = document.querySelector('.main-header');
let headerToggle = document.querySelector('.main-header__toggle');

const rangeInput = document.querySelectorAll(".slider__range input"),
  priceInput = document.querySelectorAll(".slider__price-input input"),
  progress = document.querySelector(".slider__progress");
let priceGap = 50;

const sliderWrapper = document.querySelector('.slider__wrapper');
const sliderInputs = sliderWrapper.querySelectorAll('input');

const slider = document.querySelector('.slider-image__list');
const prevButton = document.querySelector('.slider-image__prev-button');
const nextButton = document.querySelector('.slider-image__next-button');
const slides = Array.from(slider.querySelectorAll('.slider-image__item'));
const slideCount = slides.length;
let slideIndex = 0;

/** Map*/

var myMap = L.map('mapid').setView([59.968299174485075,30.31739014040852], 19);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var markerIcon = L.icon({
    iconUrl: 'images/icons/stack.svg#map-icon',
    iconSize: [38, 50],
    iconAnchor: [30, 50]
  });

var marker = L.marker([59.968299174485075,30.31739014040852], {icon: markerIcon}).addTo(myMap);

/** Menu mobile*/

mainHeader.classList.remove('main-header--nojs');

headerToggle.addEventListener('click', function () {
  if (mainHeader.classList.contains('main-header--closed')) {
    mainHeader.classList.remove('main-header--closed');
    mainHeader.classList.add('main-header--opened');
  } else {
    mainHeader.classList.add('main-header--closed');
    mainHeader.classList.remove('main-header--opened');
  }
});

/** Slider*/

document.addEventListener("DOMContentLoaded", () => {

  rangeInput[0].value = 0;
  rangeInput[1].value = 1000;

  updatePriceInput();
  updateProgress();
});

priceInput.forEach((input) => {
  input.addEventListener("input", e => {
    let minVal = parseInt(priceInput[0].value),
      maxVal = parseInt(priceInput[1].value);
    if ((maxVal - minVal >= priceGap) && maxVal <= 1000) {
      rangeInput[0].value = minVal;
      rangeInput[1].value = maxVal;
      updateProgress();
    }
  });
});

rangeInput.forEach((input, index) => {
  input.addEventListener("input", e => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "slider__range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    }
    updateProgress();
    updatePriceInput();
  });
});

function updateProgress() {
  let minVal = parseInt(rangeInput[0].value),
    maxVal = parseInt(rangeInput[1].value);

  progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
  progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
}

function updatePriceInput() {
  let minVal = parseInt(rangeInput[0].value),
    maxVal = parseInt(rangeInput[1].value);

  priceInput[0].value = minVal;
  priceInput[1].value = maxVal;
}

// Для disabled slider (add: .slider__wrapper--disabled)

if (sliderWrapper.classList.contains('slider__wrapper--disabled')) {
  sliderInputs.forEach(input => {
    input.disabled = true;
  });
}

/** Swiper */
nextButton.addEventListener('click', () => {
  updateActiveSlide();
  slideIndex++;
  slide();
});

prevButton.addEventListener('click', () => {
  updateActiveSlide();
  slideIndex--;
  slide();
});

const updateActiveSlide = () => {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.classList.add('slider-image__item--active');
    } else {
      slide.classList.remove('slider-image__item--active');
    }
  });
};

const slide = () => {
  slider.style.transform = `translateX(-${slideIndex * imageWidth}px)`;
}

window.addEventListener('load', () => {
  slide();
  updateActiveSlide();
});
