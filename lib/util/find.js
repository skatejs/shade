"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function(el, selector) {
    return [].slice.call(el.querySelectorAll(selector));
};

module.exports = exports["default"];