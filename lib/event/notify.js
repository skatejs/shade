"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _dispatch = require("./dispatch");
var _dispatch2 = _interopRequireDefault(_dispatch);
var _constants = require("../constants");

exports["default"] = function(el, name) {
    var opts = {
        bubbles: false,
        cancellable: false,

        detail: {
            name: name,
            value: el[name]
        }
    };

    (0, _dispatch2["default"])(el, _constants.PROPERTY_EVENT_NAME, opts);

    if (opts.detail.name) {
        (0, _dispatch2["default"])(el, "" + _constants.PROPERTY_EVENT_NAME + "." + opts.detail.name, opts);
    }
};

module.exports = exports["default"];