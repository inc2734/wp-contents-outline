export const wpContentsOutline = (wrapper) => {
  const post_class = wrapper.getAttribute('data-wpco-post-class');
  const post = document.querySelector(post_class);
  if (! post) {
    return;
  }

  const selector = wrapper.getAttribute('data-wpco-selector');
  const contents = post.querySelectorAll(selector);
  if (1 > contents.length) {
    return;
  }

  const targetHeadings = [];
  const headings = wrapper.getAttribute('data-wpco-headings').split(',').map((tagName) => tagName.trim());
  [].slice.call(contents).forEach(
    (content) => {
      [].slice.call(content.children).forEach(
        (child) => {
          if (-1 !== headings.indexOf(child.tagName.toLowerCase())) {
            targetHeadings.push(child);
          }
        }
      )
    }
  );

  new ContentsOutline(
    wrapper,
    {
      headings: targetHeadings,
      moveToBefore1stHeading: 'true' === wrapper.getAttribute('data-wpco-move'),
    }
  );
};
