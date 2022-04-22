import {clearPreviews, renderPreviews} from './gallery.js';
import {debounce, getRandomInt} from './utils.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const BUTTON_CLASS = 'img-filters__button';
const DEBOUNCE_DELAY = 500;
const POPULAR_ID = 'filter-discussed';
const RANDOM_FILTER_LIMIT = 10;
const RANDOM_ID = 'filter-random';

const Id = {
  random: RANDOM_ID,
  popular: POPULAR_ID,
};

const filter = document.querySelector('.img-filters');
const buttons = filter.querySelectorAll('.img-filters__button');

const highlightButton = (id) => {
  buttons.forEach((button) => button
    .classList.remove(ACTIVE_BUTTON_CLASS));
  filter.querySelector(`#${id}`)
    .classList.add(ACTIVE_BUTTON_CLASS);
};

const filterRandom = (limit, posts) => {
  const result = [];
  while (result.length < limit) {
    const randomIndex = getRandomInt(0, posts.length - 1);
    const randomPost = posts[randomIndex];
    if (!result.includes(randomPost)) {
      result.push(randomPost);
    }
  }
  return result;
};

const filterPopular = (posts) => {
  const result = posts.slice();
  return result.sort((a, b) => b.comments.length - a.comments.length);
};

const render = (target, posts) => {
  const {id} = target;
  let filtered;

  clearPreviews();

  switch (id) {
    case Id.random:
      filtered = filterRandom(RANDOM_FILTER_LIMIT, posts);
      break;
    case Id.popular:
      filtered = filterPopular(posts);
      break;
    default:
      filtered = posts;
  }

  renderPreviews(filtered);
};

const show = () => {
  filter.classList.remove('img-filters--inactive');
};


const setup = (posts) => {
  const renderDebounced = debounce((target) => render(target, posts), DEBOUNCE_DELAY);
  show();
  filter.addEventListener('click', ({target}) => {
    if (!target.classList.contains(BUTTON_CLASS)) {
      return;
    }
    highlightButton(target.id);
    renderDebounced(target);
  });
};

export {
  setup as setupFilter,
};
