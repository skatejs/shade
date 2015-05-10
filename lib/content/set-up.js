(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './get', './make-property'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./get'), require('./make-property'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.getContent, global.makeProperty);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _get, _makeProperty) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _getContent = _interopRequire(_get);

  var _makeProperty2 = _interopRequire(_makeProperty);

  module.exports = function (el) {
    var contents = el.__contents = _getContent(el);
    contents.forEach(function (content) {
      var name = content.getAttribute('name') || 'content';
      var parentNode = content.parentNode;
      var startNode = document.createComment('');
      var stopNode = document.createComment('');

      content.__startNode = startNode;
      content.__stopNode = stopNode;
      parentNode.insertBefore(startNode, content);
      parentNode.insertBefore(stopNode, content);
      parentNode.removeChild(content);

      Object.defineProperty(el, name, _makeProperty2(content));
    });
  };
});