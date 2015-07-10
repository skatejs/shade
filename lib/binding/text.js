(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/listen', '../util/prop-proxy'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/listen'), require('../util/prop-proxy'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiListen, global.utilPropProxy);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiListen, _utilPropProxy) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _apiListen2 = _interopRequireDefault(_apiListen);

  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

  module.exports = function (el, target) {
    var propName = target.getAttribute('text');
    target.textContent = el[propName];
    (0, _utilPropProxy2['default'])(el, propName);
    (0, _apiListen2['default'])(el, propName, function (e) {
      target.textContent = e.detail.value;
    });
  };
});