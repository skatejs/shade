"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

function _slicedToArray(arr, i) {
    if (Array.isArray(arr)) {
        return arr;
    } else if (Symbol.iterator in Object(arr)) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i)
                    break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"])
                    _i["return"]();
            } finally {
                if (_d)
                    throw _e;
            }
        }

        return _arr;
    } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
}

var _eventDispatch = require("../event/dispatch");
var _eventDispatch2 = _interopRequireDefault(_eventDispatch);

exports["default"] = function(el, target) {
    target.getAttribute("on").split(" ").forEach(function(pair) {
        var handlerFunc;
        var _pair$split = pair.split(":");
        var _pair$split2 = _slicedToArray(_pair$split, 2);
        var propName = _pair$split2[0];
        var handlerName = _pair$split2[1];
        handlerName = handlerName || "handle" + (propName[0].toUpperCase() + propName.substring(1));

        handlerFunc = (el[handlerName] || function(e) {
            (0, _eventDispatch2["default"])(this, handlerName, {
                bubbles: true,
                cancelable: true
            });

            e.preventDefault();
        }).bind(el);

        target.addEventListener(propName, function(e) {
            e.delegateTarget = target;
            handlerFunc(e);
        });
    });
};

module.exports = exports["default"];