(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './fragment-from-collection'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./fragment-from-collection'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.fragmentFromCollection);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _fragmentFromCollection) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _fragmentFromCollection2 = _interopRequireDefault(_fragmentFromCollection);

  var specialMap = {
    caption: 'table',
    dd: 'dl',
    dt: 'dl',
    li: 'ul',
    tbody: 'table',
    td: 'tr',
    thead: 'table',
    tr: 'tbody'
  };

  function matchTag(dom) {
    var tag = dom.match(/\s*<([^\s>]+)/);
    return tag && tag[1] || 'div';
  }

  function resolveCorrectDomParent(dom) {
    return resolveCorrectTagParents(matchTag(dom));
  }

  function resolveCorrectTagParents(tag) {
    var mapped;
    var parent = document.createElement(tag);

    while (mapped = specialMap[parent.tagName.toLowerCase()]) {
      var tempParent = document.createElement(mapped);
      tempParent.appendChild(parent);
      parent = tempParent;
    }

    return parent;
  }

  module.exports = function (dom) {
    var par = resolveCorrectDomParent(dom);
    par.innerHTML = dom;
    return (0, _fragmentFromCollection2['default'])(par.childNodes);
  };
});