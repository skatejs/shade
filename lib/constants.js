(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.unknown = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var DEFAULT_CONTENT_NAME = 'textContent';
  exports.DEFAULT_CONTENT_NAME = DEFAULT_CONTENT_NAME;
});