(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.unknown = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  var regexArgComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var regexArgNames = /([^\s,]+)/g;

  module.exports = function (func) {
    var fnStr = func.toString().replace(regexArgComments, '');

    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(regexArgNames);

    if (result === null) {
      result = [];
    }

    return result;
  };
});