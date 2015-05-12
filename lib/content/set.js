(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/fragment-from-string', './get'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/fragment-from-string'), require('./get'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.fragmentFromString, global.getContent);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _utilFragmentFromString, _get) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _fragmentFromString = _interopRequire(_utilFragmentFromString);

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