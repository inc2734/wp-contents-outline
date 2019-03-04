'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import {wpContentsOutline} from './module/wp-contents-outline.js';

window.addEventListener(
  'DOMContentLoaded',
  () => {
    const wrappers = document.querySelectorAll('.wpco-wrapper');

    forEachHtmlNodes(
      wrappers,
      (wrapper) => {
        wpContentsOutline(wrapper)
      }
    )
  },
  false
);
