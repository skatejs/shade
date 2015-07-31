"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _bindings = require("./bindings");
var _bindings2 = _interopRequireDefault(_bindings);
var _utilFind = require("../util/find");
var _utilFind2 = _interopRequireDefault(_utilFind);

exports["default"] = function(selector, fn) {
    _bindings2["default"].push(function(el, initialContent) {
        (0, _utilFind2["default"])(el, selector).forEach(function(target) {
            fn(el, target, initialContent);
        });
    });

    return this;
};

module.exports = exports["default"];