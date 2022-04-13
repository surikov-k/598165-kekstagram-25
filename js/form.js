import {openPopup} from './popup.js';
import {checkLength} from './utils.js';

const DESCRIPTION_ERROR = 'Длина комментария не может составлять больше 140 символов';

const TAG_NUMBER_ERROR = 'Нельзя указать больше пяти хэш-тегов';
const TAG_UNIQUENESS_ERROR = 'Один и тот же хэш-тег не может быть использован дважды';
const TAG_CORRECTNESS_ERROR = 'Хэш-тег начинается с символа # и состоит из букв и чисел и не может содержать пробелы, спецсимволы, не может состоять только из одной решётки';
const TAG_LENGTH_ERROR = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';

const TagsValidationError = {
  number: TAG_NUMBER_ERROR,
  unique: TAG_UNIQUENESS_ERROR,
  correctness: TAG_CORRECTNESS_ERROR,
  length: TAG_LENGTH_ERROR,
};

const DESCRIPTION_LIMIT = 140;

const TAGS_NUMBER_LIMIT = 5;
const TAG_LENGTH_LIMIT = 20;
const VALID_TAG = /^#[a-z0-9]+$/;

const form = document.querySelector('#upload-select-image');
const popup = document.querySelector('.img-upload__overlay');
const submitButton = form.querySelector('#upload-submit');

let tagsValidationError;

const getTagsValidation = () => {
  const checkTagsNumber = (tags) => tags.length <= TAGS_NUMBER_LIMIT;

  const checkTagsUniqueness = (tags) => tags.length === new Set(tags).size;

  const checkEachTagValidity = (tags) => tags.every((tag) => tag.match(VALID_TAG));

  const checkEachTagLength = (tags) => tags.every((tag) => checkLength(tag, TAG_LENGTH_LIMIT));

  return (value) => {
    if (!value) {
      return true;
    }
    const tags = value.toLowerCase().trim().split(' ');

    if (!checkTagsNumber(tags)) {
      tagsValidationError = TagsValidationError.number;
      return false;
    }
    if (!checkTagsUniqueness(tags)) {
      tagsValidationError = TagsValidationError.unique;
      return false;
    }
    if (!checkEachTagValidity(tags)) {
      tagsValidationError = TagsValidationError.correctness;
      return false;
    }
    if (!checkEachTagLength(tags)) {
      tagsValidationError = TagsValidationError.length;
      return false;
    }
    return true;
  };
};

const validateDescription = (value) => checkLength(value, DESCRIPTION_LIMIT);

const setup = () => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__element',
    errorTextParent: 'img-upload__element',
    errorTextClass: 'img-upload__error',
  });

  const validateTags = getTagsValidation();

  const uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', () => {
    openPopup(popup, () => {}, () => form.reset());
  });

  pristine.addValidator(form.querySelector('.text__hashtags'), validateTags, () => tagsValidationError);
  pristine.addValidator(form.querySelector('.text__description'), validateDescription, DESCRIPTION_ERROR);

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
