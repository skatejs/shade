"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function(nodeList) {
    var frag = document.createDocumentFragment();

    [].slice.call(nodeList).forEach(function(node) {
        frag.appendChild(node);
    });

    return frag;
};

module.exports = exports["default"];