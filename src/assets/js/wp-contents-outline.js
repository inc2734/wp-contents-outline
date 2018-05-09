'use strict';

import $ from 'jquery';

$.fn.wpContentsOutline = function() {
  return this.each(function(i, e) {
    var post_class = $(e).attr('data-wpco-post-class');
    var selector   = $(e).attr('data-wpco-selector');
    var headings   = $(e).attr('data-wpco-headings');
    var move       = 'true' === $(e).attr('data-wpco-move') ? true : false;

    $(e).contentsOutline({
      headings: $(post_class).find(selector).children(headings),
      moveToBefore1stHeading: move
    });
  });
};
