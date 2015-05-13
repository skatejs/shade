(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/find-nodes-between', '../util/fragment-from-anything', '../util/fragment-from-collection', '../util/fragment-from-string'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/find-nodes-between'), require('../util/fragment-from-anything'), require('../util/fragment-from-collection'), require('../util/fragment-from-string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.findNodesBetween, global.fragmentFromAnything, global.fragmentFromCollection, global.fragmentFromString);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _utilFindNodesBetween, _utilFragmentFromAnything, _utilFragmentFromCollection, _utilFragmentFromString) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _findNodesBetween = _interopRequire(_utilFindNodesBetween);

  var _fragmentFromAnything = _interopRequire(_utilFragmentFromAnything);

  var _fragmentFromCollection = _interopRequire(_utilFragmentFromCollection);

  var _fragmentFromString = _interopRequire(_utilFragmentFromString);

  var Element = window.Element;
  var elProto = window.HTMLElement.prototype;
  var matches = elProto.matches || elProto.mozMatchesSelctor || elProto.msMatchesSelctor || elProto.oMatchesSelctor || elProto.webkitMatchesSelctor;

  module.exports = function (content) {
    function addDefaultNodes() {
      if (!content.__initialised) {
        content.__initialised = true;
        var reference = content.__stopNode;
        reference.parentNode.insertBefore(_fragmentFromString(content.__default), reference);
      }
    }

    function getAllNodes() {
      return _findNodesBetween(content.__startNode, content.__stopNode);
    }

    function removeDefaultNodes() {
      if (content.__initialised) {
        content.__initialised = false;
        getAllNodes().forEach(function (node) {
          node.parentNode.removeChild(node);
        });
      }
    }

    return Object.defineProperties({

      accept: function accept(node, callback) {
        node = _fragmentFromAnything(node);
        var selector = content.getAttribute('select');

        if (selector) {
          node = _fragmentFromCollection(node.querySelectorAll(selector));
        }

        if (node.childNodes.length) {
          removeDefaultNodes();
          callback(node);
        } else {
          addDefaultNodes();
        }

        return this;
      },

      append: function append(node) {
        var reference = content.__stopNode;
        return this.accept(node, function (node) {
          reference.parentNode.insertBefore(node, reference);
        });
      },

      contains: function contains(node) {
        return content.__startNode.parentNode === node.parentNode;
      },

      insert: function insert(node, at) {
        var reference = this.nodes[at] || content.__stopNode;
        return this.accept(node, function (node) {
          reference.parentNode.insertBefore(node, reference);
        });
      },

      prepend: function prepend(node) {
        var reference = this.nodes[0] || content.__stopNode;
        this.accept(node, function (node) {
          reference.parentNode.insertBefore(node, reference);
        });
        return this;
      },

      remove: function remove(node) {
        if (typeof node === 'number') {
          node = this.nodes[node];
        }

        if (this.contains(node)) {
          node.parentNode.removeChild(node);
        }

        return this;
      },

      removeAll: function removeAll() {
        this.nodes.forEach(function (item) {
          item.parentNode.removeChild(item);
        });
        addDefaultNodes();
        return this;
      }
    }, {
      elements: {
        get: function () {
          return this.nodes.filter(function (node) {
            return node.nodeType === 1;
          });
        },
        configurable: true,
        enumerable: true
      },
      html: {
        get: function () {
          return this.nodes.reduce(function (prev, curr) {
            return prev + curr.outerHTML;
          }, '');
        },
        set: function (value) {
          this.removeAll().append(value);
        },
        configurable: true,
        enumerable: true
      },
      length: {
        get: function () {
          return this.nodes.length;
        },
        configurable: true,
        enumerable: true
      },
      nodes: {
        get: function () {
          return content.__initialised ? [] : getAllNodes();
        },
        configurable: true,
        enumerable: true
      },
      text: {
        get: function () {
          return this.nodes.reduce(function (prev, curr) {
            return prev + curr.textContent;
          }, '');
        },
        set: function (value) {
          this.removeAll().append(document.createTextNode(value));
        },
        configurable: true,
        enumerable: true
      }
    });
  };
});