(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/find-nodes-between'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/find-nodes-between'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.findNodesBetween);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _utilFindNodesBetween) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _findNodesBetween = _interopRequire(_utilFindNodesBetween);

  module.exports = function (content) {
    return Object.defineProperties({

      append: function append(newNode) {
        var reference = content.__startNode;
        reference.parentNode.insertBefore(newNode, reference);
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

      each: function each(fn) {
        this.all.forEach(fn);
        return this;
      },

      index: function index(item) {
        return this.all.indexOf(item);
      },

      prepend: function prepend(newNode) {
        var reference = content.__endNode;
        reference.parentNode.insertBefore(newNode, reference);
        return this;
      },

      remove: function remove(itemOrIndex) {
        if (typeof itemOrIndex === 'number') {
          itemOrIndex = this.at(index);
        }
        itemOrIndex.parentNode.removeChild(itemOrIndex);
        return this;
      }
    }, {
      all: {
        get: function () {
          return _findNodesBetween(content.__startNode, content.__stopNode);
        },
        configurable: true,
        enumerable: true
      }
    });
  };
});