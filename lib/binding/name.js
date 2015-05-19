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

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiListen2 = _interopRequire(_apiListen);

  var _utilPropProxy2 = _interopRequire(_utilPropProxy);

  var _eventListen2 = _interopRequire(_eventListen);

  module.exports = function (el, target) {
    var name = target.getAttribute('name');

    _utilPropProxy2(el, name);

    _apiListen2(el, name, function () {
      target.value = el[name];
    });

    _eventListen2(el, ['change', 'keyup'], function () {
      el[name] = target.value;
    });

    el[name] = target.value;
  };
});