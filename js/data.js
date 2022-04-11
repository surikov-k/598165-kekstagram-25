import {
  createIdGenerator,
  createRandomIdFromRangeGenerator,
  getRandomFromArray,
  getRandomInt,
  shuffle
} from './utils.js';

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 4;

const MIN_POST_ID = 1;
const MAX_POST_ID = 25;

const NAMES = ['Аким', 'Ким', 'Николай', 'Степан', 'Тимур', 'Харитон'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать..... / I\'ve bought some potatoes.',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  '#fun #party #cool #young',
  'Норм',
  'Вот это тачка! #wow #car #carwow #drive',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
  'Отдыхаем... #chill #relax #group #photo',
];

const getPostId = createRandomIdFromRangeGenerator(MIN_POST_ID, MAX_POST_ID);
const getCommentId = createIdGenerator();

const createCommentMessage = (array) => {
  const commentLength = getRandomInt(1, 2);
  return shuffle(array).slice(0, commentLength).join(' ');
};

const createComment = () => (
  {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: createCommentMessage(MESSAGES),
    name: getRandomFromArray(NAMES)
  });

const getComments = (limit) => new Array(limit)
  .fill({})
  .map(createComment);

const createPost = () => ({
  id: getPostId(),
  get url() {
    return `photos/${this.id}.jpg`;
  },
  description: getRandomFromArray(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: getComments(getRandomInt(MIN_COMMENTS, MAX_COMMENTS))
});

const getPosts = (limit) => new Array(limit).fill({}).map(createPost);

export {getPosts};
