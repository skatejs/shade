(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util/fragment-from-string', './content/set', './content/set-up'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util/fragment-from-string'), require('./content/set'), require('./content/set-up'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.fragmentFromString, global.setContent, global.setUpContent);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _utilFragmentFromString, _contentSet, _contentSetUp) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _fragmentFromString = _interopRequire(_utilFragmentFromString);

  var _setContent = _interopRequire(_contentSet);

  var _setUpContent = _interopRequire(_contentSetUp);

  module.exports = window.shade = function () {
    var tmpHtml = arguments[0] === undefined ? '' : arguments[0];

    tmpHtml = tmpHtml.toString().trim();
    return function (el) {
      var oldHtml;

      if (typeof el === 'string') {
        el = _fragmentFromString(el).children[0];
      }

      oldHtml = el.innerHTML;
      el.innerHTML = tmpHtml;
      _setUpContent(el);
      _setContent(el, oldHtml);

      return el;
    };
  };
});