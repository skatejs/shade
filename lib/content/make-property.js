(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './wrap'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./wrap'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.wrap);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _wrap) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _wrap2 = _interopRequire(_wrap);

  module.exports = function (content) {
    return {
      get: function get() {
        var name = content.__name;
        var nodes = _wrap2(content);

        if (name === 'textContent') {
          return nodes.text;
        } else if (name === 'innerHTML') {
          return nodes.html;
        }

        return content.hasAttribute('multiple') ? nodes : nodes.nodes[0] || null;
      },

      set: function set(value) {
        _wrap2(content).html = value;
      }
    };
  };
});