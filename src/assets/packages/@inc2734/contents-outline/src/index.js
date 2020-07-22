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

  const getHeadingLevel = (heading) => parseInt(heading.tagName.replace('H', ''));

  let hi = 0;
  let beforeHeading = [].slice.call(options.headings).slice(1)[0];
  let parents = [ document.createElement('ol') ];
  let parentsHeadingLevel = [ getHeadingLevel(beforeHeading) ];

  const createItem = (heading) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = heading.textContent.replace(/[\n\r]/g, '');
    a.setAttribute('href', `#${ heading.getAttribute('id') }`);
    li.appendChild(a);
    return li;
  };

  const createTree = (heading) => {
    const beforeHeadingLevel = getHeadingLevel(beforeHeading);
    const headingLevel       = getHeadingLevel(heading);

    if (beforeHeadingLevel < headingLevel) {
      hi ++;
    } else if (beforeHeadingLevel > headingLevel) {
      const diff = beforeHeadingLevel - headingLevel;
      hi = 0 > hi - diff ? 0 : hi - diff;
      if (parentsHeadingLevel[ hi ] < headingLevel) {
        hi ++;
      }
    }

    if (!! parents[ hi ] && (0 === hi || parentsHeadingLevel[ hi ] < headingLevel)) {
      parents[ hi ].appendChild(createItem(heading));
    } else {
      const ol = document.createElement('ol');
      ol.appendChild(createItem(heading));
      const lastLi = [].slice.call(parents[ hi - 1 ].children).slice(-1)[0];
      lastLi.appendChild(ol);
      parents[ hi ] = ol;
    }

    if (! parentsHeadingLevel[ hi ] || parentsHeadingLevel[ hi ] > headingLevel) {
      parentsHeadingLevel[ hi ] = headingLevel;
    }

    beforeHeading = heading;
  };

  [].slice.call(options.headings).forEach((heading) => createTree(heading));

  if (true === options.moveToBefore1stHeading) {
    const firstHeading = options.headings[0];
    firstHeading.parentNode.insertBefore(target, firstHeading);
  }

  co.appendChild(parents[ 0 ]);
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
