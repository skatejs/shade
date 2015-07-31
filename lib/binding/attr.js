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
var _utilPropProxy = require("../util/prop-proxy");
var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

exports["default"] = function(el, target) {
    target.getAttribute("attr").split(" ").forEach(function(part) {
        var parts = part.split(":");
        var attrName = parts[0];
        var propName = parts[1] || attrName;

        var set = function set(val) {
            return (val ? target.setAttribute(attrName, val) : target.removeAttribute(attrName));
        };

        (0, _utilPropProxy2["default"])(el, propName);
        set(el[propName]);

        (0, _apiListen2["default"])(el, propName, function(e) {
            set(e.detail.value);
        });
    });
};

module.exports = exports["default"];