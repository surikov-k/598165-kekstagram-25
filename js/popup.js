const popup = document.querySelector('.big-picture');
const image = popup.querySelector('.big-picture__img img');
const likesCount = popup.querySelector('.likes-count');
const commentsCount = popup.querySelector('.comments-count');
const socialCommentsCount = popup.querySelector('.social__comment-count');
const socialCommentsLoader = popup.querySelector('.social__comments-loader');
const socialComments = popup.querySelector('.social__comments');
const socialComment = popup.querySelector('.social__comment');
const socialCaption = popup.querySelector('.social__caption');

const closeButton = document.querySelector('.big-picture__cancel');


const toggleVisibility = (show) => {
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

const renderPost = ({comments, description, likes, url}) => {
  image.src = url;
  image.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
};

const renderComments = (comments) => {

  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach(({avatar, message, name}) => {
    const commentNode = socialComment.cloneNode(true);
    const avatarNode = commentNode.querySelector('.social__picture');
    const textNode = commentNode.querySelector('.social__text');

    avatarNode.src = avatar;
    avatarNode.alt = name;
    textNode.innerText = message;

    fragment.appendChild(commentNode);
  });

  socialComments.appendChild(fragment);
};

const escapeKeydownHandler = (evt) => {
  evt.preventDefault();

  if (evt.key === 'Escape') {
    document.removeEventListener('keydown', escapeKeydownHandler);
    toggleVisibility(false);
    toggleScroll(false);
  }
};

const closeHandler = () => {
  document.removeEventListener('keydown', escapeKeydownHandler);
  toggleVisibility(false);
  toggleScroll(false);
};

const open = (post) => {
  closeButton.addEventListener('click', closeHandler);
  document.addEventListener('keydown', escapeKeydownHandler);

  socialCommentsCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');

  renderPost(post);
  renderComments(post.comments);

  toggleScroll(true);
  toggleVisibility(true);
};

export {
  open as openPopup,
};
