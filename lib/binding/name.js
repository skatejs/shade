(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/listen', '../event/listen', '../util/prop-proxy'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/listen'), require('../event/listen'), require('../util/prop-proxy'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiListen, global.eventListen, global.utilPropProxy);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiListen, _eventListen, _utilPropProxy) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _apiListen2 = _interopRequireDefault(_apiListen);

  var _eventListen2 = _interopRequireDefault(_eventListen);

  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

  module.exports = function (el, target) {
    var propName = target.getAttribute('name');
    (0, _utilPropProxy2['default'])(el, propName);
    (0, _apiListen2['default'])(el, propName, function (e) {
      target.value = e.detail.value || '';
    });
    (0, _eventListen2['default'])(el, ['change', 'keyup'], function () {
      return el[propName] = target.value;
    });
    el[propName] = target.value;
  };
});