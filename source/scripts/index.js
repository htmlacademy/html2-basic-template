/* Меню */
const toggleButtonElement = document.querySelector('.main-header__button');
const menuElement = document.querySelector('.main-header__nav');
const nojsElement = document.querySelector('.no-js');

nojsElement.classList.remove('no-js');

toggleButtonElement.addEventListener('click', function () {
  toggleButtonElement.classList.toggle('main-header__toggle-closed');
  menuElement.classList.toggle('main-nav__opened')
})

/* Карта */

ymaps.ready(init);
const geoObjects = [];
const marks = [
  {
    latitude: 59.913374,
    longitude: 30.331391,
    hintContent: '<div class="map__hint">Ягода</div>'
  }
]

let imageSource;

let mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (mobile) {
  imageSource = {
    src: '../../images/icons/stack.svg#map-pin',
    size: [15, 23],
    offset: [-7, -23]
  }
}else {
  imageSource = {
    src: '../img/icons/map-pin-desk.svg',
    size: [15, 23],
    offset: [-7, -23]
  }
};

function init(){
    // Создание карты.
    const myMap = new ymaps.Map("map", {
        center: [59.913374, 30.331391],
        zoom: 14
    });

    marks.forEach(function(mark, i){
      geoObjects.push(new ymaps.Placemark([mark.latitude, mark.longitude], {
        hintContent: mark.hintContent
      },
      {
        iconLayout: 'default#image',
        iconImageHref: imageSource.src,
        iconImageSize: imageSource.size,
        iconImageOffset: imageSource.offset
      }))
    })

    myMap.geoObjects.add(geoObjects[0])
  }

