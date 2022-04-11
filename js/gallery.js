import {openPopup} from './popup.js';

const gallery = document.querySelector('.pictures');

const setup = (posts) => {
  gallery.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (evt.target.classList.contains('picture__img')) {

      const targetPostId = parseInt(evt.target.closest('.picture').dataset.id, 10);
      const targetPost = posts.find((post) => post.id === targetPostId);

      openPopup(targetPost);
    }
  });
};

export {setup as setupGallery};
