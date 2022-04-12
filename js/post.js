const popup = document.querySelector('.big-picture');
const image = popup.querySelector('.big-picture__img img');
const likesCount = popup.querySelector('.likes-count');
const commentsCount = popup.querySelector('.comments-count');
const socialComments = popup.querySelector('.social__comments');
const socialComment = popup.querySelector('.social__comment');
const socialCaption = popup.querySelector('.social__caption');
const socialCommentsCount = popup.querySelector('.social__comment-count');
const socialCommentsLoader = popup.querySelector('.social__comments-loader');

const addComments = (comments) => {
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

const render = ({comments, description, likes, url}) => {
  image.src = url;
  image.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  addComments(comments);

  socialCommentsCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
};


export {
  render as renderPost,
};
