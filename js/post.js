const COMMENTS_PORTION = 5;

const popup = document.querySelector('.big-picture');
const image = popup.querySelector('.big-picture__img img');
const likesCount = popup.querySelector('.likes-count');
const commentsCount = popup.querySelector('.comments-count');
const socialComments = popup.querySelector('.social__comments');
const socialComment = popup.querySelector('.social__comment');
const socialCaption = popup.querySelector('.social__caption');
const socialCommentCount = popup.querySelector('.social__comment-count');
const socialCommentsLoader = popup.querySelector('.social__comments-loader');
const socialFooter = popup.querySelector('.social__footer');


let socialCommentsLoaderClone;

const state = {
  comments: [],
  displayedComments: 0
};

const addComments = () => {
  const {comments} = state;

  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  const nextCommentsPortion = Math
    .min(comments.length - state.displayedComments, COMMENTS_PORTION);

  for (let i = 0; i <= state.displayedComments + nextCommentsPortion - 1; i++) {
    const {avatar, message, name} = comments[i];
    const commentNode = socialComment.cloneNode(true);
    const avatarNode = commentNode.querySelector('.social__picture');
    const textNode = commentNode.querySelector('.social__text');

    avatarNode.src = avatar;
    avatarNode.alt = name;
    textNode.innerText = message;

    fragment.appendChild(commentNode);
  }
  state.displayedComments += nextCommentsPortion;
  socialCommentCount.innerText = `${state.displayedComments} из ${comments.length} комментариев`;

  if (state.displayedComments < comments.length) {
    socialCommentsLoaderClone.classList.remove('hidden');
  } else {
    socialCommentsLoaderClone.classList.add('hidden');
  }


  socialComments.appendChild(fragment);
};

const resetComments = () => {
  state.displayedComments = 0;
  socialCommentsLoaderClone.remove();
};

const cloneCommentsLoaderButton = () => {
  const {comments} = state;

  socialCommentsLoader.remove();
  socialCommentsLoaderClone = socialCommentsLoader.cloneNode(true);
  socialFooter.insertAdjacentElement('beforebegin', socialCommentsLoaderClone);
  socialCommentsLoaderClone.classList.add('hidden');
  socialCommentsLoaderClone.addEventListener('click', () => addComments(comments));
};


const render = ({comments, description, likes, url}) => {
  state.comments = comments;

  image.src = url;
  image.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  cloneCommentsLoaderButton();

  addComments();
};


export {
  render as renderPost,
  resetComments
};
