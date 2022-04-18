import {openPopup} from './popup.js';
import {
  getDescriptionValidationError,
  getTagsValidationError,
  validateDescription,
  validateTags
} from './validation.js';
import {resetImageScale, setupImageScale} from './scale-image.js';
import {resetEffects, setupEffects} from './effects.js';

const form = document.querySelector('#upload-select-image');
const popup = document.querySelector('.img-upload__overlay');
const submitButton = form.querySelector('#upload-submit');

const setup = () => {
  setupImageScale();
  setupEffects();

  const pristine = new Pristine(form, {
    classTo: 'img-upload__element',
    errorTextParent: 'img-upload__element',
    errorTextClass: 'img-upload__error',
  });

  const uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', () => {
    openPopup(popup, () => {}, () => {
      form.reset();
      resetImageScale();
      resetEffects();
    });
  });

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateTags,
    getTagsValidationError);

  pristine.addValidator(
    form.querySelector('.text__description'),
    validateDescription,
    getDescriptionValidationError);

  form.addEventListener('input', () => {
    submitButton.disabled = !pristine.validate();
  });

  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });

};

export {setup as setupForm};
