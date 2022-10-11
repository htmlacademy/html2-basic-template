const sliderElement = document.querySelector ('.price-slider');
const priceMin = document.querySelector ('#price-min');
const priceMax = document.querySelector ('#price-max');
const inputs = [priceMin, priceMax];

const formatForSlider = {
  from: function (formattedValue) {
    return Number (formattedValue);
  },
  to: function (numericValue) {
    return Math.round (numericValue);
  }
};

noUiSlider.create (sliderElement, {
  start: ['0', '900'],
  connect: true,
  format: formatForSlider,
  range: {
    'min': 0,
    'max': 1000
  },
});

sliderElement.noUiSlider.set(['0', '900']);

priceMin.addEventListener ('change', function () {
  sliderElement.noUiSlider.set ([this.value, null]);
});

priceMax.addEventListener ('change', function () {
  sliderElement.noUiSlider.set ([null, this.value]);
});

sliderElement.noUiSlider.on ('update', function (values, handle) {
  inputs[handle].value = values[handle];
});
