;(jQuery(function($) {
  $.fn.wpContentsOutline = function(params) {
    var params = $.extend({
      headings : $('h2, h3, h4, h5, h6'),
      moveToBefore1stHeading: true
    }, params);

    return this.each((i, e) => {
      var wrapper = $(e);
      var wpco    = wrapper.find('.wpco__body');

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

        if (true === params.moveToBefore1stHeading) {
          params.headings.first().before(wrapper);
        }

        wrapper.attr('aria-hidden', 'false');
        wpco.append(outlines);
      })();

      /**
       * Create tree
       *
       * @param   {dom}  parent  The children wrapper element
       * @param   {dom}  heading  Heading
       * @param   {Number} hierarchical  Hierarchical
       * @return  {dom}  The tree
       */
      function _createTree(parent, heading, hierarchical = 2) {
        const nest = parseInt(heading.prop('tagName').replace('H', '') - hierarchical);

        if (0 > nest) {
          return parent;
        }

        if (0 === nest) {
          parent.append(_createItem(heading));
        } else {
          const children = _createSubTree(parent, heading, hierarchical);

          if (1 > parent.children('li').length) {
            parent.append($('<li />').append(children));
          } else {
            parent.children('li:last-child').append(children);
          }
        }

        return parent;
      }

      /**
       * Create child item
       *
       * @param {dom}  heading  Heading
       * @return {dom}  Child item
       */
      function _createItem(heading) {
        return $('<li />').append(
          $('<a />')
            .text(heading.text())
            .attr('href', '#' + heading.attr('id'))
        );
      }

      /**
       * Create subtree
       *
       * @param   {dom}  parent  The children wrapper element
       * @param   {dom}  heading  Heading
       * @param   {Number} hierarchical  Hierarchical
       * @return  {dom}  The tree
       */
      function _createSubTree(parent, heading, hierarchical) {
        let _parent;
        if (1 > parent.children('li:last-child').children('ol').length) {
          _parent = $('<ol />');
        } else{
          _parent = parent.children('li:last-child').children('ol');
        }
        return _createTree(_parent, heading, hierarchical + 1);
      }
    });
  };
}));
