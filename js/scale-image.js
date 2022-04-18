const ACTION_DECREASE = 'smaller';
const ACTION_INCREASE = 'bigger';
const CONTROL_TAG = 'BUTTON';
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;

const CONTROL_CLASS_RE = /scale__control--(?<action>[\w\d-]+)/i;

const Action = {
  decrease: ACTION_DECREASE,
  increase: ACTION_INCREASE
};

const scaleInput = document.querySelector('.scale__control--value');
const scaleField = document.querySelector('.scale');
const preview = document.querySelector('.img-upload__preview');

const applyScale = (value) => {
  value = parseInt(value, 10) / 100;
  preview.style.transform = `scale(${value})`;
};

const getAction = (control) => {
  const {groups: {action}} = [...control.classList]
    .join(' ')
    .match(CONTROL_CLASS_RE);
  return action;
};

const onScaleFieldClick = (evt) => {
  const control = evt.target;
  if (control.tagName !== CONTROL_TAG) {
    return;
  }

  const scaleAction = getAction(control);
  const currentScaleValue = parseInt(scaleInput.value, 10);

  switch (scaleAction) {
    case Action.increase:
      scaleInput.value = Math
        .min(currentScaleValue + SCALE_STEP, SCALE_MAX);
      break;
    case Action.decrease:
      scaleInput.value = Math
        .max(currentScaleValue - SCALE_STEP, SCALE_MIN);
      break;
  }

  applyScale(scaleInput.value);
};

const reset = () => {
  preview.style.transform = 'scale(1)';
};

const setup = () => {
  scaleField.addEventListener('click', onScaleFieldClick);
};

export {
  setup as setupImageScale,
  reset as resetImageScale
};
