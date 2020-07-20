const newContentsOutlines = (targets, options) => {
  const cos = [];

  [].slice.call(targets).forEach(
    (target) => {
      const co = new ContentsOutline(target, options);
      if (!! co) {
        cos.push(co);
      }
    }
  );

  return cos;
};

const newContentsOutline = (target, options) => {
  if ('true' === target.getAttribute('data-initialized')) {
    return;
  }

  const co = target.querySelector('.contents-outline');
  if (! co) {
    return;
  }

  /**
   * Create tree
   *
   * @param   {dom}  parent  The children wrapper element
   * @param   {dom}  heading  Heading
   * @param   {Number} hierarchical  Hierarchical
   * @return  {dom}  The tree
   */
  function _createTree(parent, heading, hierarchical = 2) {
    let nest = parseInt(heading.tagName.replace('H', '') - hierarchical);
    if (Number.isNaN(nest)) {
      nest = 0;
    }

    if (0 > nest) {
      return parent;
    }

    if (! parent) {
      return parent;
    }

    if (0 === nest) {
      parent.appendChild(_createItem(heading));
    } else {
      const children = _createSubTree(parent, heading, hierarchical);
      if (! children) {
        return parent;
      }

      if (1 > parent.children.length) {
        const li = document.createElement('li');
        li.appendChild(children);
        parent.appendChild(li);
      } else {
        const lastLi = [].slice.call(parent.children).slice(-1)[0];
        if (!! lastLi) {
          lastLi.appendChild(children);
        }
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
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = heading.textContent.replace(/[\n\r]/g, '');
    a.setAttribute('href', `#${ heading.getAttribute('id') }`);
    li.appendChild(a)
    return li;
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
    const lastLi = [].slice.call(parent.children).slice(-1)[0];
    if (!! lastLi ) {
      const childOl = lastLi.querySelector('ol');
      if (! childOl) {
        _parent = document.createElement('ol');
      } else{
        _parent = childOl;
      }
      return _createTree(_parent, heading, hierarchical + 1);
    }
  }

  return new function() {
    let outlines = document.createElement('ol');
    options.headings.sort((a, b) => {
      const aTop = a.getBoundingClientRect().top;
      const bTop = b.getBoundingClientRect().top;
      return aTop - bTop;
    });

    const search = (prefix, counter) => {
      const _target = document.getElementById(`${ prefix }${ counter }`);
      if (!! _target) {
        return search(prefix, counter + 1);
      }
      return counter;
    };

    let bulk = 0;
    [].slice.call(options.headings).forEach(
      (heading) => {
        if (heading.getAttribute('id')) {
          return;
        }

        const preCounter = bulk;
        const counter = search('co-index-', preCounter);
        heading.setAttribute('id', `co-index-${ counter }`);
        bulk = counter + 1;
      }
    );

    [].slice.call(options.headings).forEach(
      (heading) => {
        outlines = _createTree(outlines, heading);
      }
    );

    if (! outlines.innerHTML) {
      target.parentNode.removeChild(target);
    }

    if (true === options.moveToBefore1stHeading) {
      const firstHeading = options.headings[0];
      firstHeading.parentNode.insertBefore(target, firstHeading);
    }

    target.setAttribute('aria-hidden', 'false');

    co.appendChild(outlines);
    target.setAttribute('data-initialized', 'true');
  }
};

export default function ContentsOutline(target, args = {}) {
  const defaultOptions = {
    headings: document.querySelectorAll('h2, h3, h4, h5, h6'),
    moveToBefore1stHeading: true,
  };

  const options = {};
  for (const key in defaultOptions) {
    options[ key ] = 'undefined' !== typeof args[ key ]
      ? args[ key ]
      : defaultOptions[key];
  }

  if ('string' === typeof target) {
    if (target.match(/^#/)) {
      const slider = document.querySelector(target);
      if (! slider) {
        return;
      }
      return newContentsOutline(slider, options);
    } else {
      const cos = document.querySelectorAll(target);
      if (1 > cos.length) {
        return;
      }
      return newContentsOutlines(cos, options);
    }
  } else if (true === target instanceof NodeList) {
    return newContentsOutlines(target, options);
  } else if (true === target instanceof HTMLElement) {
    return newContentsOutline(target, options);
  }
}
