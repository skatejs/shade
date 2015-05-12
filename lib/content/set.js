(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './get'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./get'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.getContent);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _get) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _getContent = _interopRequire(_get);

  module.exports = function (el, frag) {
    _getContent(el).forEach(function (content) {
      var name = content.getAttribute('name');
      var multiple = content.hasAttribute('multiple');
      var selector = content.getAttribute('selector');

      if (selector) {
        el[name] = multiple ? frag.querySelectorAll(selector) : frag.querySelector(selector);
      } else {
        el[name] = frag;
      }
    });
  };
});