import {openPopup} from './popup.js';
import {renderPost, resetComments} from './post.js';

const gallery = document.querySelector('.pictures');
const postPopup = document.querySelector('.big-picture');

const renderPreviews = (posts) => {
  const template = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const fragment = document.createDocumentFragment();
  const picturesContainer = document.querySelector('.pictures');

  posts.forEach((post) => {
    const postElement = template.cloneNode(true);

    postElement.dataset.id = post.id;
    postElement.querySelector('.picture__img').src = post.url;
    postElement.querySelector('.picture__comments').textContent = post.comments.length;
    postElement.querySelector('.picture__likes').textContent = post.likes;

    fragment.append(postElement);
  });
  picturesContainer.append(fragment);
};

const setup = (posts) => {
  gallery.addEventListener('click', (evt) => {

    if (evt.target.classList.contains('picture__img')) {
      evt.preventDefault();

      const targetPostId = parseInt(evt.target.closest('.picture').dataset.id, 10);
      const targetPost = posts.find((post) => post.id === targetPostId);
      openPopup(postPopup, {
        onOpen: () => renderPost(targetPost),
        onClose: resetComments
      });
    }
  });
  renderPreviews(posts);
};

export {setup as setupGallery};
