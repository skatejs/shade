(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/find-nodes-between', '../util/fragment-from-anything'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/find-nodes-between'), require('../util/fragment-from-anything'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.findNodesBetween, global.fragmentFromAnything);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _utilFindNodesBetween, _utilFragmentFromAnything) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _findNodesBetween = _interopRequire(_utilFindNodesBetween);

  var _fragmentFromAnything = _interopRequire(_utilFragmentFromAnything);

  module.exports = function (content) {
    return Object.defineProperties({

      append: function append(node) {
        var reference = content.__stopNode;
        reference.parentNode.insertBefore(_fragmentFromAnything(node), reference);
        return this;
      },

      at: function at(index) {
        return this.all[index];
      },

      clear: function clear() {
        this.all.forEach(function (item) {
          item.parentNode.removeChild(item);
        });
        return this;
      },

      content: function content(_content) {
        return this.clear().append(_content);
      },

      index: function index(node) {
        return this.all.indexOf(node);
      },

      insert: function insert(node, at) {
        var that = this;
        var reference = this.at(at) || content.__stopNode;
        reference.parentNode.insertBefore(_fragmentFromAnything(node), reference);
        return this;
      },

      prepend: function prepend(node) {
        var reference = this.at(0) || content.__stopNode;
        reference.parentNode.insertBefore(_fragmentFromAnything(node), reference);
        return this;
      },

      remove: function remove(node) {
        node = _fragmentFromAnything(node, this.all);
        var parent = node.parentNode;
        parent && parent.removeChild(node);
        return this;
      }
    }, {
      all: {
        get: function () {
          return _findNodesBetween(content.__startNode, content.__stopNode);
        },
        configurable: true,
        enumerable: true
      },
      length: {
        get: function () {
          return this.all.length;
        },
        configurable: true,
        enumerable: true
      }
    });
  };
});