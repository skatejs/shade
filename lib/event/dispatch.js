"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _event = require("./event");
var _event2 = _interopRequireDefault(_event);

exports["default"] = function(element, name, opts) {
    return element.dispatchEvent((0, _event2["default"])(name, opts));
};

module.exports = exports["default"];