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

  const newHeadings = options.headings.filter(
    (heading) => {
      let element = heading;
      let isParentsDisplayNone = false;
      let isParentsVisibilityHidden = false;
      while (true) {
        if (! element.parentNode || ['#document', 'HTML', 'BODY'].includes(element.parentNode.nodeName)) {
          break;
        }
        isParentsDisplayNone = 'none' === window.getComputedStyle(element.parentNode).getPropertyValue('display');
        isParentsVisibilityHidden = 'hidden' === window.getComputedStyle(element.parentNode).getPropertyValue('visibility');
        if (isParentsDisplayNone || isParentsVisibilityHidden) {
          break;
        }
        element = element.parentNode;
      }

      return (
        'none' !== window.getComputedStyle(heading).getPropertyValue('display')
        && 'hidden' !== window.getComputedStyle(heading).getPropertyValue('visibility')
        && ! isParentsDisplayNone
        && ! isParentsVisibilityHidden
      );
    }
  );

  if (1 > newHeadings.length) {
    target.parentNode.removeChild(target);
    return;
  }

  newHeadings.sort((a, b) => {
    const aTop = a.getBoundingClientRect().top;
    const bTop = b.getBoundingClientRect().top;
    return aTop - bTop;
  });

  const search = (prefix, counter) => {
    const _target = document.getElementById(`${ prefix }${ counter }`);
    return !! _target ? search(prefix, counter + 1) : counter;
  };

  let bulk = 0;
  [].slice.call(newHeadings).forEach(
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

  const getHeadingLevel = (heading) => !! heading ? parseInt(heading.tagName.replace('H', '')) : undefined;

  const createItem = (heading) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = heading.textContent.replace(/[\n\r]/g, '');
    a.setAttribute('href', `#${ encodeURI(heading.getAttribute('id')) }`);
    li.appendChild(a);
    return li;
  };

  const createTree = () => {
    return document.createElement('ol');
  };

  const getTarget = (obj, hierarchical) => {
    let propPath = '';
    for (let i = 0; i < hierarchical; i++) {
      propPath += `.lastElementChild.lastElementChild`;
    }
    propPath = propPath.slice(1);

    const arr = propPath.split('.');
    while (arr.length) {
      obj = obj[ arr.shift() ];
    }

    return obj;
  };

  const getReferenceElement = (_target, moveTo = []) => {
    let t;

    const has = [].slice.call(moveTo).some( ( w ) => {
      const match = _target.parentNode === w;
      if ( match ) {
        t = _target;
      }
      return match;
    } );

    if ( has ) {
      return t;
    }

    if (!! _target.parentNode) {
      return getReferenceElement(_target.parentNode, moveTo);
    }

    return _target;
  };

  const getRefinedTarget = (targetElement) => {
    let current = targetElement;

    while (true) {
      const parent = current.parentElement;
      if (!parent) break;

      const onlyChild = parent.children.length === 1;

      if (onlyChild) {
        current = parent;
      } else {
        break;
      }
    }

    return current;
  };

  const tree = document.createElement('ol');
  let beforeHeadingLevel = undefined;
  let hierarchical = 0;
  let isOverDigging = false;

  newHeadings.forEach((heading) => {
    const level = getHeadingLevel(heading);

    if (level < beforeHeadingLevel) {
      if (! isOverDigging) {
        hierarchical = hierarchical + level - beforeHeadingLevel;
      }
      hierarchical = hierarchical < 0 ? 0 : hierarchical;
      isOverDigging = false;
    } else if (level > beforeHeadingLevel) {
      if (1 < level - beforeHeadingLevel) {
        isOverDigging = true;
      }
      hierarchical ++;
    }

    if (0 === hierarchical) {
      tree.appendChild(createItem(heading));
    } else if (0 < hierarchical) {
      if ('OL' !== getTarget(tree, hierarchical).tagName) {
        getTarget(tree, hierarchical).parentElement.appendChild(createTree());
      }
      getTarget(tree, hierarchical).appendChild(createItem(heading));
    }

    beforeHeadingLevel = level;
  });

  if (true === options.moveToBefore1stHeading) {
    const firstHeading = newHeadings[0];
    const moveTo = options?.moveTo;
    if ( !! moveTo ) {
      const movingTarget = getRefinedTarget(target);
      const t = getReferenceElement(firstHeading, moveTo);
      t.parentNode.insertBefore(movingTarget, t);
    } else {
      firstHeading.parentNode.insertBefore(movingTarget, firstHeading);
    }
  }

  if ('function' === typeof IntersectionObserver) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentItem = target.querySelector('[data-is-current="true"]');
            if (!! currentItem) {
              currentItem.removeAttribute('data-is-current');
            }
            const newCurrentLink = target.querySelector(`a[href='#${ encodeURI(entry.target.id) }']`);
            if (!! newCurrentLink) {
              newCurrentLink.parentElement.setAttribute('data-is-current', 'true');
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0,
      }
    );

    [].slice.call(newHeadings).forEach((heading) => {
      observer.observe(heading);
    });
  }

  co.appendChild(tree);
  target.setAttribute('aria-hidden', 'false');
  target.setAttribute('data-initialized', 'true');
};

export default function ContentsOutline(target, args = {}) {
  const defaultOptions = {
    headings: document.querySelectorAll('h2, h3, h4, h5, h6'),
    moveToBefore1stHeading: true,
    moveTo: undefined,
  };

  const options = {};
  for (const key in defaultOptions) {
    options[ key ] = 'undefined' !== typeof args[ key ]
      ? args[ key ]
      : defaultOptions[key];
  }

  if ('string' === typeof target) {
    if (target.match(/^#/)) {
      const cos = document.querySelector(target);
      if (! cos) {
        return;
      }
      return newContentsOutline(cos, options);
    } else {
      const coses = document.querySelectorAll(target);
      if (1 > coses.length) {
        return;
      }
      return newContentsOutlines(coses, options);
    }
  } else if (true === target instanceof NodeList) {
    return newContentsOutlines(target, options);
  } else if (true === target instanceof HTMLElement) {
    return newContentsOutline(target, options);
  }
}
