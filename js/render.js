const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

const renderPosts = (posts) => {
  posts.forEach((post) => {
    const postElement = template.cloneNode(true);

    postElement.querySelector('.picture__img').src = post.url;
    postElement.querySelector('.picture__comments').textContent = post.comments.length;
    postElement.querySelector('.picture__likes').textContent = post.likes;

    fragment.append(postElement);
  });
  picturesContainer.append(fragment);
};

export {renderPosts};
