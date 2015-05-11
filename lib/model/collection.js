(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/find-nodes-between', '../util/fragment-from-string'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/find-nodes-between'), require('../util/fragment-from-string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.findNodesBetween, global.fragmentFromString);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _utilFindNodesBetween, _utilFragmentFromString) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _findNodesBetween = _interopRequire(_utilFindNodesBetween);

  var _fragmentFromString = _interopRequire(_utilFragmentFromString);

  function normalize(itemOrCollection) {
    if (!itemOrCollection) {
      return [];
    }

    if (typeof itemOrCollection === 'string') {
      itemOrCollection = _fragmentFromString(itemOrCollection).childNodes[0];
    }

    if (typeof itemOrCollection.length === 'number') {
      return itemOrCollection;
    }

    return [itemOrCollection];
  }

  module.exports = function (content) {
    return Object.defineProperties({

      append: function append(nodes) {
        normalize(nodes).forEach(function (node) {
          var reference = content.__stopNode;
          reference.parentNode.insertBefore(node, reference);
        });
        return this;
      },

      at: function at(index) {
        return this.all[index];
      },

      clear: function clear() {
        return this.each(function (item) {
          item.parentNode.removeChild(item);
        });
      },

      content: function content(_content) {
        return this.clear().append(_content);
      },

      each: function each(fn) {
        this.all.forEach(fn);
        return this;
      },

      index: function index(item) {
        return this.all.indexOf(item);
      },

      insert: function insert(nodes, at) {
        var that = this;
        normalize(nodes).forEach(function (node, index) {
          var reference = that.at(at + index);
          reference.parentNode.insertBefore(node, reference);
        });
        return this;
      },

      prepend: function prepend(nodes) {
        normalize(nodes).forEach(function (node) {
          var reference = content.__startNode;
          reference.parentNode.insertBefore(node, reference);
        });
        return this;
      },

      remove: function remove(itemOrIndex) {
        normalize(itemOrIndex).forEach(function (item) {
          item.parentNode.removeChild(item);
        });
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