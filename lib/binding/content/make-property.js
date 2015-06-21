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
        var name = content.getAttribute('name') || 'textContent';
        var nodes = (0, _wrap2['default'])(content);

        if (name === 'textContent' || content.hasAttribute('text')) {
          return nodes.text;
        } else if (name === 'innerHTML' || content.hasAttribute('html')) {
          return nodes.html;
        }

        return content.hasAttribute('multiple') ? nodes : nodes.nodes[0] || null;
      },
      set: function set(value) {
        var name = content.getAttribute('name');
        var text = content.hasAttribute('text');
        (0, _wrap2['default'])(content)[name === 'textContent' || text ? 'text' : 'html'] = value;
      }
    };
  };
});