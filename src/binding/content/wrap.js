import eventNotify from '../../event/notify';
import findNodesBetween from '../../util/find-nodes-between';
import fragmentFromAnything from '../../util/fragment-from-anything';
import fragmentFromCollection from '../../util/fragment-from-collection';
import fragmentFromString from '../../util/fragment-from-string';

export default function (content) {
  function addDefaultNodes () {
    if (!content.__initialised) {
      content.__initialised = true;
      let reference = content.__stopNode;
      reference.parentNode.insertBefore(fragmentFromString(content.__default), reference);
    }
  }

  function getAllNodes () {
    return findNodesBetween(content.__startNode, content.__stopNode);
  }

  function getFilteredNodes () {
    return content.__initialised ? [] : getAllNodes();
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
      return getFilteredNodes().reduce(function (prev, curr) {
        return prev + curr.outerHTML;
      }, '');
    },

    set html (value) {
      this.removeAll().append(value);
    },

    get length () {
      return getFilteredNodes().length;
    },

    get text () {
      return getFilteredNodes().reduce(function (prev, curr) {
        return prev + curr.textContent;
      }, '');
    },

    set text (value) {
      this.removeAll().append(document.createTextNode(value));
    },

    accept: function (node, callback) {
      node = fragmentFromAnything(node);
      var selector = content.getAttribute('select');

      if (selector) {
        node = fragmentFromCollection(node.querySelectorAll(selector));
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
      return getFilteredNodes()[index];
    },

    contains: function (node) {
      return content.__startNode.parentNode === node.parentNode;
    },

    each: function (fn) {
      return getFilteredNodes().forEach(fn);
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

      return getFilteredNodes().filter(query);
    },

    index: function (node) {
      return getFilteredNodes().indexOf(node);
    },

    insert: function (node, at) {
      var reference = getFilteredNodes()[at] || content.__stopNode;
      return this.accept(node, function (node) {
        reference.parentNode.insertBefore(node, reference);
        notify();
      });
    },

    map: function (fn) {
      return getFilteredNodes().map(fn);
    },

    prepend: function (node) {
      var reference = getFilteredNodes()[0] || content.__stopNode;
      this.accept(node, function (node) {
        reference.parentNode.insertBefore(node, reference);
        notify();
      });
      return this;
    },

    reduce: function (fn, initialValue) {
      return getFilteredNodes().reduce(fn, initialValue);
    },

    remove: function (node) {
      if (typeof node === 'number') {
        node = getFilteredNodes()[node];
      }

      if (this.contains(node)) {
        node.parentNode.removeChild(node);
        notify();
      }

      if (!getFilteredNodes().length) {
        addDefaultNodes();
      }

      return this;
    },

    removeAll: function () {
      getFilteredNodes().forEach(function (node) {
        node.parentNode.removeChild(node);
        notify();
      });
      addDefaultNodes();
      return this;
    }
  };
}
