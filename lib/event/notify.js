(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './dispatch', '../constants'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./dispatch'), require('../constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.dispatch, global.constants);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _dispatch, _constants) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _dispatch2 = _interopRequire(_dispatch);

  module.exports = function (el, name) {
    var opts = {
      bubbles: false,
      cancellable: false,
      detail: {
        name: name,
        value: el[name]
      }
    };

    _dispatch2(el, _constants.PROPERTY_EVENT_NAME, opts);

    if (opts.detail.name) {
      _dispatch2(el, '' + _constants.PROPERTY_EVENT_NAME + '.' + opts.detail.name, opts);
    }
  };
});