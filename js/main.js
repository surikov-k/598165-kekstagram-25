import {setupGallery} from './gallery.js';
import {setupForm} from './form.js';
import {getPosts} from './api.js';
import {setupFilter} from './filter.js';

getPosts()
  .then((posts) => {
    setupFilter(posts);
    setupGallery(posts);
    setupForm();
  });


