ShadeJS
=======

Shade is a simple templating engine based on Shadow DOM concepts. It uses the same `<content>` elements and `select="selector"` attributes to project content but uses getters and setters to get / set your content.

```js
var hello = shade(`
  Hello, <content></content>!
`);

document.body.appendChild(hello('<h1>User</h1>'));
```

Produces:

```html
<h1>Hello, User!</h1>
```

## `shade()` function

The `shade()` function is the entry point to the API. It returns you a function that you call on an element or HTML string.

If you give it an element, it returns the element that you passed in:

```js
var tmp = shade('<content></content>');
var div = document.createElement('div');

// true
console.log(div === tmp(div));
```

If you give it an HTML string, it returns the first element you passed in. This helps reduce some boilerplate.

```js
var tmp = shade('<content></content>');
var div = tmp('<div id="test">test</div><wont-get-captured></wont-get-captured>');

// <div id="test">test</div>
console.log(div);
```

## The `<content>` element

The `<content>` element is a standard Shadow DOM element that is used to project content from the Light DOM to where it resides in the Shadow DOM when it produces the Rendered DOM.

*If you don't know what the Shadow DOM is, check out a great introduction over at [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/).*

### Placeholders

When your template is rendered, each `<content>` element is replaced by placeholders that indicate the start of a content node and end of a content node. These placeholders are comment nodes and will show up in your HTML. There's no other feasible way to keep track of where content should go so try not to mess with them.

*Placeholders are left out of the example output in this documentation.*

### Specifying default content

As with native Shadow DOM, the inner content that you specify as part of your `<content>` element definition is displayed if you haven't specified any custom content for that node.

```js
var tmp = shade('<content>Default content</content>');
var div = tmp('<div></div>');

// <div>Default content</div>
console.log(div);

div.textContent = 'Custom content';

// <div>Custom content</div>
console.log(div);
```

### Attributes

Shade supports the standard `select` attribute available to the `<content>` element as well as some custom ones that allow you to further describe the behaviour of your template.

### `multiple`

- **Boolean**: Yes
- **Default**: Not present
- **Standard**: No

The `multiple` attribute specifies whether or not the content node accepts more than one node based on its presence.

When not present, any content set will only have the first child applied to the content node. When retrieved the first child of the content node will be returned.

When present, All the content you've specified will be set. When you get, it will return a mutable collection of nodes. When changes are made to the collection they will automatically update the DOM. When changes are made to the DOM, they are immediately reflected in the collection.

### `name`

- **Boolean**: No
- **Default**: `textContent`
- **Standard**: No

The `name` attribute specifies the name of the accessor property on the templated node that will be used to get and set content. The behaviour of this property depends on whether or not the `multiple` attribute is present. The property will either return you a `DOMNode` or a mutable collection.

### `select`

- **Boolean**: No
- **Default**: `*`
- **Standard**: Yes

The `select` attribute does the same thing as the standard `select` attribute as defined in the Shadow DOM Spec. If omitted, or is empty, it receives all content that is set via its accessor. If specified, content set via the accessor will be filtered and only matching nodes will be set.

## Mutable collection

When you have a `<content multiple>` element and you get the content from it, it will return you a mutable collection. This is just a simple wrapper of properties and methods that allow you to easily manipulate the content that is supposed to go there. It is also considered "live". Modifications to it will reflect in the DOM and modifications to the DOM will be reflected in it.

### Properties

#### `all`

Returns a raw array of the nodes in the collection.

#### `length`

Returns the length of the collection.

### Methods

#### `append (nodeNodesOrHtml)`

Appends a node, nodes or HTML to the end of the collection.

#### `at`

Returns the node at the specified index.

#### `clear`

Removes all items in the collection.

#### `content (node)`

Clears the collection and appends the specified content to it.

#### `each (fn)`

Executes `fn` for each element in the collection passing in the node as the first argument and index as the second.

#### `index (node)`

Returns the index of the specified node.

#### `insert (nodeNodesOrHtml, at)`

Inserts a node, nodes or HTML at the specified index.

#### `prepend (nodeNodesOrHtml)`

Appends a node, nodes or HTML to the collection.

#### `remove (nodeNodesOrIndicies)`

Removes the node or nodes from the collection.

## Todo list example

```js
var todoList = shade(`
  <h2><content>My todo list</content></h2>
  <ul>
    <content name="items" select="li" multiple>
      <li><em>You've nothing todo. Chill!</em></li>
    </content>
  </ul>
`);

var todoItem = shade(`
  <content>Do something</content>
  <button type="button">&times;</button>
`);

var stuff = todoList('<section>Stuff I need to do</section>');
stuff.items
  .append(todoItem('<li>Get milk</li>'))
  .append(todoItem('<li>Get bacon</li>'));
```
