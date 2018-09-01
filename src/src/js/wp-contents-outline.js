'use strict';

import $ from 'jquery';

export default class wpContentsOutline {
  constructor(selector) {
    this.selector = selector;
    window.addEventListener('DOMContentLoaded', () => this._DOMContentLoaded(), false);
  }

  _DOMContentLoaded() {
    this.wrapper = document.querySelectorAll(this.selector);

    this._forEachHtmlNodes(this.wrapper, (element) => {
      var post_class = element.getAttribute('data-wpco-post-class');
      var selector   = element.getAttribute('data-wpco-selector');
      var headings   = element.getAttribute('data-wpco-headings');
      var move       = 'true' === element.getAttribute('data-wpco-move') ? true : false;

      $(element).contentsOutline({
        headings: $(post_class).find(selector).children(headings),
        moveToBefore1stHeading: move
      });
    });
  }

  _forEachHtmlNodes(htmlNodes, callback) {
    if (0 < htmlNodes.length) {
      [].forEach.call(htmlNodes, (htmlNode) => callback(htmlNode));
    }
  }
}

new wpContentsOutline('.wpco-wrapper');
