"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function(node) {
    var frag = document.createDocumentFragment();

    if (node) {
        frag.appendChild(node);
    }

    return frag;
};

module.exports = exports["default"];