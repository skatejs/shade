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

function classList(el) {
    return el.classList || function() {
        function classNames() {
            return el.className.split(" ");
        }

        return {
            add: function add(className) {
                if (classNames().indexOf(className) === -1) {
                    el.className = (el.className ? " " + className : className);
                }
            },

            remove: function remove(className) {
                var names = classNames();
                var index = names.indexOf(className);

                if (index > -1) {
                    names.splice(index, 1);
                    el.className = names.join(" ");
                }
            }
        };
    }();
}

exports["default"] = function(el, target) {
    target.getAttribute("sh-class").split(" ").forEach(function(part) {
        var parts = part.split(":");
        var propName = parts[0];
        var className = parts[1];

        function toggle(value) {
            if (value) {
                classList(target).add(className || value);
            } else {
                classList(target).remove(className);
            }
        }

        toggle(el[propName]);
        (0, _utilPropProxy2["default"])(el, propName);

        (0, _apiListen2["default"])(el, propName, function(e) {
            toggle(e.detail.value);
        });
    });
};

module.exports = exports["default"];