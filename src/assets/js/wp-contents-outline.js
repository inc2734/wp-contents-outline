;(jQuery(function($) {
  $.fn.wpContentsOutline = function(params) {
    var params = $.extend({
      headings: $('h2, h3, h4, h5, h6'),
    }, params);

    return this.each((i, e) => {
      var wrapper  = $(e);
      var wpco     = wrapper.find('.wpco__body');

      var outlines = $('<ol />');

      (function() {
        params.headings.each((i, e) => {
          if (! $(e).attr('id')) {
            $(e).attr('id', 'wpco-index-' + i);
          }
          outlines = _createTree(outlines, $(e));
        });

        if (! outlines.html()) {
          wrapper.remove();
        }

        params.headings.first().before(wrapper);
        wrapper.attr('aria-hidden', 'false');
        wpco.append(outlines);
      })();

      function _createTree(parent, child, base = 2) {
        const nest = parseInt(child.prop('tagName').replace('H', '') - base);

        if (0 > nest) {
          return parent;
        }

        if (0 === nest) {
          parent.append(_createItem(child));
        } else {
          const children = _createChildren(parent, child, base);

          if (1 > parent.children('li').length) {
            parent.append($('<li />').append(children));
          } else {
            parent.children('li:last-child').append(children);
          }
        }

        return parent;
      }

      function _createItem(child) {
        return $('<li />').append(
          $('<a />')
            .text(child.text())
            .attr('href', '#' + child.attr('id'))
        );
      }

      function _createChildren(parent, child, base) {
        let _parent;
        if (1 > parent.children('li:last-child').children('ol').length) {
          _parent = $('<ol />');
        } else{
          _parent = parent.children('li:last-child').children('ol');
        }
        return _createTree(_parent, child, base + 1);
      }
    });
  };
}));
