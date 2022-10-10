const paganationElements = document.querySelectorAll ('.pagination-link');
const paginationPrevious = document.querySelector ('.pagination-prev');
const paginationNext = document.querySelector ('.pagination-next');

for (let i = 0; i < paganationElements.length; i++) {
  paganationElements[i].addEventListener ('click', (evt) => {
    evt.preventDefault ();
    for (let j = 0; j < paganationElements.length; j++) {
      paganationElements[j].classList.remove ('paganation-link--current');
    }
    paganationElements[i].classList.add ('paganation-link--current');
    if (paganationElements[i].innerHTML === '1') {
      paginationPrevious.classList.add ('paganation--hidden')
      paginationNext.classList.remove ('paganation--hidden')
    }
    if (paganationElements[i].innerHTML === '2') {
      paginationPrevious.classList.remove ('paganation--hidden')
      paginationNext.classList.remove ('paganation--hidden')
    }
    if (paganationElements[i].innerHTML === '3') {
      paginationNext.classList.add ('paganation--hidden')
      paginationPrevious.classList.remove ('paganation--hidden')
    }
  })
}

paginationPrevious.addEventListener ('click', (evt) => {
  evt.preventDefault ();
  for (let i = 0; i < paganationElements.length; i++) {
    if (paganationElements[i].innerHTML === '3' && paganationElements[i].classList.contains ('paganation-link--current')) {
      paganationElements[i - 1].classList.add ('paganation-link--current')
      paganationElements[i].classList.remove ('paganation-link--current');
      paginationNext.classList.remove ('paganation--hidden');
    }
    if (paganationElements[i].innerHTML === '2' && paganationElements[i].classList.contains ('paganation-link--current')) {
      paganationElements[i - 1].classList.add ('paganation-link--current')
      paganationElements[i].classList.remove ('paganation-link--current');
      paginationPrevious.classList.add ('paganation--hidden');
    }
  }
});

paginationNext.addEventListener ('click', (evt) => {
  evt.preventDefault ();
  for (let i = 0; i < paganationElements.length; i++) {
    if (paganationElements[i].innerHTML === '2' && paganationElements[i].classList.contains ('paganation-link--current')) {
      paganationElements[i].classList.remove ('paganation-link--current');
      paganationElements[i + 1].classList.add ('paganation-link--current')
      paginationNext.classList.add ('paganation--hidden');
    }
  }
  for (let i = 0; i < paganationElements.length; i++) {
    if (paganationElements[i].innerHTML === '1' && paganationElements[i].classList.contains ('paganation-link--current')) {
      paganationElements[i].classList.remove ('paganation-link--current');
      paganationElements[i + 1].classList.add ('paganation-link--current')
      paginationPrevious.classList.remove ('paganation--hidden');
    }
  }
  });
