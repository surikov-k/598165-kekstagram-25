const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://25.javascript.pages.academy/kekstagram';

const Api = {
  get: GET_URL,
  post: POST_URL,
};

const HttpMethod = {
  post: 'POST',
  get: 'GET',
};

const get = () => fetch(Api.get)
  .then((response) => response.json());

const post = (body) => new Promise((resolve, reject) => {
  fetch(Api.post, {
    method: HttpMethod.post,
    body
  })
    .then(({ok}) => {
      if (!ok) {
        throw new Error();
      }
      resolve();
    })
    .catch(() => reject());
});

export {
  get as getPosts,
  post as sendPost
};
