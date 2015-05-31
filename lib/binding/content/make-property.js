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

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _wrap2 = _interopRequireDefault(_wrap);

  module.exports = function (content) {
    return {
      configurable: true,
      get: function get() {
        var name = content.__name;
        var nodes = (0, _wrap2['default'])(content);

        if (name === 'textContent') {
          return nodes.text;
        } else if (name === 'innerHTML') {
          return nodes.html;
        }

        return content.hasAttribute('multiple') ? nodes : nodes.nodes[0] || null;
      },
      set: function set(value) {
        (0, _wrap2['default'])(content)[content.__name === 'textContent' ? 'text' : 'html'] = value;
      }
    };
  };
});