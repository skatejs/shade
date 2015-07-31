"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function(startNode, stopNode) {
    var parentNode = startNode.parentNode;
    var isBetween = false;
    var childNodes = [];

    for (var a = 0; a < parentNode.childNodes.length; a++) {
        var childNode = parentNode.childNodes[a];

        if (childNode === startNode) {
            isBetween = true;
            continue;
        }

        if (!isBetween) {
            continue;
        }

        if (childNode === stopNode) {
            break;
        }

        childNodes.push(childNode);
    }

    return childNodes;
};

module.exports = exports["default"];