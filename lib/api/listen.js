"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require("../constants");

exports["default"] = function(el, name, fn) {
    if (arguments.length === 2) {
        fn = name;
        name = undefined;
    }

    if (name) {
        el.addEventListener("" + _constants.PROPERTY_EVENT_NAME + "." + name, fn);
    } else {
        el.addEventListener(_constants.PROPERTY_EVENT_NAME, fn);
    }
};

module.exports = exports["default"];