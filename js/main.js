import {setupGallery} from './gallery.js';
import {setupForm} from './form.js';
import {getPosts} from './api.js';

getPosts()
  .then((posts) => {
    setupGallery(posts);
    setupForm();
  });


