import {applyEffect, hasNoEffect} from './effects.js';

const slider = document.querySelector('.effect-level__slider');

const setup = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower'
  });

  slider.noUiSlider.on('update', () => {
    if (hasNoEffect()) {
      return;
    }
    applyEffect(slider.noUiSlider.get());
  });
};

const update = (filter) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: filter.min,
      max: filter.max
    },
    step: filter.step
  });
  slider.noUiSlider.set(filter.max);
};

const reset = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100
    },
    step: 1
  });
  slider.noUiSlider.set(100);
};

export {
  reset as resetSlider,
  setup as setupSlider,
  update as updateSlider,
};
