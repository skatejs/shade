"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _apiListen = require("../api/listen");
var _apiListen2 = _interopRequireDefault(_apiListen);
var _eventListen = require("../event/listen");
var _eventListen2 = _interopRequireDefault(_eventListen);
var _utilPropProxy = require("../util/prop-proxy");
var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

exports["default"] = function(el, target) {
    var propName = target.getAttribute("name");
    (0, _utilPropProxy2["default"])(el, propName);

    (0, _apiListen2["default"])(el, propName, function(e) {
        target.value = e.detail.value || "";
    });

    (0, _eventListen2["default"])(el, ["change", "keyup"], function() {
        return el[propName] = target.value;
    });

    el[propName] = target.value;
};

module.exports = exports["default"];