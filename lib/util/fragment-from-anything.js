"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = fragmentFromAnything;

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _fragmentFromCollection = require("./fragment-from-collection");
var _fragmentFromCollection2 = _interopRequireDefault(_fragmentFromCollection);
var _fragmentFromNode = require("./fragment-from-node");
var _fragmentFromNode2 = _interopRequireDefault(_fragmentFromNode);
var _fragmentFromString = require("./fragment-from-string");
var _fragmentFromString2 = _interopRequireDefault(_fragmentFromString);
var DocumentFragment = window.DocumentFragment;
var Node = window.Node;
var NodeList = window.NodeList;

function fragmentFromAnything(item) {
    if (!item) {
        return document.createDocumentFragment();
    }

    if (typeof item === "string") {
        return (0, _fragmentFromString2["default"])(item);
    }

    if (item instanceof DocumentFragment) {
        return item;
    }

    if (item instanceof Node) {
        return (0, _fragmentFromNode2["default"])(item);
    }

    if (item instanceof NodeList) {
        return (0, _fragmentFromCollection2["default"])(item);
    }

    if (typeof item.length === "number") {
        return [].reduce.call(item, function(prev, curr) {
            prev.appendChild(fragmentFromAnything(curr));
            return prev;
        }, document.createDocumentFragment());
    }

    return item;
}

module.exports = exports["default"];