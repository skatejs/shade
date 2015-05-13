(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './get', './wrap'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./get'), require('./wrap'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.getContent, global.wrap);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _get, _wrap) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _getContent = _interopRequire(_get);

  var _wrap2 = _interopRequire(_wrap);

  module.exports = function (el, html) {
    _getContent(el).forEach(function (content) {
      _wrap2(content).html = html;
    });
  };
});