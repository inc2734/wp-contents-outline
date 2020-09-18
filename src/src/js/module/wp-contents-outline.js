export const wpContentsOutline = (wrapper) => {
  const post_class = wrapper.getAttribute('data-wpco-post-class');
  const post = document.querySelector(post_class);
  if (! post) {
    return;
  }

  const selectors = wrapper.getAttribute('data-wpco-selector').split(',').map((selector) => selector.trim());
  const headings  = wrapper.getAttribute('data-wpco-headings').split(',').map((heading) => heading.trim());

  const targetHeadings = [];
  selectors.forEach(
    (selector) => {
      headings.forEach(
        (heading) => {
          const targetSelector = `${selector} > ${heading}`;
          const list = post.querySelectorAll(targetSelector);
          if (1 > list.length) {
            return;
          }

          [].slice.call(list).forEach(
            (heading) => {
              targetHeadings.push(heading);
            }
          );
        }
      )
    }
  );
  if (1 > targetHeadings.length) {
    return;
  }

  new ContentsOutline(
    wrapper,
    {
      headings: targetHeadings,
      moveToBefore1stHeading: 'true' === wrapper.getAttribute('data-wpco-move'),
    }
  );
};
