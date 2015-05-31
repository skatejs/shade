(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './api/bind', './api/bindings', './api/listen', './api/notify', './binding/checked', './binding/content', './binding/if', './binding/name', './binding/text', './util/fragment-from-string'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./api/bind'), require('./api/bindings'), require('./api/listen'), require('./api/notify'), require('./binding/checked'), require('./binding/content'), require('./binding/if'), require('./binding/name'), require('./binding/text'), require('./util/fragment-from-string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiBind, global.apiBindings, global.apiListen, global.apiNotify, global.bindingChecked, global.bindingContent, global.bindingIf, global.bindingName, global.bindingText, global.fragmentFromString);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiBind, _apiBindings, _apiListen, _apiNotify, _bindingChecked, _bindingContent, _bindingIf, _bindingName, _bindingText, _utilFragmentFromString) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _apiBind2 = _interopRequireDefault(_apiBind);

  var _apiBindings2 = _interopRequireDefault(_apiBindings);

  var _apiListen2 = _interopRequireDefault(_apiListen);

  var _apiNotify2 = _interopRequireDefault(_apiNotify);

  var _bindingChecked2 = _interopRequireDefault(_bindingChecked);

  var _bindingContent2 = _interopRequireDefault(_bindingContent);

  var _bindingIf2 = _interopRequireDefault(_bindingIf);

  var _bindingName2 = _interopRequireDefault(_bindingName);

  var _bindingText2 = _interopRequireDefault(_bindingText);

  var _fragmentFromString = _interopRequireDefault(_utilFragmentFromString);

  function shade() {
    function define() {
      var tmpHtml = arguments[0] === undefined ? '' : arguments[0];

      tmpHtml = tmpHtml.toString().trim();
      return function (el) {
        var initialContent;

        if (typeof el === 'string') {
          el = (0, _fragmentFromString['default'])(el).children[0];
        }

        initialContent = (0, _fragmentFromString['default'])(el.innerHTML);
        el.innerHTML = tmpHtml;

        _apiBindings2['default'].forEach(function (binding) {
          binding(el, initialContent);
        });

        return el;
      };
    }

    define.bind = _apiBind2['default'];
    define.bindings = _apiBindings2['default'];
    define.listen = _apiListen2['default'];
    define.notify = _apiNotify2['default'];

    define.bind('input[name][type="checkbox"]', _bindingChecked2['default']);
    define.bind('content, [content]', _bindingContent2['default']);
    define.bind('[if]', _bindingIf2['default']);
    define.bind('input[name][type="text"]', _bindingName2['default']);
    define.bind('[text]', _bindingText2['default']);

    return define;
  }

  module.exports = window.shade = shade;
});