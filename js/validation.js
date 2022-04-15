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

let tagsValidationError;

const checkTagsNumber = (tags) => tags.length <= TAGS_NUMBER_LIMIT;

const checkTagsUniqueness = (tags) => tags.length === new Set(tags).size;

const checkEachTagCorrectness = (tags) => tags.every((tag) => tag.match(VALID_TAG));

const checkEachTagLength = (tags) => tags.every((tag) => checkLength(tag, TAG_LENGTH_LIMIT));

const validateTags = (value) => {

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
  if (!checkEachTagCorrectness(tags)) {
    tagsValidationError = TagsValidationError.correctness;
    return false;
  }
  if (!checkEachTagLength(tags)) {
    tagsValidationError = TagsValidationError.length;
    return false;
  }
  return true;
};

const validateDescription = (value) => checkLength(value, DESCRIPTION_LIMIT);

const getTagsValidationError = () => tagsValidationError;

const getDescriptionValidationError = () => DESCRIPTION_ERROR;

export {
  validateTags,
  getTagsValidationError,
  validateDescription,
  getDescriptionValidationError
};
