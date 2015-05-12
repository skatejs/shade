(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util/fragment-from-anything', './content/set', './content/set-up'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util/fragment-from-anything'), require('./content/set'), require('./content/set-up'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.fragmentFromAnything, global.setContent, global.setUpContent);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _utilFragmentFromAnything, _contentSet, _contentSetUp) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _fragmentFromAnything = _interopRequire(_utilFragmentFromAnything);

  var _setContent = _interopRequire(_contentSet);

  var _setUpContent = _interopRequire(_contentSetUp);

  module.exports = window.shade = function (tmp) {
    var tmpFrag = _fragmentFromAnything(tmp);

    return function (el) {
      var oldHtml = el.innerHTML;
      var oldFrag = _fragmentFromAnything(oldHtml);

      el.innerHTML = '';
      el.appendChild(tmpFrag);
      _setUpContent(el);
      _setContent(el, oldFrag);

      return el;
    };
  };
});