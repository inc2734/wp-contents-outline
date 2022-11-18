# inc2734/contents-outline

## Get started

### Install
```
$ npm install --save-dev @inc2734/contents-outline
```

### Load scripts

```
import ContentsOutline from '@inc2734/contents-outline';

new ContentsOutline(
  '.contents-outline-container',
  {
    headings : document.querySelectorAll('h2, h3, h4, h5, h6'), // Optional
    moveToBefore1stHeading: true, // Optional
    moveTo: document.querySelectorAll('entry-content'), // Optional
  }
);
```

```
<div class="contents-outline-container">
  <div class="contents-outline"></div>
</div>
```

## License
MIT
