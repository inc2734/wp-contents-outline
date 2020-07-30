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

  if (1 > options.headings.length) {
    target.parentNode.removeChild(target);
  }

  options.headings.sort((a, b) => {
    const aTop = a.getBoundingClientRect().top;
    const bTop = b.getBoundingClientRect().top;
    return aTop - bTop;
  });

  const search = (prefix, counter) => {
    const _target = document.getElementById(`${ prefix }${ counter }`);
    return !! _target ? search(prefix, counter + 1) : counter;
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

  const getHeadingLevel = (heading) => !! heading ? parseInt(heading.tagName.replace('H', '')) : undefined;

  let level = 0;
  let beforeHeading = undefined;
  let roots = [
    {
      level: undefined,
      tree: document.createElement('ol'),
    }
  ];

  const resetRoots = () => {
    const rootsZero = roots[0];
    roots = [];
    roots[0] = rootsZero;
  };

  const createItem = (heading) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = heading.textContent.replace(/[\n\r]/g, '');
    a.setAttribute('href', `#${ heading.getAttribute('id') }`);
    li.appendChild(a);
    return li;
  };

  const createTree = (heading) => {
    const tree = document.createElement('ol');
    tree.appendChild(createItem(heading));
    return tree;
  };

  const addToTree = (heading) => {
    if (!! roots[ level ]) {
      roots[ level ]['tree'].appendChild(createItem(heading));
    } else {
      roots[ level ] = {};
      roots[ level ]['tree'] = createTree(heading);
      const parentLastLi = [].slice.call(roots[ level - 1 ]['tree'].children).slice(-1)[0];
      parentLastLi.appendChild(roots[ level ]['tree']);
    }

    roots[ level ]['level'] = getHeadingLevel(heading);
  };

  const add = (heading) => {
    const beforeHeadingLevel = getHeadingLevel(beforeHeading);
    const headingLevel       = getHeadingLevel(heading);

    const up   = beforeHeadingLevel > headingLevel;
    const down = beforeHeadingLevel < headingLevel;

    if (down) {
      level ++;
    } else if (up) {
      level = level - beforeHeadingLevel - headingLevel;
      level = 0 > level ? 0 : level;
      level = roots[ level ]['level'] < headingLevel ? level + 1 : level;
      resetRoots();
    }

    addToTree(heading);
    beforeHeading = heading;
  };

  [].slice.call(options.headings).forEach((heading) => add(heading));

  if (true === options.moveToBefore1stHeading) {
    const firstHeading = options.headings[0];
    firstHeading.parentNode.insertBefore(target, firstHeading);
  }

  co.appendChild(roots[0]['tree']);
  target.setAttribute('aria-hidden', 'false');
  target.setAttribute('data-initialized', 'true');
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
