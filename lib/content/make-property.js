(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../model/collection', '../util/find-nodes-between', '../util/fragment-from-collection', '../util/fragment-from-string'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../model/collection'), require('../util/find-nodes-between'), require('../util/fragment-from-collection'), require('../util/fragment-from-string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.collection, global.findNodesBetween, global.fragmentFromCollection, global.fragmentFromString);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _modelCollection, _utilFindNodesBetween, _utilFragmentFromCollection, _utilFragmentFromString) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _collection = _interopRequire(_modelCollection);

  var _findNodesBetween = _interopRequire(_utilFindNodesBetween);

  var _fragmentFromCollection = _interopRequire(_utilFragmentFromCollection);

  var _fragmentFromString = _interopRequire(_utilFragmentFromString);

  var Node = window.Node;
  var NodeList = window.NodeList;

  module.exports = function (content) {
    return {
      get: function get() {
        var nodes = _collection(content);
        return content.hasAttribute('multiple') ? nodes : nodes.at(0) || null;
      },

      set: function set(value) {
        var coll = _collection(content);
        var multiple = content.hasAttribute('multiple');
        var selector = content.getAttribute('select');

        // Initial creation of document fragment so that we can filter.
        if (typeof value === 'string') {
          value = _fragmentFromString(value);
        } else if (typeof value.length === 'number') {
          value = _fragmentFromCollection(value);
        } else {
          value = _fragmentFromCollection([value]);
        }

        // Filtering of fragment nodes.
        if (multiple) {
          value = selector ? value.querySelectorAll(selector) : value.childNodes;
        } else {
          value = selector ? value.querySelector(selector) : value.childNodes[0];
        }

        // Creation of a new fragment that can be inserted.
        if (value instanceof NodeList) {
          value = _fragmentFromCollection(value);
        } else if (value instanceof Node) {
          value = _fragmentFromCollection([value]);
        } else {
          value = _fragmentFromString(content.innerHTML);
        }

        // Value should default to the default content.
        if (!value.childNodes.length) {
          value = content.innerHTML;
        }

        coll.content(value);
      }
    };
  };
});