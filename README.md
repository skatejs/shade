ShadeJS
=======

Shade is a simple templating engine based on Shadow DOM concepts. It uses the same `<content>` elements and `select="selector"` attributes to project content but uses getters and setters to get / set your content.

```js
var listTemplate = shade(`
  <h2><content name="textContent">My todo list</content></h2>
  <ul>
    <content name="todos" select="li" multiple>
      <li><em>There are no todos yet.</li>
    </content>
  </ul>
`);

var listItemTemplate = shade(`
  <content name="textContent"></content>
  <button type="button">x</button>
`);

listTemplate('<div></div>')
  .todos
  .append(listItemTemplate('<li>Todo 1</li>'));
```

Produces:

```html
<div>
  <h2>My todo list</h2>
  <ul>
    <li>
      Todo 1
      <button type="button">x</button>
    </li>
  </ul>
</div>
```
