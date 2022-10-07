const swiper = new Swiper (".swiper", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const map = L.map('map-canvas',
  {
    center: [59.968562, 30.3169523],
    zoom: 13
  });
