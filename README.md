ShadeJS
=======

Shade is a simple templating engine based on Shadow DOM concepts. It uses the same `<content>` elements and `select="selector"` attributes to project content but uses getters and setters to get / set your content.

```js
var listTemplate = shade(`
  <h2>
    <content name="title">
      Default title
    </content>
  </h2>
  <ul>
    <content name="todos" select="li" multiple>
      <li><em>There are no todos yet.</li>
    </content>
  </ul>
`);

var listItemTemplate = shade(`
  <content></content>
  <button type="button">x</button>
`);

var div = document.createElement('div');
listTemplate(div);

div.title = 'My todo list';
div.todos.append(listItemTemplate('<li></li>'));
```
