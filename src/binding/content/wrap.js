import eventNotify from '../../event/notify';
import findNodesBetween from '../../util/find-nodes-between';
import fragmentFromAnything from '../../util/fragment-from-anything';
import fragmentFromCollection from '../../util/fragment-from-collection';

export default function (content) {
  function addDefaultNodes () {
    if (!content.__initialised) {
      content.__initialised = true;
      let reference = content.__stopNode;
      reference.parentNode.insertBefore(content.__default.cloneNode(true), reference);
    }
  }

  function getAllNodes () {
    return findNodesBetween(content.__startNode, content.__stopNode);
  }

  function removeDefaultNodes () {
    if (content.__initialised) {
      content.__initialised = false;
      getAllNodes().forEach(function (node) {
        node.parentNode.removeChild(node);
      });
    }
  }

  function notify () {
    eventNotify(content.__element, content.__name);
  }

  return {
    get html () {
      return this.nodes.reduce(function (prev, curr) {
        return prev + curr.outerHTML;
      }, '');
    },

    set html (value) {
      this.removeAll().append(value);
    },

    get length () {
      return this.nodes.length;
    },

    get nodes () {
      return getAllNodes();
    },

    get text () {
      return this.nodes.reduce(function (prev, curr) {
        return prev + curr.textContent;
      }, '');
    },

    set text (value) {
      this.removeAll().append(document.createTextNode(value));
    },

    accept: function (node, callback) {
      node = fragmentFromAnything(node);
      var selector = content.getAttribute('select');
      var wrap = content.getAttribute('wrap');

      if (selector) {
        node = fragmentFromCollection(node.querySelectorAll(selector));
      }

      if (wrap) {
        for (let a = 0; a < node.children.length; a++) {
          let wrapper = document.createElement('li');
          wrapper.appendChild(node.children[a]);
          node.insertBefore(wrapper, node.children[a]);
        }
      }

      if (node.childNodes.length) {
        removeDefaultNodes();
        callback(node);
      } else {
        addDefaultNodes();
      }

      return this;
    },

    append: function (node) {
      var reference = content.__stopNode;
      return this.accept(node, function (node) {
        reference.parentNode.insertBefore(node, reference);
        notify();
      });
    },

    at: function (index) {
      return this.nodes[index];
    },

    contains: function (node) {
      return content.__startNode.parentNode === node.parentNode;
    },

    each: function (fn) {
      return this.nodes.forEach(fn);
    },

    find: function (query) {
      if (typeof query === 'object') {
        let oldQuery = query;
        query = function (item) {
          for (let a in oldQuery) {
            return item[a] === oldQuery[a];
          }
        };
      }

      return this.nodes.filter(query);
    },

    index: function (node) {
      return this.nodes.indexOf(node);
    },

    insert: function (node, at) {
      var reference = this.nodes[at] || content.__stopNode;
      return this.accept(node, function (node) {
        reference.parentNode.insertBefore(node, reference);
        notify();
      });
    },

    map: function (fn) {
      return this.nodes.map(fn);
    },

    prepend: function (node) {
      var reference = this.nodes[0] || content.__stopNode;
      this.accept(node, function (node) {
        reference.parentNode.insertBefore(node, reference);
        notify();
      });
      return this;
    },

    reduce: function (fn, initialValue) {
      return this.nodes.reduce(fn, initialValue);
    },

    remove: function (node) {
      if (typeof node === 'number') {
        node = this.nodes[node];
      }

      if (this.contains(node)) {
        node.parentNode.removeChild(node);
        notify();
      }

      if (!this.nodes.length) {
        addDefaultNodes();
      }

      return this;
    },

    removeAll: function () {
      this.nodes.forEach(function (node) {
        node.parentNode.removeChild(node);
        notify();
      });
      addDefaultNodes();
      return this;
    }
  };
}
