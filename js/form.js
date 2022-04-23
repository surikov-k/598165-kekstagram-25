import {closePopup, openPopup} from './popup.js';
import {
  getDescriptionValidationError,
  getTagsValidationError,
  validateDescription,
  validateTags
} from './validation.js';
import {resetImageScale, setupImageScale} from './scale-image.js';
import {resetEffects, setupEffects} from './effects.js';
import {sendPost} from './api.js';
import {resetPreview, setupPreview} from './preview.js';

const form = document.querySelector('#upload-select-image');
const popup = document.querySelector('.img-upload__overlay');
const submitButton = form.querySelector('#upload-submit');
const successMessage = document.querySelector('#success').content
  .querySelector('.success');
const errorMessage = document.querySelector('#error').content
  .querySelector('.error');

const reset = () => {
  form.reset();
  resetEffects();
  resetImageScale();
  resetPreview();
};

const onSuccessSubmit = () => {
  reset();
  closePopup(popup);
  openPopup(successMessage, {
    closeSelectors: [
      '.success',
      '.success__button']
  });
};

const onErrorSubmit = () => {
  openPopup(errorMessage, {
    closeSelectors: [
      '.error',
      '.error__button']
  });
};

const setupMessages = () => {
  [successMessage, errorMessage].forEach((message) => {
    message.classList.add('hidden');
    document.body.append(message);
  });
};

const setup = () => {
  setupImageScale();
  setupEffects();
  setupMessages();
  setupPreview();

  const pristine = new Pristine(form, {
    classTo: 'img-upload__element',
    errorTextParent: 'img-upload__element',
    errorTextClass: 'img-upload__error',
  });

  const uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', () => {
    openPopup(popup, {onClose: reset});
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
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(evt.target);
      sendPost(formData)
        .then(onSuccessSubmit)
        .catch(onErrorSubmit);
    }
  });
};

export {setup as setupForm};
