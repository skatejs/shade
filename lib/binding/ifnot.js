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
    var propName = target.getAttribute("if");
    var parent = target.parentNode;
    var placeholder = document.createComment("");
    parent.insertBefore(placeholder, target);
    (0, _utilPropProxy2["default"])(el, propName);

    (0, _apiListen2["default"])(el, propName, function(e) {
        if (e.detail.value && !target.parentNode) {
            target.remove();
        } else if (!e.detail.value && target.parentNode) {
            parent.insertBefore(target, placeholder);
        }
    });
};

module.exports = exports["default"];