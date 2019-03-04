'use strict';

import $ from 'jquery';

export const wpContentsOutline = (wrapper) => {
  const post_class = wrapper.getAttribute('data-wpco-post-class');
  const selector   = wrapper.getAttribute('data-wpco-selector');
  const headings   = wrapper.getAttribute('data-wpco-headings');
  const move       = 'true' === wrapper.getAttribute('data-wpco-move') ? true : false;

  $(wrapper).contentsOutline(
    {
      headings: $(post_class).find(selector).children(headings),
      moveToBefore1stHeading: move
    }
  );
};
