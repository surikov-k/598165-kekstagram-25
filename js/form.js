import {openPopup} from './popup.js';

const form = document.querySelector('#upload-select-image');
const popup = document.querySelector('.img-upload__overlay');

const setup = () => {
  const uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', () => {
    openPopup(popup, () => {}, () => form.reset());
  });
};

export {setup as setupForm};
