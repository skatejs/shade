(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './event'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.event);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _event) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _event2 = _interopRequireDefault(_event);

  module.exports = function (element, name, opts) {
    return element.dispatchEvent((0, _event2['default'])(name, opts));
  };
});