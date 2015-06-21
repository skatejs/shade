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

  module.exports = function (el, target) {
    var name = target.getAttribute('text');
    target.textContent = el[name];
    el.addEventListener('skate.property', function (e) {
      if (name !== e.detail.name) {
        return;
      }
      target.textContent = e.detail.newValue;
    });
  };
});