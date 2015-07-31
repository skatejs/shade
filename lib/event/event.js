"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var CustomEvent = window.CustomEvent;

exports["default"] = function(name, opts) {
    opts = opts || {};

    if (opts.bubbles === undefined) {
        opts.bubbles = true;
    }

    return new CustomEvent(name, opts);
};

module.exports = exports["default"];