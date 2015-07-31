"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _constants = require("../constants");
var _utilFragmentFromCollection = require("../util/fragment-from-collection");
var _utilFragmentFromCollection2 = _interopRequireDefault(_utilFragmentFromCollection);
var _contentMakeProperty = require("./content/make-property");
var _contentMakeProperty2 = _interopRequireDefault(_contentMakeProperty);
var _utilTrim = require("../util/trim");
var _utilTrim2 = _interopRequireDefault(_utilTrim);
var _contentWrap = require("./content/wrap");
var _contentWrap2 = _interopRequireDefault(_contentWrap);

exports["default"] = function(el, target, initialContent) {
    var name = target.getAttribute("name") || _constants.DEFAULT_CONTENT_NAME;
    var parentNode = target.parentNode;
    var startNode = document.createComment("");
    var stopNode = document.createComment("");
    (0, _utilTrim2["default"])(target);
    target.__default = (0, _utilFragmentFromCollection2["default"])(target.childNodes);
    target.__element = el;
    target.__initialised = false;
    target.__name = name;
    target.__startNode = startNode;
    target.__stopNode = stopNode;

    if (target.tagName === "CONTENT") {
        parentNode.insertBefore(startNode, target);
        parentNode.insertBefore(stopNode, target);
        parentNode.removeChild(target);
    } else {
        target.innerHTML = "";
        target.appendChild(startNode);
        target.appendChild(stopNode);
    }

    Object.defineProperty(el, name, (0, _contentMakeProperty2["default"])(target));
    (0, _contentWrap2["default"])(target).html = initialContent;
};

module.exports = exports["default"];