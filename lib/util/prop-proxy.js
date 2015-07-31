"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _apiListen = require("../api/listen");
var _apiListen2 = _interopRequireDefault(_apiListen);
var _eventNotify = require("../event/notify");
var _eventNotify2 = _interopRequireDefault(_eventNotify);
var _parseArgs = require("./parse-args");
var _parseArgs2 = _interopRequireDefault(_parseArgs);
var getDescriptor = Object.getOwnPropertyDescriptor;

function resolveDescriptor(el, name) {
    return getDescriptor(el, name);
}

exports["default"] = function(el, name) {
    var descriptor = resolveDescriptor(el, name);
    var links = [];
    var value = el.getAttribute(name);

    if (descriptor && !descriptor.configurable) {
        return;
    }

    if (descriptor && descriptor.get) {
        links = (0, _parseArgs2["default"])(descriptor.get);

        links.forEach(function(link) {
            (0, _apiListen2["default"])(el, link, _eventNotify2["default"].bind(null, el, name));
        });
    }

    return Object.defineProperty(el, name, {
        configurable: true,

        get: function get() {
            var that = this;

            if (descriptor && descriptor.get) {
                return descriptor.get.apply(this, links.map(function(link) {
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

            (0, _eventNotify2["default"])(this, name);
        }
    });
};

module.exports = exports["default"];