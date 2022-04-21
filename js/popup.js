import {toggleVisibility} from './utils.js';

const defaultOpenOptions = {
  onOpen: () => {},
  onClose: () => {},
  closeSelectors: ['.cancel']
};

const toggleScroll = (lock) => {
  if (lock) {
    return document.body.classList.add('modal-open');
  }
  document.body.classList.remove('modal-open');
};

const selectCloseElements = (popup, selectors) => {
  let elements = popup.querySelectorAll(selectors);

  if (selectors.some((selector) => popup.classList
    .contains(selector.replace('.', '')))) {
    elements = [...elements, popup];
  }
  return elements;
};

const close = (popup) => {
  toggleVisibility(popup, false);
  toggleScroll(false);
};

const open = (popup, options) => {
  const currentOptions = Object.assign({}, defaultOpenOptions, options);
  const {
    onOpen,
    onClose,
    closeSelectors,
  } = currentOptions;

  const closeElements = selectCloseElements(popup, closeSelectors);

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.removeEventListener('keydown', onEscKeydown);
      close(popup);
      onClose();
    }
  };

  const onCloseButtonClick = () => {
    onClose();
    close(popup);
    document.removeEventListener('keydown', onEscKeydown);
    closeElements
      .forEach((element) => element.removeEventListener('click', onCloseButtonClick));
  };

  closeElements.forEach((element) => element
    .addEventListener('click', onCloseButtonClick));
  document.addEventListener('keydown', onEscKeydown);

  onOpen();
  toggleVisibility(popup, true);
  toggleScroll(true);
};

export {
  open as openPopup,
  close as closePopup
};
