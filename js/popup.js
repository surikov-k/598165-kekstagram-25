const toggleVisibility = (popup, show) => {
  if (show) {
    return popup.classList.remove('hidden');
  }
  return popup.classList.add('hidden');
};

const toggleScroll = (lock) => {
  if (lock) {
    return document.body.classList.add('modal-open');
  }
  document.body.classList.remove('modal-open');
};

const close = (popup) => {
  toggleVisibility(popup, false);
  toggleScroll(false);
};

const open = (
  popup,
  onOpen = () => {},
  onClose = () => {}
) => {
  const closeButton = popup.querySelector('.cancel');

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.removeEventListener('keydown', onEscKeydown);
      close(popup);
      onClose();
    }
  };

  const onCloseButtonClick = () => {
    document.removeEventListener('keydown', onEscKeydown);
    closeButton.removeEventListener('click', onCloseButtonClick);
    close(popup);
    onClose();
  };

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);

  onOpen();
  toggleVisibility(popup, true);
  toggleScroll(true);
};

export {
  open as openPopup,
};
