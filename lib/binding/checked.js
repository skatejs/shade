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
var _utilPropProxy = require("../util/prop-proxy");
var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);
var _eventListen = require("../event/listen");
var _eventListen2 = _interopRequireDefault(_eventListen);

exports["default"] = function(el, target) {
    var propName = target.getAttribute("name");
    (0, _utilPropProxy2["default"])(el, propName);

    (0, _apiListen2["default"])(el, propName, function() {
        return target.checked = !!el.checked;
    });

    (0, _eventListen2["default"])(target, "change", function() {
        return el[propName] = target.checked;
    });

    el[propName] = target.checked;
};

module.exports = exports["default"];