import {getPosts} from './data.js';
import {renderPreview} from './preview.js';
import {setupGallery} from './gallery.js';

const LIMIT = 25;
const posts = getPosts(LIMIT);

setupGallery(posts);
renderPreview(posts);
