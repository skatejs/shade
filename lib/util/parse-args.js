"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var regexArgComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var regexArgNames = /([^\s,]+)/g;

exports["default"] = function(func) {
    var fnStr = func.toString().replace(regexArgComments, "");
    var result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(regexArgNames);

    if (result === null) {
        result = [];
    }

    return result;
};

module.exports = exports["default"];