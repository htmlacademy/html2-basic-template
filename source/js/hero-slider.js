const sliderImages = document.querySelectorAll('.slider__item'),
    sliderLine = document.querySelector('.slider__list'),
    sliderBullet = document.querySelectorAll('.slider__button'),
    sliderBulletSpan = document.querySelectorAll('.slider__button-bullet'),
    sliderBtnNext = document.querySelector('.slider__arrow-right'),
    sliderBtnPrev = document.querySelector('.slider__arrow-left');

    let sliderCount = 0,
    sliderWidth;

    sliderBtnNext.addEventListener('click', nextSlide);
    sliderBtnPrev.addEventListener('click', prevSlide);

window.addEventListener('resize', showSlide);

function showSlide() {
    sliderWidth = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
    sliderImages.forEach(item => item.style.width = sliderWidth + 'px');

    rollSlider();
}
showSlide();

function nextSlide() {
    sliderBtnPrev.disabled = false;
    sliderCount++;
    if(sliderCount >= sliderImages.length-1) sliderBtnNext.disabled = true;

    rollSlider();
    thisSlide(sliderCount);
    }


function prevSlide() {
    sliderBtnNext.disabled = false;
    sliderCount--;
    if(sliderCount <= 0) sliderBtnPrev.disabled = true;

    rollSlider();
    thisSlide(sliderCount);
}


function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

    function thisSlide(index) {
      sliderBullet.forEach(item => item.classList.remove('slider__button--active'));
      sliderBulletSpan.forEach(item => item.classList.remove('slider__button-bullet--active'));
      sliderBullet[index].classList.add('slider__button--active');
      sliderBulletSpan[index].classList.add('slider__button-bullet--active');
  }



  sliderBullet.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          sliderCount = index;
          rollSlider();
          thisSlide(sliderCount);
      })
  })
