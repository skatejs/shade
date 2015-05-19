(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './bindings', '../util/find'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./bindings'), require('../util/find'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.bindings, global.find);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _bindings, _utilFind) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _bindings2 = _interopRequire(_bindings);

  var _find = _interopRequire(_utilFind);

  module.exports = function (selector, fn) {
    _bindings2.push(function (el, initialContent) {
      _find(el, selector).forEach(function (target) {
        fn(el, target, initialContent);
      });
    });

    return this;
  };
});