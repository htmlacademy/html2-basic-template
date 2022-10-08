const sliderElement = document.querySelector('.price__slider');
const priceMin = document.querySelector('#price-min');
const priceMax = document.querySelector('#price-max');

noUiSlider.create(sliderElement, {
  start: [0, 900],
  connect: true,
  range: {
    'min': 0,
    'max': 1000
  }
});

priceMin.addEventListener('change', function () {
  sliderElement.noUiSlider.set([this.value, null]);
});

priceMax.addEventListener('change', function () {
  sliderElement.noUiSlider.set([null, this.value]);
});
