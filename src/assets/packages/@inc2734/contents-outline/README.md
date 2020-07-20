# inc2734/contents-outline

## Get started

### Install
```
$ yarn add @inc2734/contents-outline
```

### Load scripts

```
import ContentsOutline from '@inc2734/contents-outline';


new ContentsOutline(
  '.contents-outline-container',
  {
    headings : document.querySelectorAll('h2, h3, h4, h5, h6'), // Optional
    moveToBefore1stHeading: true, // Optional
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
