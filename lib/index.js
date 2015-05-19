(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './api/bind', './api/bindings', './api/listen', './api/notify', './binding/checked', './binding/content', './binding/name', './binding/text', './util/fragment-from-string'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./api/bind'), require('./api/bindings'), require('./api/listen'), require('./api/notify'), require('./binding/checked'), require('./binding/content'), require('./binding/name'), require('./binding/text'), require('./util/fragment-from-string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiBind, global.apiBindings, global.apiListen, global.apiNotify, global.bindingChecked, global.bindingContent, global.bindingName, global.bindingText, global.fragmentFromString);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiBind, _apiBindings, _apiListen, _apiNotify, _bindingChecked, _bindingContent, _bindingName, _bindingText, _utilFragmentFromString) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiBind2 = _interopRequire(_apiBind);

  var _apiBindings2 = _interopRequire(_apiBindings);

  var _apiListen2 = _interopRequire(_apiListen);

  var _apiNotify2 = _interopRequire(_apiNotify);

  var _bindingChecked2 = _interopRequire(_bindingChecked);

  var _bindingContent2 = _interopRequire(_bindingContent);

  var _bindingName2 = _interopRequire(_bindingName);

  var _bindingText2 = _interopRequire(_bindingText);

  var _fragmentFromString = _interopRequire(_utilFragmentFromString);

  function shade() {
    function define() {
      var tmpHtml = arguments[0] === undefined ? '' : arguments[0];

      tmpHtml = tmpHtml.toString().trim();
      return function (el) {
        var initialContent;

        if (typeof el === 'string') {
          el = _fragmentFromString(el).children[0];
        }

        initialContent = _fragmentFromString(el.innerHTML);
        el.innerHTML = tmpHtml;

        _apiBindings2.forEach(function (binding) {
          binding(el, initialContent);
        });

        return el;
      };
    }

    define.bind = _apiBind2;
    define.bindings = _apiBindings2;
    define.listen = _apiListen2;
    define.notify = _apiNotify2;

    define.bind('input[name][type="checkbox"]', _bindingChecked2);
    define.bind('content, [content]', _bindingContent2);
    define.bind('input[name][type="text"]', _bindingName2);
    define.bind('[text]', _bindingText2);

    return define;
  }

  module.exports = window.shade = shade;
});