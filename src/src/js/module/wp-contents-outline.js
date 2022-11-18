export const wpContentsOutline = (wrapper) => {
  const post_class = wrapper.getAttribute('data-wpco-post-class');
  const post = document.querySelector(post_class);
  if (! post) {
    return;
  }

  const selectors = wrapper.getAttribute('data-wpco-selector').split(',').map((selector) => selector.trim()).filter(Boolean);
  const headings = wrapper.getAttribute('data-wpco-headings').split(',').map((heading) => heading.trim()).filter(Boolean);
  const moveToBefore1stHeading = 'true' === wrapper.getAttribute('data-wpco-move');
  const moveTo = moveToBefore1stHeading
    ? wrapper.getAttribute('data-wpco-move-to').split(',').map((moveTo) => moveTo.trim()).filter(Boolean)
    : [];

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

  const targetMoveTo = [];
  if (0 < moveTo.length) {
    moveTo.forEach(
      (selector) => {
        const m = post.querySelector(selector);
        if (!! m) {
          targetMoveTo.push(m);
        }
      }
    )
  }

  new ContentsOutline(
    wrapper,
    {
      headings: targetHeadings,
      moveToBefore1stHeading: moveToBefore1stHeading,
      moveTo: targetMoveTo,
    }
  );
};
