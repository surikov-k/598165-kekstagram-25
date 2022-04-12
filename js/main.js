import {getPosts} from './data.js';
import {setupGallery} from './gallery.js';
import {setupForm} from './form.js';

const LIMIT = 25;
const posts = getPosts(LIMIT);

setupGallery(posts);
setupForm();

