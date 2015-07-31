"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _eventNotify = require("../event/notify");
var _eventNotify2 = _interopRequireDefault(_eventNotify);

exports["default"] = function(name) {
    return function(el) {
        (0, _eventNotify2["default"])(el, name);
    };
};

module.exports = exports["default"];