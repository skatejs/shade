(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './fragment-from-collection', './fragment-from-node', './fragment-from-string'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./fragment-from-collection'), require('./fragment-from-node'), require('./fragment-from-string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.fragmentFromCollection, global.fragmentFromNode, global.fragmentFromString);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _fragmentFromCollection, _fragmentFromNode, _fragmentFromString) {
  'use strict';

  module.exports = fragmentFromAnything;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _fragmentFromCollection2 = _interopRequireDefault(_fragmentFromCollection);

  var _fragmentFromNode2 = _interopRequireDefault(_fragmentFromNode);

  var _fragmentFromString2 = _interopRequireDefault(_fragmentFromString);

  var DocumentFragment = window.DocumentFragment;
  var Node = window.Node;
  var NodeList = window.NodeList;

  function fragmentFromAnything(item) {
    if (!item) {
      return document.createDocumentFragment();
    }

    if (typeof item === 'string') {
      return (0, _fragmentFromString2['default'])(item);
    }

    if (item instanceof DocumentFragment) {
      return item;
    }

    if (item instanceof Node) {
      return (0, _fragmentFromNode2['default'])(item);
    }

    if (item instanceof NodeList) {
      return (0, _fragmentFromCollection2['default'])(item);
    }

    if (typeof item.length === 'number') {
      return [].reduce.call(item, function (prev, curr) {
        prev.appendChild(fragmentFromAnything(curr));
        return prev;
      }, document.createDocumentFragment());
    }

    return item;
  }
});