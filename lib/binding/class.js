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

  function classList(el) {
    return el.classList || (function () {
      function classNames() {
        return el.className.split(' ');
      }

      return {
        add: function add(className) {
          if (classNames().indexOf(className) === -1) {
            el.className = el.className ? ' ' + className : className;
          }
        },
        remove: function remove(className) {
          var names = classNames();
          var index = names.indexOf(className);

          if (index > -1) {
            names.splice(index, 1);
            el.className = names.join(' ');
          }
        }
      };
    })();
  }

  module.exports = function (el, target) {
    target.getAttribute('sh-class').split(' ').forEach(function (part) {
      var parts = part.split(':');
      var propName = parts[0];
      var className = parts[1];

      function toggle(newValue, oldValue) {
        if (newValue) {
          classList(target).add(className || newValue);
        } else {
          classList(target).remove(className || oldValue);
        }
      }

      toggle(el[propName]);
      el.addEventListener('skate.property', function (e) {
        if (propName !== e.detail.name) {
          return;
        }
        toggle(e.detail.newValue);
      });
    });
  };
});