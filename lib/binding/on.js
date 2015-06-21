(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../event/dispatch'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../event/dispatch'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.eventDispatch);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _eventDispatch) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

  var _eventDispatch2 = _interopRequireDefault(_eventDispatch);

  module.exports = function (el, target) {
    target.getAttribute('on').split(' ').forEach(function (pair) {
      var handlerFunc;

      var _pair$split = pair.split(':');

      var _pair$split2 = _slicedToArray(_pair$split, 2);

      var name = _pair$split2[0];
      var handlerName = _pair$split2[1];

      handlerName = handlerName || 'handle' + (name[0].toUpperCase() + name.substring(1));
      handlerFunc = (el[handlerName] || function (e) {
        (0, _eventDispatch2['default'])(this, handlerName, {
          bubbles: true,
          cancelable: true
        });
        e.preventDefault();
      }).bind(el);
      target.addEventListener(name, function (e) {
        e.delegateTarget = target;
        handlerFunc(e);
      });
    });
  };
});