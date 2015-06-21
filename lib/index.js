(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './api/bind', './api/bindings', './api/listen', './api/notify', './binding/attr', './binding/checked', './binding/class', './binding/content', './binding/if', './binding/ifnot', './binding/name', './binding/on', './binding/style', './binding/text', './util/fragment-from-collection', './util/fragment-from-string'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./api/bind'), require('./api/bindings'), require('./api/listen'), require('./api/notify'), require('./binding/attr'), require('./binding/checked'), require('./binding/class'), require('./binding/content'), require('./binding/if'), require('./binding/ifnot'), require('./binding/name'), require('./binding/on'), require('./binding/style'), require('./binding/text'), require('./util/fragment-from-collection'), require('./util/fragment-from-string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiBind, global.apiBindings, global.apiListen, global.apiNotify, global.bindingAttr, global.bindingChecked, global.bindingClass, global.bindingContent, global.bindingIf, global.bindingIfnot, global.bindingName, global.bindingOn, global.bindingStyle, global.bindingText, global.fragmentFromCollection, global.fragmentFromString);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiBind, _apiBindings, _apiListen, _apiNotify, _bindingAttr, _bindingChecked, _bindingClass, _bindingContent, _bindingIf, _bindingIfnot, _bindingName, _bindingOn, _bindingStyle, _bindingText, _utilFragmentFromCollection, _utilFragmentFromString) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _apiBind2 = _interopRequireDefault(_apiBind);

  var _apiBindings2 = _interopRequireDefault(_apiBindings);

  var _apiListen2 = _interopRequireDefault(_apiListen);

  var _apiNotify2 = _interopRequireDefault(_apiNotify);

  var _bindingAttr2 = _interopRequireDefault(_bindingAttr);

  var _bindingChecked2 = _interopRequireDefault(_bindingChecked);

  var _bindingClass2 = _interopRequireDefault(_bindingClass);

  var _bindingContent2 = _interopRequireDefault(_bindingContent);

  var _bindingIf2 = _interopRequireDefault(_bindingIf);

  var _bindingIfnot2 = _interopRequireDefault(_bindingIfnot);

  var _bindingName2 = _interopRequireDefault(_bindingName);

  var _bindingOn2 = _interopRequireDefault(_bindingOn);

  var _bindingStyle2 = _interopRequireDefault(_bindingStyle);

  var _bindingText2 = _interopRequireDefault(_bindingText);

  var _fragmentFromCollection = _interopRequireDefault(_utilFragmentFromCollection);

  var _fragmentFromString = _interopRequireDefault(_utilFragmentFromString);

  var DocumentFragment = window.DocumentFragment;

  function create() {
    function define() {
      var tmpHtml = arguments[0] === undefined ? '' : arguments[0];

      tmpHtml = tmpHtml.toString().trim();
      return function (elem) {
        var initialContent;
        elem = elem || this;
        elem = typeof elem === 'string' ? (0, _fragmentFromString['default'])(elem) : elem;
        elem = elem instanceof DocumentFragment ? elem.children.item(0) : elem;
        initialContent = (0, _fragmentFromCollection['default'])(elem.childNodes);
        elem.innerHTML = tmpHtml;
        _apiBindings2['default'].forEach(function (binding) {
          return binding(elem, initialContent);
        });
        return elem;
      };
    }

    define.bind = _apiBind2['default'];
    define.bindings = _apiBindings2['default'];
    define.listen = _apiListen2['default'];
    define.notify = _apiNotify2['default'];

    define.bind('[attr]', _bindingAttr2['default']);
    define.bind('[name][type="checkbox"]', _bindingChecked2['default']);
    define.bind('content, [content]', _bindingContent2['default']);
    define.bind('[if]', _bindingIf2['default']);
    define.bind('[ifnot]', _bindingIfnot2['default']);
    define.bind('textarea[name], input[type="text"][name]', _bindingName2['default']);
    define.bind('[on]', _bindingOn2['default']);
    define.bind('[sh-class]', _bindingClass2['default']);
    define.bind('[sh-style]', _bindingStyle2['default']);
    define.bind('[text]', _bindingText2['default']);

    return define;
  }

  var shade = create();
  shade.create = create;
  module.exports = window.shade = shade;
});