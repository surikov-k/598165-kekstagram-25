import {getPosts} from './data.js';
import {renderPosts} from './render.js';

const LIMIT = 25;

renderPosts(getPosts(LIMIT));
