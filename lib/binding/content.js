(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../constants', './content/make-property', './content/wrap'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../constants'), require('./content/make-property'), require('./content/wrap'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.constants, global.makeProperty, global.wrap);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _constants, _contentMakeProperty, _contentWrap) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _makeProperty = _interopRequire(_contentMakeProperty);

  var _wrap = _interopRequire(_contentWrap);

  module.exports = function (el, target, initialContent) {
    var name = target.getAttribute('name') || _constants.DEFAULT_CONTENT_NAME;
    var parentNode = target.parentNode;
    var startNode = document.createComment('');
    var stopNode = document.createComment('');

    // Cache data to refer to in the wrapper.
    target.__default = target.innerHTML.trim();
    target.__element = el;
    target.__initialised = false;
    target.__name = name;
    target.__startNode = startNode;
    target.__stopNode = stopNode;

    // Set up placeholders.
    if (target.tagName === 'CONTENT') {
      parentNode.insertBefore(startNode, target);
      parentNode.insertBefore(stopNode, target);
      parentNode.removeChild(target);
    } else {
      target.innerHTML = '';
      target.appendChild(startNode);
      target.appendChild(stopNode);
    }

    Object.defineProperty(el, name, _makeProperty(target));

    // Initialise.
    _wrap(target).html = initialContent;
  };
});