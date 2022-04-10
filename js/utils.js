const checkLength = (string, length) => string.length <= length;

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => ++lastGeneratedId;
};

const getRandomInt = (a, b) => {
  const [from, to] = [
    Math.ceil(Math.min((Math.abs(a)), (Math.abs(b)))),
    Math.ceil(Math.max((Math.abs(a)), (Math.abs(b))))
  ];
  return Math.floor(Math.random() * (to - from + 1) + from);
};

const getRandomFromArray = (array) => array[getRandomInt(0, array.length - 1)];

const shuffle = (array) => {
  const result = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = getRandomInt(0, i - 1);
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }
  return result;
};

export {
  checkLength,
  createIdGenerator,
  getRandomFromArray,
  getRandomInt,
  shuffle,
};
