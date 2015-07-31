"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _wrap = require("./wrap");
var _wrap2 = _interopRequireDefault(_wrap);

exports["default"] = function(content) {
    return {
        configurable: true,

        get: function get() {
            var name = content.getAttribute("name") || "textContent";
            var nodes = (0, _wrap2["default"])(content);

            if (name === "textContent" || content.hasAttribute("text")) {
                return nodes.text;
            } else if (name === "innerHTML" || content.hasAttribute("html")) {
                return nodes.html;
            }

            return (content.hasAttribute("multiple") ? nodes : nodes.nodes[0] || null);
        },

        set: function set(value) {
            var name = content.getAttribute("name");
            var text = content.hasAttribute("text");
            (0, _wrap2["default"])(content)[(name === "textContent" || text ? "text" : "html")] = value;
        }
    };
};

module.exports = exports["default"];