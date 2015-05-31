(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/listen', '../event/notify', './parse-args'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/listen'), require('../event/notify'), require('./parse-args'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiListen, global.eventNotify, global.utilParseArgs);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiListen, _eventNotify, _parseArgs) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _apiListen2 = _interopRequireDefault(_apiListen);

  var _eventNotify2 = _interopRequireDefault(_eventNotify);

  var _utilParseArgs = _interopRequireDefault(_parseArgs);

  module.exports = function (el, name) {
    var descriptor = Object.getOwnPropertyDescriptor(el.constructor.prototype, name);
    var links = [];
    var value = el.getAttribute(name);

    if (descriptor && !descriptor.configurable) {
      return;
    }

    if (descriptor && descriptor.get) {
      links = (0, _utilParseArgs['default'])(descriptor.get);
      links.forEach(function (link) {
        (0, _apiListen2['default'])(el, link, _eventNotify2['default'].bind(null, el, name));
      });
    }

    return Object.defineProperty(el, name, {
      configurable: true,
      get: function get() {
        var that = this;
        if (descriptor && descriptor.get) {
          return descriptor.get.apply(this, links.map(function (link) {
            return that[link];
          }));
        } else {
          return value;
        }
      },
      set: function set(newValue) {
        if (descriptor && descriptor.set) {
          descriptor.set.call(this, newValue);
        } else {
          value = newValue;
        }

        (0, _eventNotify2['default'])(this, name);
      }
    });
  };
});