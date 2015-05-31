(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/listen', '../util/prop-proxy', '../event/listen'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/listen'), require('../util/prop-proxy'), require('../event/listen'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiListen, global.utilPropProxy, global.eventListen);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiListen, _utilPropProxy, _eventListen) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _apiListen2 = _interopRequireDefault(_apiListen);

  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

  var _eventListen2 = _interopRequireDefault(_eventListen);

  module.exports = function (el, target) {
    var name = target.getAttribute('name');
    (0, _utilPropProxy2['default'])(el, name);
    (0, _apiListen2['default'])(el, name, function () {
      return target.value = el[name];
    });
    (0, _eventListen2['default'])(el, ['change', 'keyup'], function () {
      return el[name] = target.value;
    });
    el[name] = target.value;
  };
});