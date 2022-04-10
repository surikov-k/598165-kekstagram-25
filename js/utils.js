const checkLength = (string, length) => string.length <= length;

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => ++lastGeneratedId;
};


const getRandomInt = (a, b) => {
  const [from, to] = [
    Math.floor(Math.min((Math.abs(a)), (Math.abs(b)))),
    Math.ceil(Math.max((Math.abs(a)), (Math.abs(b))))
  ];
  return Math.floor(Math.random() * (to - from + 1) + from);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const generatedValues = [];

  return () => {
    let value = getRandomInt(min, max);
    if (generatedValues.length >= max - min + 1) {
      throw new Error(`All integers from the range [${min}, ${max}] has been returned`);
    }
    while (generatedValues.includes(value)) {
      value = getRandomInt(min, max);
    }
    generatedValues.push(value);
    return value;
  };
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
  createRandomIdFromRangeGenerator,
  createIdGenerator,
  getRandomFromArray,
  getRandomInt,
  shuffle,
};
