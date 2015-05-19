(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../../event/notify', '../../util/find-nodes-between', '../../util/fragment-from-anything', '../../util/fragment-from-collection', '../../util/fragment-from-string'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../../event/notify'), require('../../util/find-nodes-between'), require('../../util/fragment-from-anything'), require('../../util/fragment-from-collection'), require('../../util/fragment-from-string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.eventNotify, global.findNodesBetween, global.fragmentFromAnything, global.fragmentFromCollection, global.fragmentFromString);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _eventNotify, _utilFindNodesBetween, _utilFragmentFromAnything, _utilFragmentFromCollection, _utilFragmentFromString) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _eventNotify2 = _interopRequire(_eventNotify);

  var _findNodesBetween = _interopRequire(_utilFindNodesBetween);

  var _fragmentFromAnything = _interopRequire(_utilFragmentFromAnything);

  var _fragmentFromCollection = _interopRequire(_utilFragmentFromCollection);

  var _fragmentFromString = _interopRequire(_utilFragmentFromString);

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

    function getFilteredNodes() {
      return content.__initialised ? [] : getAllNodes();
    }

    function removeDefaultNodes() {
      if (content.__initialised) {
        content.__initialised = false;
        getAllNodes().forEach(function (node) {
          node.parentNode.removeChild(node);
        });
      }
    }

    function notify() {
      _eventNotify2(content.__element, content.__name);
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
          notify();
        });
      },

      at: function at(index) {
        return getFilteredNodes()[index];
      },

      contains: function contains(node) {
        return content.__startNode.parentNode === node.parentNode;
      },

      each: function each(fn) {
        return getFilteredNodes().forEach(fn);
      },

      find: function find(query) {
        if (typeof query === 'object') {
          (function () {
            var oldQuery = query;
            query = function (item) {
              for (var a in oldQuery) {
                return item[a] === oldQuery[a];
              }
            };
          })();
        }

        return getFilteredNodes().filter(query);
      },

      index: function index(node) {
        return getFilteredNodes().indexOf(node);
      },

      insert: function insert(node, at) {
        var reference = getFilteredNodes()[at] || content.__stopNode;
        return this.accept(node, function (node) {
          reference.parentNode.insertBefore(node, reference);
          notify();
        });
      },

      map: function map(fn) {
        return getFilteredNodes().map(fn);
      },

      prepend: function prepend(node) {
        var reference = getFilteredNodes()[0] || content.__stopNode;
        this.accept(node, function (node) {
          reference.parentNode.insertBefore(node, reference);
          notify();
        });
        return this;
      },

      reduce: function reduce(fn, initialValue) {
        return getFilteredNodes().reduce(fn, initialValue);
      },

      remove: function remove(node) {
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

      removeAll: function removeAll() {
        getFilteredNodes().forEach(function (node) {
          node.parentNode.removeChild(node);
          notify();
        });
        addDefaultNodes();
        return this;
      }
    }, {
      html: {
        get: function () {
          return getFilteredNodes().reduce(function (prev, curr) {
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
          return getFilteredNodes().length;
        },
        configurable: true,
        enumerable: true
      },
      text: {
        get: function () {
          return getFilteredNodes().reduce(function (prev, curr) {
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