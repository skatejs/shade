"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
        "default": obj
    });
}

var _eventNotify = require("../../event/notify");
var _eventNotify2 = _interopRequireDefault(_eventNotify);
var _utilFindNodesBetween = require("../../util/find-nodes-between");
var _utilFindNodesBetween2 = _interopRequireDefault(_utilFindNodesBetween);
var _utilFragmentFromAnything = require("../../util/fragment-from-anything");
var _utilFragmentFromAnything2 = _interopRequireDefault(_utilFragmentFromAnything);
var _utilFragmentFromCollection = require("../../util/fragment-from-collection");
var _utilFragmentFromCollection2 = _interopRequireDefault(_utilFragmentFromCollection);

exports["default"] = function(content) {
    function addDefaultNodes() {
        if (!content.__initialised) {
            content.__initialised = true;
            var reference = content.__stopNode;
            reference.parentNode.insertBefore(content.__default.cloneNode(true), reference);
        }
    }

    function getAllNodes() {
        return (0, _utilFindNodesBetween2["default"])(content.__startNode, content.__stopNode);
    }

    function removeDefaultNodes() {
        if (content.__initialised) {
            content.__initialised = false;

            getAllNodes().forEach(function(node) {
                node.parentNode.removeChild(node);
            });
        }
    }

    function notify() {
        (0, _eventNotify2["default"])(content.__element, content.__name);
    }

    return Object.defineProperties({
        accept: function accept(node, callback) {
            node = (0, _utilFragmentFromAnything2["default"])(node);
            var selector = content.getAttribute("select");
            var wrap = content.getAttribute("wrap");

            if (selector) {
                node = (0, _utilFragmentFromCollection2["default"])(node.querySelectorAll(selector));
            }

            if (wrap) {
                for (var a = 0; a < node.children.length; a++) {
                    var wrapper = document.createElement("li");
                    wrapper.appendChild(node.children[a]);
                    node.insertBefore(wrapper, node.children[a]);
                }
            }

            if (node.childNodes.length) {
                removeDefaultNodes();
                callback(node);
            } else {
                addDefaultNodes();
            }

            return this;
        },

        append: function append(node) {
            var reference = content.__stopNode;

            return this.accept(node, function(node) {
                reference.parentNode.insertBefore(node, reference);
                notify();
            });
        },

        at: function at(index) {
            return this.nodes[index];
        },

        contains: function contains(node) {
            return content.__startNode.parentNode === node.parentNode;
        },

        each: function each(fn) {
            return this.nodes.forEach(fn);
        },

        find: function find(query) {
            if (typeof query === "object") {
                (function() {
                    var oldQuery = query;

                    query = function(item) {
                        for (var a in oldQuery) {
                            return item[a] === oldQuery[a];
                        }
                    };
                })();
            }

            return this.nodes.filter(query);
        },

        index: function index(node) {
            return this.nodes.indexOf(node);
        },

        insert: function insert(node, at) {
            var reference = this.nodes[at] || content.__stopNode;

            return this.accept(node, function(node) {
                reference.parentNode.insertBefore(node, reference);
                notify();
            });
        },

        map: function map(fn) {
            return this.nodes.map(fn);
        },

        prepend: function prepend(node) {
            var reference = this.nodes[0] || content.__stopNode;

            this.accept(node, function(node) {
                reference.parentNode.insertBefore(node, reference);
                notify();
            });

            return this;
        },

        reduce: function reduce(fn, initialValue) {
            return this.nodes.reduce(fn, initialValue);
        },

        remove: function remove(node) {
            if (typeof node === "number") {
                node = this.nodes[node];
            }

            if (this.contains(node)) {
                node.parentNode.removeChild(node);
                notify();
            }

            if (!this.nodes.length) {
                addDefaultNodes();
            }

            return this;
        },

        removeAll: function removeAll() {
            this.nodes.forEach(function(node) {
                node.parentNode.removeChild(node);
                notify();
            });

            addDefaultNodes();
            return this;
        }
    }, {
        html: {
            get: function() {
                return this.nodes.reduce(function(prev, curr) {
                    return prev + curr.outerHTML;
                }, "");
            },

            set: function(value) {
                this.removeAll().append(value);
            },

            configurable: true,
            enumerable: true
        },

        length: {
            get: function() {
                return this.nodes.length;
            },

            configurable: true,
            enumerable: true
        },

        nodes: {
            get: function() {
                return getAllNodes();
            },

            configurable: true,
            enumerable: true
        },

        text: {
            get: function() {
                return this.nodes.reduce(function(prev, curr) {
                    return prev + curr.textContent;
                }, "");
            },

            set: function(value) {
                this.removeAll().append(document.createTextNode(value));
            },

            configurable: true,
            enumerable: true
        }
    });
};

module.exports = exports["default"];