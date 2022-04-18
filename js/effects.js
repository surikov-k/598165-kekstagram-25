import {toggleVisibility} from './utils.js';
import {resetSlider, setupSlider, updateSlider} from './slider.js';

const EFFECT_NONE = 'none';
const EFFECT_CHROME = 'chrome';
const EFFECT_SEPIA = 'sepia';
const EFFECT_MARVIN = 'marvin';
const EFFECT_PHOBOS = 'phobos';
const EFFECT_HEAT = 'heat';

const Effect = {
  none: EFFECT_NONE,
  chrome: EFFECT_CHROME,
  sepia: EFFECT_SEPIA,
  marvin: EFFECT_MARVIN,
  phobos: EFFECT_PHOBOS,
  heat: EFFECT_HEAT
};

const settings = {
  [Effect.chrome]: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  [Effect.sepia]: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  [Effect.marvin]: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  [Effect.phobos]: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  [Effect.heat]: {
    name: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const effects = document.querySelector('.effects');
const sliderContainer = document.querySelector('.effect-level');
const input = document.querySelector('.effect-level__value');
const preview = document.querySelector('.img-upload__preview img');

let selected = Effect.none;

const set = (name) => {selected = Effect[name];};

const apply = (value) => {
  const filter = settings[Effect[selected]];
  preview.style.filter = `${filter.name}(${value + filter.unit})`;
  input.value = value;
};

const clear = () => preview.style.removeProperty('filter');

const reset = () => {
  toggleVisibility(sliderContainer, false);
  set(Effect.none);
  clear();
  resetSlider();
};

const hasNoEffect = () => selected === Effect.none;

const onChange = (evt) => {
  set(evt.target.value);

  if (hasNoEffect()) {
    reset();
  } else {
    toggleVisibility(sliderContainer, true);
    const filter = settings[Effect[selected]];
    updateSlider(filter);
    apply(filter.max);
  }
};

const setup = () => {
  effects.addEventListener('change', onChange);
  setupSlider();
  toggleVisibility(sliderContainer, false);
};

export {
  apply as applyEffect,
  hasNoEffect,
  reset as resetEffects,
  setup as setupEffects,
};
