const getRandomInt = (a, b) => {
  const [from, to] = [
    Math.ceil(Math.min((Math.abs(a)), (Math.abs(b)))),
    Math.ceil(Math.max((Math.abs(a)), (Math.abs(b))))
  ];
  return Math.floor(Math.random() * (to - from + 1) + from);
};

const checkLength = (string, length) => string.length <= length;

getRandomInt(1, 10);
checkLength('abc', 1);
