"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _apiBind = require("./api/bind");
var _apiBind2 = _interopRequireDefault(_apiBind);
var _apiBindings = require("./api/bindings");
var _apiBindings2 = _interopRequireDefault(_apiBindings);
var _apiListen = require("./api/listen");
var _apiListen2 = _interopRequireDefault(_apiListen);
var _apiNotify = require("./api/notify");
var _apiNotify2 = _interopRequireDefault(_apiNotify);
var _bindingAttr = require("./binding/attr");
var _bindingAttr2 = _interopRequireDefault(_bindingAttr);
var _bindingChecked = require("./binding/checked");
var _bindingChecked2 = _interopRequireDefault(_bindingChecked);
var _bindingClass = require("./binding/class");
var _bindingClass2 = _interopRequireDefault(_bindingClass);
var _bindingContent = require("./binding/content");
var _bindingContent2 = _interopRequireDefault(_bindingContent);
var _bindingIf = require("./binding/if");
var _bindingIf2 = _interopRequireDefault(_bindingIf);
var _bindingIfnot = require("./binding/ifnot");
var _bindingIfnot2 = _interopRequireDefault(_bindingIfnot);
var _bindingName = require("./binding/name");
var _bindingName2 = _interopRequireDefault(_bindingName);
var _bindingOn = require("./binding/on");
var _bindingOn2 = _interopRequireDefault(_bindingOn);
var _bindingStyle = require("./binding/style");
var _bindingStyle2 = _interopRequireDefault(_bindingStyle);
var _bindingText = require("./binding/text");
var _bindingText2 = _interopRequireDefault(_bindingText);
var _utilFragmentFromCollection = require("./util/fragment-from-collection");
var _utilFragmentFromCollection2 = _interopRequireDefault(_utilFragmentFromCollection);
var _utilFragmentFromString = require("./util/fragment-from-string");
var _utilFragmentFromString2 = _interopRequireDefault(_utilFragmentFromString);
var DocumentFragment = window.DocumentFragment;

function create() {
    function template() {
        var tmpHtml = (arguments[0] === undefined ? "" : arguments[0]);
        tmpHtml = tmpHtml.toString().trim();

        return function(elem) {
            var initialContent;
            elem = elem || this;
            elem = (typeof elem === "string" ? (0, _utilFragmentFromString2["default"])(elem) : elem);
            elem = (elem instanceof DocumentFragment ? elem.children.item(0) : elem);
            initialContent = (0, _utilFragmentFromCollection2["default"])(elem.childNodes);
            elem.innerHTML = tmpHtml;

            _apiBindings2["default"].forEach(function(binding) {
                return binding(elem, initialContent);
            });

            return elem;
        };
    }

    template.bind = _apiBind2["default"];
    template.bindings = _apiBindings2["default"];
    template.listen = _apiListen2["default"];
    template.notify = _apiNotify2["default"];
    template.bind("[attr]", _bindingAttr2["default"]);
    template.bind("[name][type=\"checkbox\"]", _bindingChecked2["default"]);
    template.bind("content, [content]", _bindingContent2["default"]);
    template.bind("[if]", _bindingIf2["default"]);
    template.bind("[ifnot]", _bindingIfnot2["default"]);
    template.bind("textarea[name], input[type=\"text\"][name]", _bindingName2["default"]);
    template.bind("[on]", _bindingOn2["default"]);
    template.bind("[sh-class]", _bindingClass2["default"]);
    template.bind("[sh-style]", _bindingStyle2["default"]);
    template.bind("[text]", _bindingText2["default"]);
    return template;
}

var shade = create();
shade.create = create;
exports["default"] = window.shade = shade;
module.exports = exports["default"];