const initializedTextAreas = [];
let isResizeEventSet = false;

const getHeightWithoutBorder = (el) => {
  let realScrollHeight = el.scrollHeight;

  if (!el.value) {
    el.value = 0;
    realScrollHeight = el.scrollHeight;
    el.value = '';
  }

  return realScrollHeight + el.offsetHeight - el.clientHeight;
};

const resizeHeight = (el) => {
  el.style.height = 'auto';
  el.style.height = `${getHeightWithoutBorder(el)}px`;
};

const initAutoResizeTextarea = () => {
  const textAreas = document.querySelectorAll('.auto-resize-textarea textarea:not(.is-initialized)');

  if (!textAreas.length) {
    return;
  }

  textAreas.forEach((el) => {
    initializedTextAreas.push(el);
    el.classList.add('is-initialized');
    el.style.overflow = 'hidden';
    el.style.resize = 'none';
    resizeHeight(el);

    el.addEventListener('input', () => {
      resizeHeight(el);
    });

    const form = el.closest('form');

    if (form) {
      form.addEventListener('submit', () => {
        resizeHeight(el);
      });
    }
  });

  if (!isResizeEventSet) {
    isResizeEventSet = true;
    window.addEventListener('resize', () => {
      initializedTextAreas.forEach((el) => {
        resizeHeight(el);
      });
    });
  }
};

window.initAutoResizeTextarea = initAutoResizeTextarea;

export {initAutoResizeTextarea, resizeHeight};
