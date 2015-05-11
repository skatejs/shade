ShadeJS
=======

Shade is a simple templating engine based on Shadow DOM concepts. It uses the same `<content>` elements and `select="selector"` attributes to project content but uses getters and setters to get / set your content.

```js
var helloWorld = shade(`
  Hello, <content name="textContent"></content>!
`);

document.body.appendChild(helloWorldTemplate('<h1>User</h1>'));
```

Produces:

```html
<h1>Hello, User!</h1>
```

In a more complex example, a todo list:

```js
var todoList = shade(`
  <h2><content name="textContent">Default todo list title</content></h2>
  <ul>
    <content name="items" select="li" multiple>
      <li><em>You've nothing todo. Chill!</em></li>
    </content>
  </ul>
`);

var todoItem = shade(`
  <content name="textContent">Default todo item title</content>
  <button type="button">&times;</button>
`);

todoList('<section></section>')
  .items
  .append(todoItem('<li>Todo 1</li>'));
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
