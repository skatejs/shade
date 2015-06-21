(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../constants', '../util/fragment-from-collection', './content/make-property', '../util/trim', './content/wrap'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../constants'), require('../util/fragment-from-collection'), require('./content/make-property'), require('../util/trim'), require('./content/wrap'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.constants, global.fragmentFromCollection, global.makeProperty, global.trim, global.wrap);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _constants, _utilFragmentFromCollection, _contentMakeProperty, _utilTrim, _contentWrap) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _fragmentFromCollection = _interopRequireDefault(_utilFragmentFromCollection);

  var _makeProperty = _interopRequireDefault(_contentMakeProperty);

  var _trim = _interopRequireDefault(_utilTrim);

  var _wrap = _interopRequireDefault(_contentWrap);

  module.exports = function (el, target, initialContent) {
    var name = target.getAttribute('name') || _constants.DEFAULT_CONTENT_NAME;
    var parentNode = target.parentNode;
    var startNode = document.createComment('');
    var stopNode = document.createComment('');

    (0, _trim['default'])(target);

    // Cache data to refer to in the wrapper.
    target.__default = (0, _fragmentFromCollection['default'])(target.childNodes);
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

    Object.defineProperty(el, name, (0, _makeProperty['default'])(target));

    // Initialise.
    (0, _wrap['default'])(target).html = initialContent;
  };
});