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

  function pxIfNumber(val) {
    return typeof val === 'number' ? val + 'px' : val;
  }

  module.exports = function (el, target) {
    target.getAttribute('sh-style').split(' ').forEach(function (part) {
      var parts = part.split(':');
      var attrName = parts[0];
      var propName = parts[1] || attrName;

      target.style[attrName] = pxIfNumber(el[propName]);
      el.addEventListener('skate.property', function (e) {
        if (propName !== e.name) {
          return;
        }
        target.style[attrName] = pxIfNumber(e.detail.newValue);
      });
    });
  };
});