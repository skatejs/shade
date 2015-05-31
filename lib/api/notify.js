(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../event/notify'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../event/notify'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.eventNotify);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _eventNotify) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _eventNotify2 = _interopRequireDefault(_eventNotify);

  module.exports = function (name) {
    return function (el) {
      (0, _eventNotify2['default'])(el, name);
    };
  };
});