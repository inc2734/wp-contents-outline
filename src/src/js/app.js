import { wpContentsOutline } from './module/wp-contents-outline.js';

window.addEventListener(
  'DOMContentLoaded',
  () => {
    const wrappers = document.querySelectorAll('.wpco-wrapper');
    [].slice.call(wrappers).forEach((wrapper) => wpContentsOutline(wrapper));
  },
  false
);
