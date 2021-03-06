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

function pxIfNumber(val) {
    return (typeof val === "number" ? val + "px" : val);
}

exports["default"] = function(el, target) {
    target.getAttribute("sh-style").split(" ").forEach(function(part) {
        var parts = part.split(":");
        var attrName = parts[0];
        var propName = parts[1] || attrName;
        target.style[attrName] = pxIfNumber(el[propName]);
        (0, _utilPropProxy2["default"])(el, propName);

        (0, _apiListen2["default"])(el, propName, function(e) {
            target.style[attrName] = pxIfNumber(e.detail.value);
        });
    });
};

module.exports = exports["default"];