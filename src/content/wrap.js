import findNodesBetween from '../util/find-nodes-between';
import fragmentFromAnything from '../util/fragment-from-anything';
import fragmentFromCollection from '../util/fragment-from-collection';
import fragmentFromString from '../util/fragment-from-string';

var Element = window.Element;
var elProto = window.HTMLElement.prototype;
var matches = elProto.matches ||
  elProto.mozMatchesSelctor ||
  elProto.msMatchesSelctor ||
  elProto.oMatchesSelctor ||
  elProto.webkitMatchesSelctor;

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

  function removeDefaultNodes () {
    if (content.__initialised) {
      content.__initialised = false;
      getAllNodes().forEach(function (node) {
        node.parentNode.removeChild(node);
      });
    }
  }

  return {
    get elements () {
      return this.nodes.filter(function (node) {
        return node.nodeType === 1;
      });
    },

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
      return content.__initialised ? [] : getAllNodes();
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
      });
    },

    contains: function (node) {
      return content.__startNode.parentNode === node.parentNode;
    },

    insert: function (node, at) {
      var reference = this.nodes[at] || content.__stopNode;
      return this.accept(node, function (node) {
        reference.parentNode.insertBefore(node, reference);
      });
    },

    prepend: function (node) {
      var reference = this.nodes[0] || content.__stopNode;
      this.accept(node, function (node) {
        reference.parentNode.insertBefore(node, reference);
      });
      return this;
    },

    remove: function (node) {
      if (typeof node === 'number') {
        node = this.nodes[node];
      }

      if (this.contains(node)) {
        node.parentNode.removeChild(node);
      }

      return this;
    },

    removeAll: function () {
      this.nodes.forEach(function (item) {
        item.parentNode.removeChild(item);
      });
      addDefaultNodes();
      return this;
    }
  };
}
