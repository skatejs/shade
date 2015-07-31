"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function(el, names, callback) {
    names = (Array.isArray(names) ? names : [names]);

    names.forEach(function(name) {
        el.addEventListener(name, callback);
    });
};

module.exports = exports["default"];