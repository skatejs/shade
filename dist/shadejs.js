// src/api/bindings.js
__7cd43f6452e9eab84438a4ad6025b3e3 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = [];
  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/util/find.js
__e0d18491916c36edcd801fda020cbb64 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = function(el, selector) {
    return [].slice.call(el.querySelectorAll(selector));
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/api/bind.js
__ee71b6efe56580e3b0576e6146bf20af = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _bindings = __7cd43f6452e9eab84438a4ad6025b3e3;
  var _bindings2 = _interopRequireDefault(_bindings);
  var _utilFind = __e0d18491916c36edcd801fda020cbb64;
  var _utilFind2 = _interopRequireDefault(_utilFind);

  exports["default"] = function(selector, fn) {
    _bindings2["default"].push(function(el, initialContent) {
      (0, _utilFind2["default"])(el, selector).forEach(function(target) {
        fn(el, target, initialContent);
      });
    });

    return this;
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/constants.js
__cb00d40c73a7150c328f8a7d3932a029 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DEFAULT_CONTENT_NAME = "textContent";
  exports.DEFAULT_CONTENT_NAME = DEFAULT_CONTENT_NAME;
  var PROPERTY_EVENT_NAME = "shade.property";
  exports.PROPERTY_EVENT_NAME = PROPERTY_EVENT_NAME;

  return module.exports;
}).call(this);

// src/api/listen.js
__c5dd6f8f59a03e0df7bce873c1a6aef8 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _constants = __cb00d40c73a7150c328f8a7d3932a029;

  exports["default"] = function(el, name, fn) {
    if (arguments.length === 2) {
      fn = name;
      name = undefined;
    }

    if (name) {
      el.addEventListener("" + _constants.PROPERTY_EVENT_NAME + "." + name, fn);
    } else {
      el.addEventListener(_constants.PROPERTY_EVENT_NAME, fn);
    }
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/event/event.js
__04e6a92dbc5b4950b19ebc85c5615cd3 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CustomEvent = window.CustomEvent;

  exports["default"] = function(name, opts) {
    opts = opts || {};

    if (opts.bubbles === undefined) {
      opts.bubbles = true;
    }

    return new CustomEvent(name, opts);
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/event/dispatch.js
__5ad1b0ebf0a4d70a2e8fa66fe6603e0a = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _event = __04e6a92dbc5b4950b19ebc85c5615cd3;
  var _event2 = _interopRequireDefault(_event);

  exports["default"] = function(element, name, opts) {
    return element.dispatchEvent((0, _event2["default"])(name, opts));
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/event/notify.js
__9e17e38b814ce7a14057738b49b5d7ac = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _dispatch = __5ad1b0ebf0a4d70a2e8fa66fe6603e0a;
  var _dispatch2 = _interopRequireDefault(_dispatch);
  var _constants = __cb00d40c73a7150c328f8a7d3932a029;

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

  return module.exports;
}).call(this);

// src/api/notify.js
__9fc7a49b416f05fbbc3c65c580d002a2 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _eventNotify = __9e17e38b814ce7a14057738b49b5d7ac;
  var _eventNotify2 = _interopRequireDefault(_eventNotify);

  exports["default"] = function(name) {
    return function(el) {
      (0, _eventNotify2["default"])(el, name);
    };
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/util/parse-args.js
__8f8edeaa6f5d357c5d853d81d6c6186a = (function () {
  var module = { exports: {} };
  var exports = module.exports;

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

  return module.exports;
}).call(this);

// src/util/prop-proxy.js
__0126d3be88e859a7360a53615c8c95d9 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _eventNotify = __9e17e38b814ce7a14057738b49b5d7ac;
  var _eventNotify2 = _interopRequireDefault(_eventNotify);
  var _parseArgs = __8f8edeaa6f5d357c5d853d81d6c6186a;
  var _parseArgs2 = _interopRequireDefault(_parseArgs);
  var getDescriptor = Object.getOwnPropertyDescriptor;

  function resolveDescriptor(el, name) {
    return getDescriptor(el, name);
  }

  exports["default"] = function(el, name) {
    var descriptor = resolveDescriptor(el, name);
    var links = [];
    var value = el.getAttribute(name);

    if (descriptor && !descriptor.configurable) {
      return;
    }

    if (descriptor && descriptor.get) {
      links = (0, _parseArgs2["default"])(descriptor.get);

      links.forEach(function(link) {
        (0, _apiListen2["default"])(el, link, _eventNotify2["default"].bind(null, el, name));
      });
    }

    return Object.defineProperty(el, name, {
      configurable: true,

      get: function get() {
        var that = this;

        if (descriptor && descriptor.get) {
          return descriptor.get.apply(this, links.map(function(link) {
            return that[link];
          }));
        } else {
          return value;
        }
      },

      set: function set(newValue) {
        if (descriptor && descriptor.set) {
          descriptor.set.call(this, newValue);
        } else {
          value = newValue;
        }

        (0, _eventNotify2["default"])(this, name);
      }
    });
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/binding/attr.js
__c396280bdc430d9ea922dfd50fb78272 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

  exports["default"] = function(el, target) {
    target.getAttribute("attr").split(" ").forEach(function(part) {
      var parts = part.split(":");
      var attrName = parts[0];
      var propName = parts[1] || attrName;

      var set = function set(val) {
        return (val ? target.setAttribute(attrName, val) : target.removeAttribute(attrName));
      };

      (0, _utilPropProxy2["default"])(el, propName);
      set(el[propName]);

      (0, _apiListen2["default"])(el, propName, function(e) {
        set(e.detail.value);
      });
    });
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/event/listen.js
__6ec2aa33e9ae4e76d44cc9de43847b64 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = function(el, names, callback) {
    names = (Array.isArray(names) ? names : [names]);

    names.forEach(function(name) {
      el.addEventListener(name, callback);
    });
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/binding/checked.js
__4771c5f22e51fe701a9946317a626d3b = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);
  var _eventListen = __6ec2aa33e9ae4e76d44cc9de43847b64;
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

  return module.exports;
}).call(this);

// src/binding/class.js
__2ad4518a1ff59fd7403d751ca579d7ca = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
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

  return module.exports;
}).call(this);

// src/util/fragment-from-collection.js
__30b400647c92b587f3d7e75db182c98e = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = function(nodeList) {
    var frag = document.createDocumentFragment();

    [].slice.call(nodeList).forEach(function(node) {
      frag.appendChild(node);
    });

    return frag;
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/util/find-nodes-between.js
__f80bd0af0b10c72626d8bdce00313b6e = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = function(startNode, stopNode) {
    var parentNode = startNode.parentNode;
    var isBetween = false;
    var childNodes = [];

    for (var a = 0; a < parentNode.childNodes.length; a++) {
      var childNode = parentNode.childNodes[a];

      if (childNode === startNode) {
        isBetween = true;
        continue;
      }

      if (!isBetween) {
        continue;
      }

      if (childNode === stopNode) {
        break;
      }

      childNodes.push(childNode);
    }

    return childNodes;
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/util/fragment-from-node.js
__dc8ac56fe453d355e4f05d4b7918bf1e = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = function(node) {
    var frag = document.createDocumentFragment();

    if (node) {
      frag.appendChild(node);
    }

    return frag;
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/util/fragment-from-string.js
__75288c9eae43be4f69a605d574814320 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _fragmentFromCollection = __30b400647c92b587f3d7e75db182c98e;
  var _fragmentFromCollection2 = _interopRequireDefault(_fragmentFromCollection);

  var specialMap = {
    caption: "table",
    dd: "dl",
    dt: "dl",
    li: "ul",
    tbody: "table",
    td: "tr",
    thead: "table",
    tr: "tbody"
  };

  function matchTag(dom) {
    var tag = dom.match(/\s*<([^\s>]+)/);
    return tag && tag[1] || "div";
  }

  function resolveCorrectDomParent(dom) {
    return resolveCorrectTagParents(matchTag(dom));
  }

  function resolveCorrectTagParents(tag) {
    var mapped;
    var parent = document.createElement(tag);

    while (mapped = specialMap[parent.tagName.toLowerCase()]) {
      var tempParent = document.createElement(mapped);
      tempParent.appendChild(parent);
      parent = tempParent;
    }

    return parent;
  }

  exports["default"] = function(dom) {
    var par = resolveCorrectDomParent(dom);
    par.innerHTML = dom;
    return (0, _fragmentFromCollection2["default"])(par.childNodes);
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/util/fragment-from-anything.js
__5a306df716eb2212ff834894672bc372 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = fragmentFromAnything;

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _fragmentFromCollection = __30b400647c92b587f3d7e75db182c98e;
  var _fragmentFromCollection2 = _interopRequireDefault(_fragmentFromCollection);
  var _fragmentFromNode = __dc8ac56fe453d355e4f05d4b7918bf1e;
  var _fragmentFromNode2 = _interopRequireDefault(_fragmentFromNode);
  var _fragmentFromString = __75288c9eae43be4f69a605d574814320;
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

  return module.exports;
}).call(this);

// src/binding/content/wrap.js
__e3571fb8bc72b68f952ecdfea6c7ba29 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _eventNotify = __9e17e38b814ce7a14057738b49b5d7ac;
  var _eventNotify2 = _interopRequireDefault(_eventNotify);
  var _utilFindNodesBetween = __f80bd0af0b10c72626d8bdce00313b6e;
  var _utilFindNodesBetween2 = _interopRequireDefault(_utilFindNodesBetween);
  var _utilFragmentFromAnything = __5a306df716eb2212ff834894672bc372;
  var _utilFragmentFromAnything2 = _interopRequireDefault(_utilFragmentFromAnything);
  var _utilFragmentFromCollection = __30b400647c92b587f3d7e75db182c98e;
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

  return module.exports;
}).call(this);

// src/binding/content/make-property.js
__3b41741c587b0717ffbe410dee595b40 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _wrap = __e3571fb8bc72b68f952ecdfea6c7ba29;
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

  return module.exports;
}).call(this);

// src/util/trim.js
__8961b6c8f9d26dccd972732c4985f8c9 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = function(elem) {
    for (var a = elem.childNodes.length - 1; a > -1; a--) {
      var child = elem.childNodes[a];

      if (child.nodeType === 3 && child.textContent.match(/^\s*$/)) {
        elem.removeChild(child);
      }
    }
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/binding/content.js
__af4e672e7be6cdbb17637f84ccfe1cf9 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _constants = __cb00d40c73a7150c328f8a7d3932a029;
  var _utilFragmentFromCollection = __30b400647c92b587f3d7e75db182c98e;
  var _utilFragmentFromCollection2 = _interopRequireDefault(_utilFragmentFromCollection);
  var _contentMakeProperty = __3b41741c587b0717ffbe410dee595b40;
  var _contentMakeProperty2 = _interopRequireDefault(_contentMakeProperty);
  var _utilTrim = __8961b6c8f9d26dccd972732c4985f8c9;
  var _utilTrim2 = _interopRequireDefault(_utilTrim);
  var _contentWrap = __e3571fb8bc72b68f952ecdfea6c7ba29;
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

  return module.exports;
}).call(this);

// src/binding/if.js
__84f84240c34e77faaa9ac017033fc8f4 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

  exports["default"] = function(el, target) {
    var propName = target.getAttribute("if");
    var parent = target.parentNode;
    var placeholder = document.createComment("");
    parent.insertBefore(placeholder, target);
    (0, _utilPropProxy2["default"])(el, propName);

    (0, _apiListen2["default"])(el, propName, function(e) {
      if (e.detail.value && !target.parentNode) {
        parent.insertBefore(target, placeholder);
      } else if (!e.detail.value && target.parentNode) {
        target.remove();
      }
    });
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/binding/ifnot.js
__4e272311e01be53a18ea115da0002b59 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

  exports["default"] = function(el, target) {
    var propName = target.getAttribute("if");
    var parent = target.parentNode;
    var placeholder = document.createComment("");
    parent.insertBefore(placeholder, target);
    (0, _utilPropProxy2["default"])(el, propName);

    (0, _apiListen2["default"])(el, propName, function(e) {
      if (e.detail.value && !target.parentNode) {
        target.remove();
      } else if (!e.detail.value && target.parentNode) {
        parent.insertBefore(target, placeholder);
      }
    });
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/binding/name.js
__8d354ccbec8214a9b6149f90c1d3600c = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _eventListen = __6ec2aa33e9ae4e76d44cc9de43847b64;
  var _eventListen2 = _interopRequireDefault(_eventListen);
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
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

  return module.exports;
}).call(this);

// src/binding/on.js
__2ae9adfb01b63744ebaf0e3b4c2b95fe = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  function _slicedToArray(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"])
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  }

  var _eventDispatch = __5ad1b0ebf0a4d70a2e8fa66fe6603e0a;
  var _eventDispatch2 = _interopRequireDefault(_eventDispatch);

  exports["default"] = function(el, target) {
    target.getAttribute("on").split(" ").forEach(function(pair) {
      var handlerFunc;
      var _pair$split = pair.split(":");
      var _pair$split2 = _slicedToArray(_pair$split, 2);
      var propName = _pair$split2[0];
      var handlerName = _pair$split2[1];
      handlerName = handlerName || "handle" + (propName[0].toUpperCase() + propName.substring(1));

      handlerFunc = (el[handlerName] || function(e) {
        (0, _eventDispatch2["default"])(this, handlerName, {
          bubbles: true,
          cancelable: true
        });

        e.preventDefault();
      }).bind(el);

      target.addEventListener(propName, function(e) {
        e.delegateTarget = target;
        handlerFunc(e);
      });
    });
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/binding/style.js
__d494f2e14e2aeba398f98825106ae888 = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

  function pxIfNumber(val) {
    return (typeof val === "number" ? val + "px" : val);
  }

  exports["default"] = function(el, target) {
    target.getAttribute("sh-style").split(" ").forEach(function(part) {
      var parts = part.split(":");
      var attrName = parts[0];
      var propName = parts[1] || attrName;
      target.style[attrName] = pxIfNumber(el[propName]);
      (0, _utilPropProxy2["default"])(el, propName);

      (0, _apiListen2["default"])(el, propName, function(e) {
        target.style[attrName] = pxIfNumber(e.detail.value);
      });
    });
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/binding/text.js
__6d77b901264b93f69dbd0ef3ea8503dc = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);

  exports["default"] = function(el, target) {
    var propName = target.getAttribute("text");
    target.textContent = el[propName];
    (0, _utilPropProxy2["default"])(el, propName);

    (0, _apiListen2["default"])(el, propName, function(e) {
      target.textContent = e.detail.value;
    });
  };

  module.exports = exports["default"];

  return module.exports;
}).call(this);

// src/index.js
__dff62dc5a802abe34646b4f484fc6f3f = (function () {
  var module = { exports: {} };
  var exports = module.exports;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) {
    return (obj && obj.__esModule ? obj : {
      "default": obj
    });
  }

  var _apiBind = __ee71b6efe56580e3b0576e6146bf20af;
  var _apiBind2 = _interopRequireDefault(_apiBind);
  var _apiBindings = __7cd43f6452e9eab84438a4ad6025b3e3;
  var _apiBindings2 = _interopRequireDefault(_apiBindings);
  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  var _apiListen2 = _interopRequireDefault(_apiListen);
  var _apiNotify = __9fc7a49b416f05fbbc3c65c580d002a2;
  var _apiNotify2 = _interopRequireDefault(_apiNotify);
  var _bindingAttr = __c396280bdc430d9ea922dfd50fb78272;
  var _bindingAttr2 = _interopRequireDefault(_bindingAttr);
  var _bindingChecked = __4771c5f22e51fe701a9946317a626d3b;
  var _bindingChecked2 = _interopRequireDefault(_bindingChecked);
  var _bindingClass = __2ad4518a1ff59fd7403d751ca579d7ca;
  var _bindingClass2 = _interopRequireDefault(_bindingClass);
  var _bindingContent = __af4e672e7be6cdbb17637f84ccfe1cf9;
  var _bindingContent2 = _interopRequireDefault(_bindingContent);
  var _bindingIf = __84f84240c34e77faaa9ac017033fc8f4;
  var _bindingIf2 = _interopRequireDefault(_bindingIf);
  var _bindingIfnot = __4e272311e01be53a18ea115da0002b59;
  var _bindingIfnot2 = _interopRequireDefault(_bindingIfnot);
  var _bindingName = __8d354ccbec8214a9b6149f90c1d3600c;
  var _bindingName2 = _interopRequireDefault(_bindingName);
  var _bindingOn = __2ae9adfb01b63744ebaf0e3b4c2b95fe;
  var _bindingOn2 = _interopRequireDefault(_bindingOn);
  var _bindingStyle = __d494f2e14e2aeba398f98825106ae888;
  var _bindingStyle2 = _interopRequireDefault(_bindingStyle);
  var _bindingText = __6d77b901264b93f69dbd0ef3ea8503dc;
  var _bindingText2 = _interopRequireDefault(_bindingText);
  var _utilFragmentFromCollection = __30b400647c92b587f3d7e75db182c98e;
  var _utilFragmentFromCollection2 = _interopRequireDefault(_utilFragmentFromCollection);
  var _utilFragmentFromString = __75288c9eae43be4f69a605d574814320;
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

  return module.exports;
}).call(this);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy9hcGkvYmluZGluZ3MuanMiLCIvVXNlcnMvdHNodWdhcnQvU2l0ZXMvc2thdGVqcy9zaGFkZS9zcmMvdXRpbC9maW5kLmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL2FwaS9iaW5kLmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy9hcGkvbGlzdGVuLmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL2V2ZW50L2V2ZW50LmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL2V2ZW50L2Rpc3BhdGNoLmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL2V2ZW50L25vdGlmeS5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy9hcGkvbm90aWZ5LmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL3V0aWwvcGFyc2UtYXJncy5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy91dGlsL3Byb3AtcHJveHkuanMiLCIvVXNlcnMvdHNodWdhcnQvU2l0ZXMvc2thdGVqcy9zaGFkZS9zcmMvYmluZGluZy9hdHRyLmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL2V2ZW50L2xpc3Rlbi5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy9iaW5kaW5nL2NoZWNrZWQuanMiLCIvVXNlcnMvdHNodWdhcnQvU2l0ZXMvc2thdGVqcy9zaGFkZS9zcmMvYmluZGluZy9jbGFzcy5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy91dGlsL2ZyYWdtZW50LWZyb20tY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy91dGlsL2ZpbmQtbm9kZXMtYmV0d2Vlbi5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy91dGlsL2ZyYWdtZW50LWZyb20tbm9kZS5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy91dGlsL2ZyYWdtZW50LWZyb20tc3RyaW5nLmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL3V0aWwvZnJhZ21lbnQtZnJvbS1hbnl0aGluZy5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy9iaW5kaW5nL2NvbnRlbnQvd3JhcC5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy9iaW5kaW5nL2NvbnRlbnQvbWFrZS1wcm9wZXJ0eS5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy91dGlsL3RyaW0uanMiLCIvVXNlcnMvdHNodWdhcnQvU2l0ZXMvc2thdGVqcy9zaGFkZS9zcmMvYmluZGluZy9jb250ZW50LmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL2JpbmRpbmcvaWYuanMiLCIvVXNlcnMvdHNodWdhcnQvU2l0ZXMvc2thdGVqcy9zaGFkZS9zcmMvYmluZGluZy9pZm5vdC5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy9iaW5kaW5nL25hbWUuanMiLCIvVXNlcnMvdHNodWdhcnQvU2l0ZXMvc2thdGVqcy9zaGFkZS9zcmMvYmluZGluZy9vbi5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy9iaW5kaW5nL3N0eWxlLmpzIiwiL1VzZXJzL3RzaHVnYXJ0L1NpdGVzL3NrYXRlanMvc2hhZGUvc3JjL2JpbmRpbmcvdGV4dC5qcyIsIi9Vc2Vycy90c2h1Z2FydC9TaXRlcy9za2F0ZWpzL3NoYWRlL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRkFBLEFJQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBMUJBQSxBR0FBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQWZBQSxBa0JBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRUFBLEFJQUEsQUdBQSxBRUFBLEFDQUEsQVNBQSxBRkFBLEFEQUEsQUlBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQTFCQUEsQUdBQSxBREFBLEFPQUEsQUxBQSxBdUJBQSxBZEFBLEFmQUEsQWtCQUEsQUpBQSxBRUFBLEFDQUEsQVRBQSxBQ0FBLEFZQUE7QXBCQ0EsQUVBQSxBSUFBLEFHQUEsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEExQkFBLEFHQUEsQURBQSxBT0FBLEFMQUEsQXVCQUEsQWRBQSxBZkFBLEFrQkFBLEFKQUEsQUVBQSxBQ0FBLEFUQUEsQUNBQSxBWUFBO0FwQkNBLEFFQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBdkJBQSxBREFBLEFPQUEsQUxBQSxBdUJBQSxBZEFBLEFmQUEsQWtCQUEsQUpBQSxBRUFBLEFDQUEsQVRBQSxBQ0FBLEFZQUE7QXBCQ0EsQUVBQSxBSUFBLEFHQUEsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEF2QkFBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQUdBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRUFBLEFJQUEsQUdBQSxBRUFBLEFDQUEsQVNBQSxBRkFBLEFEQUEsQUlBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQXZCQUEsQURBQSxBT0FBLEFMQUEsQXVCQUEsQWRBQSxBR0FBLEFKQUEsQUVBQSxBQ0FBLEFUQUEsQUNBQSxBWUFBO0FwQkNBLEFFQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBdkJBQSxBREFBLEFPQUEsQUxBQSxBdUJBQSxBZEFBLEFHQUEsQUpBQSxBRUFBLEFDQUEsQVRBQSxBQ0FBLEFZQUE7QXBCQ0EsQUVBQSxBSUFBLEFHQUEsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEF2QkFBLEFEQUEsQU9BQSxBTEFBLEF1QkFBLEFkQUEsQUdBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRUFBLEFJQUEsQUdBQSxBRUFBLEFDQUEsQVNBQSxBRkFBLEFEQUEsQUlBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQXZCQUEsQURBQSxBRUFBLEF1QkFBLEFkQUEsQUdBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRUFBLEFJQUEsQUdBQSxBRUFBLEFDQUEsQVNBQSxBRkFBLEFEQUEsQUlBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQXZCQUEsQURBQSxBRUFBLEF1QkFBLEFkQUEsQUdBQSxBSkFBLEFFQUEsQUNBQSxBVEFBLEFDQUEsQVlBQTtBcEJDQSxBRUFBLEFJQUEsQUdBQSxBRUFBLEFDQUEsQVNBQSxBRkFBLEFEQUEsQUlBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQXZCQUEsQURBQSxBRUFBLEF1QkFBLEFkQUEsQUdBQSxBREFBLEFUQUEsQUNBQTtBUkNBLEFFQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBdkJBQSxBREFBLEFFQUEsQXVCQUEsQWRBQSxBR0FBLEFEQUEsQVRBQSxBQ0FBO0FSQ0EsQUVBQSxBSUFBLEFHQUEsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEF2QkFBLEFDQUEsQXVCQUEsQWRBQSxBR0FBLEFEQUEsQVRBQSxBQ0FBO0FSQ0EsQUVBQSxBSUFBLEFHQUEsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEF0QkFBLEF1QkFBLEFkQUEsQUdBQSxBREFBLEFUQUEsQUNBQTtBUkNBLEFFQUEsQUlBQSxBR0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBdEJBQSxBdUJBQSxBZEFBLEFHQUEsQURBQSxBUkFBO0FSQ0EsQVNBQSxBRUFBLEFDQUEsQVNBQSxBRkFBLEFEQUEsQUlBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQXRCQUEsQXVCQUEsQWRBQSxBR0FBLEFEQUEsQVJBQTtBUkNBLEFTQUEsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEF0QkFBLEF1QkFBLEFkQUEsQUdBQSxBREFBLEFSQUE7QVJDQSxBU0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBdEJBQSxBdUJBQSxBZEFBLEFHQUEsQURBQSxBUkFBO0FSQ0EsQVNBQSxBRUFBLEFDQUEsQVNBQSxBRkFBLEFEQUEsQUlBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQXRCQUEsQXVCQUEsQWRBQSxBR0FBLEFEQUEsQVJBQTtBUkNBLEFTQUEsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBQ0FBLEF0QkFBLEF1QkFBLEFkQUEsQUdBQSxBREFBLEFSQUE7QVJDQSxBU0FBLEFFQUEsQUNBQSxBU0FBLEFGQUEsQURBQSxBSUFBLEFDQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBdEJBQSxBdUJBQSxBZEFBLEFHQUEsQURBQSxBUkFBO0FDQ0EsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBckJBQSxBdUJBQSxBZEFBLEFHQUEsQURBQSxBUkFBO0FDQ0EsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBckJBQSxBdUJBQSxBZEFBLEFHQUEsQURBQSxBUkFBO0FDQ0EsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBckJBQSxBdUJBQSxBZEFBLEFHQUEsQURBQSxBUkFBO0FDQ0EsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBckJBQSxBdUJBQSxBZEFBLEFHQUEsQURBQSxBUkFBO0FDQ0EsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBckJBQSxBdUJBQSxBZEFBLEFHQUEsQURBQSxBUkFBO0FDQ0EsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFJQUEsQUNBQSxBQ0FBLEFDQUEsQUNBQSxBckJBQSxBdUJBQSxBZEFBLEFHQUEsQURBQSxBUkFBO0FDQ0EsQUVBQSxBQ0FBLEFTQUEsQUZBQSxBREFBLEFNQUEsQUNBQSxBQ0FBLEFyQkFBLEF1QkFBLEFYQUEsQURBQSxBUkFBO0FDQ0EsQUdBQSxBU0FBLEFGQUEsQURBQSxBT0FBLEFDQUEsQUVBQSxBWEFBLEFEQUEsQVJBQTtBQ0NBLEFHQUEsQVNBQSxBRkFBLEFEQUEsQU9BQSxBR0FBLEFYQUEsQURBQSxBUkFBO0FJQ0EsQVNBQSxBRkFBLEFEQUEsQU9BQSxBR0FBLEFYQUEsQURBQSxBUkFBO0FJQ0EsQVNBQSxBRkFBLEFEQUEsQU9BQSxBR0FBLEFYQUEsQURBQSxBUkFBO0FJQ0EsQVNBQSxBRkFBLEFEQUEsQU9BQSxBR0FBLEFYQUEsQURBQSxBUkFBO0FJQ0EsQVNBQSxBRkFBLEFEQUEsQU9BQSxBR0FBLEFYQUEsQURBQSxBUkFBO0FJQ0EsQVNBQSxBSEFBLEFPQUEsQUdBQSxBWEFBLEFEQUEsQVJBQTtBSUNBLEFTQUEsQUhBQSxBT0FBLEFHQUEsQVhBQSxBREFBLEFSQUE7QUlDQSxBU0FBLEFIQUEsQU9BQSxBR0FBLEFYQUEsQURBQSxBUkFBO0FJQ0EsQVNBQSxBSEFBLEFPQUEsQUdBQSxBWEFBLEFEQUEsQVJBQTtBSUNBLEFTQUEsQUhBQSxBT0FBLEFHQUEsQVhBQSxBREFBLEFSQUE7QUlDQSxBU0FBLEFIQUEsQU9BQSxBR0FBLEFYQUEsQURBQSxBUkFBO0FJQ0EsQVNBQSxBSEFBLEFPQUEsQUdBQSxBWEFBLEFEQUEsQVJBQTtBSUNBLEFTQUEsQUhBQSxBT0FBLEFHQUEsQVhBQSxBREFBLEFSQUE7QUlDQSxBU0FBLEFIQUEsQU9BQSxBR0FBLEFYQUEsQURBQSxBUkFBO0FJQ0EsQU1BQSxBT0FBLEFHQUEsQVhBQSxBREFBLEFSQUE7QUlDQSxBTUFBLEFPQUEsQUdBQSxBWEFBLEFEQUEsQVJBQTtBSUNBLEFNQUEsQU9BQSxBR0FBLEFYQUEsQURBQSxBUkFBO0FJQ0EsQU1BQSxBT0FBLEFHQUEsQVhBQSxBREFBLEFSQUE7QUlDQSxBTUFBLEFPQUEsQUdBQSxBWEFBLEFEQUEsQVJBQTtBSUNBLEFNQUEsQU9BQSxBR0FBLEFYQUEsQVRBQTtBSUNBLEFNQUEsQU9BQSxBR0FBLEFwQkFBO0FJQ0EsQU1BQSxBT0FBLEFHQUEsQXBCQUE7QUlDQSxBTUFBLEFPQUEsQUdBQSxBcEJBQTtBSUNBLEFNQUEsQU9BQSxBR0FBLEFwQkFBO0FJQ0EsQU1BQSxBT0FBLEFHQUEsQXBCQUE7QUlDQSxBTUFBLEFPQUEsQUdBQSxBcEJBQTtBSUNBLEFNQUEsQU9BQSxBR0FBLEFwQkFBO0FJQ0EsQU1BQSxBT0FBLEFHQUEsQXBCQUE7QUlDQSxBTUFBLEFPQUEsQUdBQSxBcEJBQTtBSUNBLEFNQUEsQU9BQSxBR0FBLEFwQkFBO0FJQ0EsQU1BQSxBT0FBLEFHQUEsQXBCQUE7QVVDQSxBT0FBLEFHQUEsQXBCQUE7QVVDQSxBT0FBLEFHQUEsQXBCQUE7QVVDQSxBT0FBLEFHQUE7QVZDQSxBT0FBLEFHQUE7QVZDQSxBT0FBLEFHQUE7QVZDQSxBT0FBLEFHQUE7QVZDQSxBT0FBLEFHQUE7QVZDQSxBT0FBLEFHQUE7QVZDQSxBT0FBLEFHQUE7QVZDQSxBVUFBO0FWQ0EsQVVBQTtBVkNBLEFVQUE7QVZDQSxBVUFBO0FWQ0EsQVVBQTtBVkNBLEFVQUE7QVZDQSxBVUFBO0FWQ0EsQVVBQTtBVkNBLEFVQUE7QVZDQSxBVUFBO0FWQ0EsQVVBQTtBVkNBLEFVQUE7QVZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9hcGkvYmluZGluZ3MuanNcbl9fN2NkNDNmNjQ1MmU5ZWFiODQ0MzhhNGFkNjAyNWIzZTMgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbW9kdWxlID0geyBleHBvcnRzOiB7fSB9O1xuICB2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG4gIH0pO1xuXG4gIGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gW107XG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvdXRpbC9maW5kLmpzXG5fX2UwZDE4NDkxOTE2YzM2ZWRjZDgwMWZkYTAyMGNiYjY0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBbXS5zbGljZS5jYWxsKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL2FwaS9iaW5kLmpzXG5fX2VlNzFiNmVmZTU2NTgwZTNiMDU3NmU2MTQ2YmYyMGFmID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiAob2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgXCJkZWZhdWx0XCI6IG9ialxuICAgIH0pO1xuICB9XG5cbiAgdmFyIF9iaW5kaW5ncyA9IF9fN2NkNDNmNjQ1MmU5ZWFiODQ0MzhhNGFkNjAyNWIzZTM7XG4gIHZhciBfYmluZGluZ3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZGluZ3MpO1xuICB2YXIgX3V0aWxGaW5kID0gX19lMGQxODQ5MTkxNmMzNmVkY2Q4MDFmZGEwMjBjYmI2NDtcbiAgdmFyIF91dGlsRmluZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsRmluZCk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihzZWxlY3RvciwgZm4pIHtcbiAgICBfYmluZGluZ3MyW1wiZGVmYXVsdFwiXS5wdXNoKGZ1bmN0aW9uKGVsLCBpbml0aWFsQ29udGVudCkge1xuICAgICAgKDAsIF91dGlsRmluZDJbXCJkZWZhdWx0XCJdKShlbCwgc2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgIGZuKGVsLCB0YXJnZXQsIGluaXRpYWxDb250ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59KS5jYWxsKHRoaXMpOyIsIi8vIHNyYy9jb25zdGFudHMuanNcbl9fY2IwMGQ0MGM3M2E3MTUwYzMyOGY4YTdkMzkzMmEwMjkgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbW9kdWxlID0geyBleHBvcnRzOiB7fSB9O1xuICB2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG4gIH0pO1xuXG4gIHZhciBERUZBVUxUX0NPTlRFTlRfTkFNRSA9IFwidGV4dENvbnRlbnRcIjtcbiAgZXhwb3J0cy5ERUZBVUxUX0NPTlRFTlRfTkFNRSA9IERFRkFVTFRfQ09OVEVOVF9OQU1FO1xuICB2YXIgUFJPUEVSVFlfRVZFTlRfTkFNRSA9IFwic2hhZGUucHJvcGVydHlcIjtcbiAgZXhwb3J0cy5QUk9QRVJUWV9FVkVOVF9OQU1FID0gUFJPUEVSVFlfRVZFTlRfTkFNRTtcblxuICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59KS5jYWxsKHRoaXMpOyIsIi8vIHNyYy9hcGkvbGlzdGVuLmpzXG5fX2M1ZGQ2ZjhmNTlhMDNlMGRmN2JjZTg3M2MxYTZhZWY4ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICB2YXIgX2NvbnN0YW50cyA9IF9fY2IwMGQ0MGM3M2E3MTUwYzMyOGY4YTdkMzkzMmEwMjk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihlbCwgbmFtZSwgZm4pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgZm4gPSBuYW1lO1xuICAgICAgbmFtZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAobmFtZSkge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIlwiICsgX2NvbnN0YW50cy5QUk9QRVJUWV9FVkVOVF9OQU1FICsgXCIuXCIgKyBuYW1lLCBmbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoX2NvbnN0YW50cy5QUk9QRVJUWV9FVkVOVF9OQU1FLCBmbik7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvZXZlbnQvZXZlbnQuanNcbl9fMDRlNmE5MmRiYzViNDk1MGIxOWViYzg1YzU2MTVjZDMgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbW9kdWxlID0geyBleHBvcnRzOiB7fSB9O1xuICB2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG4gIH0pO1xuXG4gIHZhciBDdXN0b21FdmVudCA9IHdpbmRvdy5DdXN0b21FdmVudDtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKG5hbWUsIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgIGlmIChvcHRzLmJ1YmJsZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0cy5idWJibGVzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIG9wdHMpO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvZXZlbnQvZGlzcGF0Y2guanNcbl9fNWFkMWIwZWJmMGE0ZDcwYTJlOGZhNjZmZTY2MDNlMGEgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbW9kdWxlID0geyBleHBvcnRzOiB7fSB9O1xuICB2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIChvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICBcImRlZmF1bHRcIjogb2JqXG4gICAgfSk7XG4gIH1cblxuICB2YXIgX2V2ZW50ID0gX18wNGU2YTkyZGJjNWI0OTUwYjE5ZWJjODVjNTYxNWNkMztcbiAgdmFyIF9ldmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ldmVudCk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lLCBvcHRzKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoMCwgX2V2ZW50MltcImRlZmF1bHRcIl0pKG5hbWUsIG9wdHMpKTtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL2V2ZW50L25vdGlmeS5qc1xuX185ZTE3ZTM4YjgxNGNlN2ExNDA1NzczOGI0OWI1ZDdhYyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfZGlzcGF0Y2ggPSBfXzVhZDFiMGViZjBhNGQ3MGEyZThmYTY2ZmU2NjAzZTBhO1xuICB2YXIgX2Rpc3BhdGNoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Rpc3BhdGNoKTtcbiAgdmFyIF9jb25zdGFudHMgPSBfX2NiMDBkNDBjNzNhNzE1MGMzMjhmOGE3ZDM5MzJhMDI5O1xuXG4gIGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24oZWwsIG5hbWUpIHtcbiAgICB2YXIgb3B0cyA9IHtcbiAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgY2FuY2VsbGFibGU6IGZhbHNlLFxuXG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgdmFsdWU6IGVsW25hbWVdXG4gICAgICB9XG4gICAgfTtcblxuICAgICgwLCBfZGlzcGF0Y2gyW1wiZGVmYXVsdFwiXSkoZWwsIF9jb25zdGFudHMuUFJPUEVSVFlfRVZFTlRfTkFNRSwgb3B0cyk7XG5cbiAgICBpZiAob3B0cy5kZXRhaWwubmFtZSkge1xuICAgICAgKDAsIF9kaXNwYXRjaDJbXCJkZWZhdWx0XCJdKShlbCwgXCJcIiArIF9jb25zdGFudHMuUFJPUEVSVFlfRVZFTlRfTkFNRSArIFwiLlwiICsgb3B0cy5kZXRhaWwubmFtZSwgb3B0cyk7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvYXBpL25vdGlmeS5qc1xuX185ZmM3YTQ5YjQxNmYwNWZiYmMzYzY1YzU4MGQwMDJhMiA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfZXZlbnROb3RpZnkgPSBfXzllMTdlMzhiODE0Y2U3YTE0MDU3NzM4YjQ5YjVkN2FjO1xuICB2YXIgX2V2ZW50Tm90aWZ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50Tm90aWZ5KTtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWwpIHtcbiAgICAgICgwLCBfZXZlbnROb3RpZnkyW1wiZGVmYXVsdFwiXSkoZWwsIG5hbWUpO1xuICAgIH07XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59KS5jYWxsKHRoaXMpOyIsIi8vIHNyYy91dGlsL3BhcnNlLWFyZ3MuanNcbl9fOGY4ZWRlYWE2ZjVkMzU3YzVkODUzZDgxZDZjNjE4NmEgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbW9kdWxlID0geyBleHBvcnRzOiB7fSB9O1xuICB2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG4gIH0pO1xuXG4gIHZhciByZWdleEFyZ0NvbW1lbnRzID0gLygoXFwvXFwvLiokKXwoXFwvXFwqW1xcc1xcU10qP1xcKlxcLykpL2dtO1xuICB2YXIgcmVnZXhBcmdOYW1lcyA9IC8oW15cXHMsXSspL2c7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgdmFyIGZuU3RyID0gZnVuYy50b1N0cmluZygpLnJlcGxhY2UocmVnZXhBcmdDb21tZW50cywgXCJcIik7XG4gICAgdmFyIHJlc3VsdCA9IGZuU3RyLnNsaWNlKGZuU3RyLmluZGV4T2YoXCIoXCIpICsgMSwgZm5TdHIuaW5kZXhPZihcIilcIikpLm1hdGNoKHJlZ2V4QXJnTmFtZXMpO1xuXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgcmVzdWx0ID0gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL3V0aWwvcHJvcC1wcm94eS5qc1xuX18wMTI2ZDNiZTg4ZTg1OWE3MzYwYTUzNjE1YzhjOTVkOSA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfYXBpTGlzdGVuID0gX19jNWRkNmY4ZjU5YTAzZTBkZjdiY2U4NzNjMWE2YWVmODtcbiAgdmFyIF9hcGlMaXN0ZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBpTGlzdGVuKTtcbiAgdmFyIF9ldmVudE5vdGlmeSA9IF9fOWUxN2UzOGI4MTRjZTdhMTQwNTc3MzhiNDliNWQ3YWM7XG4gIHZhciBfZXZlbnROb3RpZnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnROb3RpZnkpO1xuICB2YXIgX3BhcnNlQXJncyA9IF9fOGY4ZWRlYWE2ZjVkMzU3YzVkODUzZDgxZDZjNjE4NmE7XG4gIHZhciBfcGFyc2VBcmdzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcnNlQXJncyk7XG4gIHZhciBnZXREZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuICBmdW5jdGlvbiByZXNvbHZlRGVzY3JpcHRvcihlbCwgbmFtZSkge1xuICAgIHJldHVybiBnZXREZXNjcmlwdG9yKGVsLCBuYW1lKTtcbiAgfVxuXG4gIGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24oZWwsIG5hbWUpIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHJlc29sdmVEZXNjcmlwdG9yKGVsLCBuYW1lKTtcbiAgICB2YXIgbGlua3MgPSBbXTtcbiAgICB2YXIgdmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUobmFtZSk7XG5cbiAgICBpZiAoZGVzY3JpcHRvciAmJiAhZGVzY3JpcHRvci5jb25maWd1cmFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmdldCkge1xuICAgICAgbGlua3MgPSAoMCwgX3BhcnNlQXJnczJbXCJkZWZhdWx0XCJdKShkZXNjcmlwdG9yLmdldCk7XG5cbiAgICAgIGxpbmtzLmZvckVhY2goZnVuY3Rpb24obGluaykge1xuICAgICAgICAoMCwgX2FwaUxpc3RlbjJbXCJkZWZhdWx0XCJdKShlbCwgbGluaywgX2V2ZW50Tm90aWZ5MltcImRlZmF1bHRcIl0uYmluZChudWxsLCBlbCwgbmFtZSkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwgbmFtZSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3IuZ2V0LmFwcGx5KHRoaXMsIGxpbmtzLm1hcChmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhhdFtsaW5rXTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnNldCkge1xuICAgICAgICAgIGRlc2NyaXB0b3Iuc2V0LmNhbGwodGhpcywgbmV3VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICAoMCwgX2V2ZW50Tm90aWZ5MltcImRlZmF1bHRcIl0pKHRoaXMsIG5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvYmluZGluZy9hdHRyLmpzXG5fX2MzOTYyODBiZGM0MzBkOWVhOTIyZGZkNTBmYjc4MjcyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiAob2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgXCJkZWZhdWx0XCI6IG9ialxuICAgIH0pO1xuICB9XG5cbiAgdmFyIF9hcGlMaXN0ZW4gPSBfX2M1ZGQ2ZjhmNTlhMDNlMGRmN2JjZTg3M2MxYTZhZWY4O1xuICB2YXIgX2FwaUxpc3RlbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcGlMaXN0ZW4pO1xuICB2YXIgX3V0aWxQcm9wUHJveHkgPSBfXzAxMjZkM2JlODhlODU5YTczNjBhNTM2MTVjOGM5NWQ5O1xuICB2YXIgX3V0aWxQcm9wUHJveHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbFByb3BQcm94eSk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihlbCwgdGFyZ2V0KSB7XG4gICAgdGFyZ2V0LmdldEF0dHJpYnV0ZShcImF0dHJcIikuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24ocGFydCkge1xuICAgICAgdmFyIHBhcnRzID0gcGFydC5zcGxpdChcIjpcIik7XG4gICAgICB2YXIgYXR0ck5hbWUgPSBwYXJ0c1swXTtcbiAgICAgIHZhciBwcm9wTmFtZSA9IHBhcnRzWzFdIHx8IGF0dHJOYW1lO1xuXG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gc2V0KHZhbCkge1xuICAgICAgICByZXR1cm4gKHZhbCA/IHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbCkgOiB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKSk7XG4gICAgICB9O1xuXG4gICAgICAoMCwgX3V0aWxQcm9wUHJveHkyW1wiZGVmYXVsdFwiXSkoZWwsIHByb3BOYW1lKTtcbiAgICAgIHNldChlbFtwcm9wTmFtZV0pO1xuXG4gICAgICAoMCwgX2FwaUxpc3RlbjJbXCJkZWZhdWx0XCJdKShlbCwgcHJvcE5hbWUsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2V0KGUuZGV0YWlsLnZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvZXZlbnQvbGlzdGVuLmpzXG5fXzZlYzJhYTMzZTlhZTRlNzZkNDRjYzlkZTQzODQ3YjY0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKGVsLCBuYW1lcywgY2FsbGJhY2spIHtcbiAgICBuYW1lcyA9IChBcnJheS5pc0FycmF5KG5hbWVzKSA/IG5hbWVzIDogW25hbWVzXSk7XG5cbiAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2spO1xuICAgIH0pO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvYmluZGluZy9jaGVja2VkLmpzXG5fXzQ3NzFjNWYyMmU1MWZlNzAxYTk5NDYzMTdhNjI2ZDNiID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiAob2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgXCJkZWZhdWx0XCI6IG9ialxuICAgIH0pO1xuICB9XG5cbiAgdmFyIF9hcGlMaXN0ZW4gPSBfX2M1ZGQ2ZjhmNTlhMDNlMGRmN2JjZTg3M2MxYTZhZWY4O1xuICB2YXIgX2FwaUxpc3RlbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcGlMaXN0ZW4pO1xuICB2YXIgX3V0aWxQcm9wUHJveHkgPSBfXzAxMjZkM2JlODhlODU5YTczNjBhNTM2MTVjOGM5NWQ5O1xuICB2YXIgX3V0aWxQcm9wUHJveHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbFByb3BQcm94eSk7XG4gIHZhciBfZXZlbnRMaXN0ZW4gPSBfXzZlYzJhYTMzZTlhZTRlNzZkNDRjYzlkZTQzODQ3YjY0O1xuICB2YXIgX2V2ZW50TGlzdGVuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50TGlzdGVuKTtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKGVsLCB0YXJnZXQpIHtcbiAgICB2YXIgcHJvcE5hbWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcbiAgICAoMCwgX3V0aWxQcm9wUHJveHkyW1wiZGVmYXVsdFwiXSkoZWwsIHByb3BOYW1lKTtcblxuICAgICgwLCBfYXBpTGlzdGVuMltcImRlZmF1bHRcIl0pKGVsLCBwcm9wTmFtZSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNoZWNrZWQgPSAhIWVsLmNoZWNrZWQ7XG4gICAgfSk7XG5cbiAgICAoMCwgX2V2ZW50TGlzdGVuMltcImRlZmF1bHRcIl0pKHRhcmdldCwgXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZWxbcHJvcE5hbWVdID0gdGFyZ2V0LmNoZWNrZWQ7XG4gICAgfSk7XG5cbiAgICBlbFtwcm9wTmFtZV0gPSB0YXJnZXQuY2hlY2tlZDtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL2JpbmRpbmcvY2xhc3MuanNcbl9fMmFkNDUxOGExZmY1OWZkNzQwM2Q3NTFjYTU3OWQ3Y2EgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbW9kdWxlID0geyBleHBvcnRzOiB7fSB9O1xuICB2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIChvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICBcImRlZmF1bHRcIjogb2JqXG4gICAgfSk7XG4gIH1cblxuICB2YXIgX2FwaUxpc3RlbiA9IF9fYzVkZDZmOGY1OWEwM2UwZGY3YmNlODczYzFhNmFlZjg7XG4gIHZhciBfYXBpTGlzdGVuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FwaUxpc3Rlbik7XG4gIHZhciBfdXRpbFByb3BQcm94eSA9IF9fMDEyNmQzYmU4OGU4NTlhNzM2MGE1MzYxNWM4Yzk1ZDk7XG4gIHZhciBfdXRpbFByb3BQcm94eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsUHJvcFByb3h5KTtcblxuICBmdW5jdGlvbiBjbGFzc0xpc3QoZWwpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0IHx8IGZ1bmN0aW9uKCkge1xuICAgICAgZnVuY3Rpb24gY2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGVsLmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKGNsYXNzTmFtZSkge1xuICAgICAgICAgIGlmIChjbGFzc05hbWVzKCkuaW5kZXhPZihjbGFzc05hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gKGVsLmNsYXNzTmFtZSA/IFwiIFwiICsgY2xhc3NOYW1lIDogY2xhc3NOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgdmFyIG5hbWVzID0gY2xhc3NOYW1lcygpO1xuICAgICAgICAgIHZhciBpbmRleCA9IG5hbWVzLmluZGV4T2YoY2xhc3NOYW1lKTtcblxuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBuYW1lcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gbmFtZXMuam9pbihcIiBcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0oKTtcbiAgfVxuXG4gIGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24oZWwsIHRhcmdldCkge1xuICAgIHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJzaC1jbGFzc1wiKS5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihwYXJ0KSB7XG4gICAgICB2YXIgcGFydHMgPSBwYXJ0LnNwbGl0KFwiOlwiKTtcbiAgICAgIHZhciBwcm9wTmFtZSA9IHBhcnRzWzBdO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IHBhcnRzWzFdO1xuXG4gICAgICBmdW5jdGlvbiB0b2dnbGUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgY2xhc3NMaXN0KHRhcmdldCkuYWRkKGNsYXNzTmFtZSB8fCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xhc3NMaXN0KHRhcmdldCkucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdG9nZ2xlKGVsW3Byb3BOYW1lXSk7XG4gICAgICAoMCwgX3V0aWxQcm9wUHJveHkyW1wiZGVmYXVsdFwiXSkoZWwsIHByb3BOYW1lKTtcblxuICAgICAgKDAsIF9hcGlMaXN0ZW4yW1wiZGVmYXVsdFwiXSkoZWwsIHByb3BOYW1lLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRvZ2dsZShlLmRldGFpbC52YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL3V0aWwvZnJhZ21lbnQtZnJvbS1jb2xsZWN0aW9uLmpzXG5fXzMwYjQwMDY0N2M5MmI1ODdmM2Q3ZTc1ZGIxODJjOThlID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKG5vZGVMaXN0KSB7XG4gICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBbXS5zbGljZS5jYWxsKG5vZGVMaXN0KS5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGZyYWcuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZnJhZztcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL3V0aWwvZmluZC1ub2Rlcy1iZXR3ZWVuLmpzXG5fX2Y4MGJkMGFmMGIxMGM3MjYyNmQ4YmRjZTAwMzEzYjZlID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKHN0YXJ0Tm9kZSwgc3RvcE5vZGUpIHtcbiAgICB2YXIgcGFyZW50Tm9kZSA9IHN0YXJ0Tm9kZS5wYXJlbnROb2RlO1xuICAgIHZhciBpc0JldHdlZW4gPSBmYWxzZTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgYSA9IDA7IGEgPCBwYXJlbnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBhKyspIHtcbiAgICAgIHZhciBjaGlsZE5vZGUgPSBwYXJlbnROb2RlLmNoaWxkTm9kZXNbYV07XG5cbiAgICAgIGlmIChjaGlsZE5vZGUgPT09IHN0YXJ0Tm9kZSkge1xuICAgICAgICBpc0JldHdlZW4gPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0JldHdlZW4pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZE5vZGUgPT09IHN0b3BOb2RlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjaGlsZE5vZGVzLnB1c2goY2hpbGROb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGROb2RlcztcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL3V0aWwvZnJhZ21lbnQtZnJvbS1ub2RlLmpzXG5fX2RjOGFjNTZmZTQ1M2QzNTVlNGYwNWQ0Yjc5MThiZjFlID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGlmIChub2RlKSB7XG4gICAgICBmcmFnLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBmcmFnO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvdXRpbC9mcmFnbWVudC1mcm9tLXN0cmluZy5qc1xuX183NTI4OGM5ZWFlNDNiZTRmNjlhNjA1ZDU3NDgxNDMyMCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfZnJhZ21lbnRGcm9tQ29sbGVjdGlvbiA9IF9fMzBiNDAwNjQ3YzkyYjU4N2YzZDdlNzVkYjE4MmM5OGU7XG4gIHZhciBfZnJhZ21lbnRGcm9tQ29sbGVjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcmFnbWVudEZyb21Db2xsZWN0aW9uKTtcblxuICB2YXIgc3BlY2lhbE1hcCA9IHtcbiAgICBjYXB0aW9uOiBcInRhYmxlXCIsXG4gICAgZGQ6IFwiZGxcIixcbiAgICBkdDogXCJkbFwiLFxuICAgIGxpOiBcInVsXCIsXG4gICAgdGJvZHk6IFwidGFibGVcIixcbiAgICB0ZDogXCJ0clwiLFxuICAgIHRoZWFkOiBcInRhYmxlXCIsXG4gICAgdHI6IFwidGJvZHlcIlxuICB9O1xuXG4gIGZ1bmN0aW9uIG1hdGNoVGFnKGRvbSkge1xuICAgIHZhciB0YWcgPSBkb20ubWF0Y2goL1xccyo8KFteXFxzPl0rKS8pO1xuICAgIHJldHVybiB0YWcgJiYgdGFnWzFdIHx8IFwiZGl2XCI7XG4gIH1cblxuICBmdW5jdGlvbiByZXNvbHZlQ29ycmVjdERvbVBhcmVudChkb20pIHtcbiAgICByZXR1cm4gcmVzb2x2ZUNvcnJlY3RUYWdQYXJlbnRzKG1hdGNoVGFnKGRvbSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZUNvcnJlY3RUYWdQYXJlbnRzKHRhZykge1xuICAgIHZhciBtYXBwZWQ7XG4gICAgdmFyIHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICAgIHdoaWxlIChtYXBwZWQgPSBzcGVjaWFsTWFwW3BhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgICB2YXIgdGVtcFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobWFwcGVkKTtcbiAgICAgIHRlbXBQYXJlbnQuYXBwZW5kQ2hpbGQocGFyZW50KTtcbiAgICAgIHBhcmVudCA9IHRlbXBQYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudDtcbiAgfVxuXG4gIGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24oZG9tKSB7XG4gICAgdmFyIHBhciA9IHJlc29sdmVDb3JyZWN0RG9tUGFyZW50KGRvbSk7XG4gICAgcGFyLmlubmVySFRNTCA9IGRvbTtcbiAgICByZXR1cm4gKDAsIF9mcmFnbWVudEZyb21Db2xsZWN0aW9uMltcImRlZmF1bHRcIl0pKHBhci5jaGlsZE5vZGVzKTtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL3V0aWwvZnJhZ21lbnQtZnJvbS1hbnl0aGluZy5qc1xuX181YTMwNmRmNzE2ZWIyMjEyZmY4MzQ4OTQ2NzJiYzM3MiA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmcmFnbWVudEZyb21Bbnl0aGluZztcblxuICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiAob2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgXCJkZWZhdWx0XCI6IG9ialxuICAgIH0pO1xuICB9XG5cbiAgdmFyIF9mcmFnbWVudEZyb21Db2xsZWN0aW9uID0gX18zMGI0MDA2NDdjOTJiNTg3ZjNkN2U3NWRiMTgyYzk4ZTtcbiAgdmFyIF9mcmFnbWVudEZyb21Db2xsZWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZyYWdtZW50RnJvbUNvbGxlY3Rpb24pO1xuICB2YXIgX2ZyYWdtZW50RnJvbU5vZGUgPSBfX2RjOGFjNTZmZTQ1M2QzNTVlNGYwNWQ0Yjc5MThiZjFlO1xuICB2YXIgX2ZyYWdtZW50RnJvbU5vZGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJhZ21lbnRGcm9tTm9kZSk7XG4gIHZhciBfZnJhZ21lbnRGcm9tU3RyaW5nID0gX183NTI4OGM5ZWFlNDNiZTRmNjlhNjA1ZDU3NDgxNDMyMDtcbiAgdmFyIF9mcmFnbWVudEZyb21TdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJhZ21lbnRGcm9tU3RyaW5nKTtcbiAgdmFyIERvY3VtZW50RnJhZ21lbnQgPSB3aW5kb3cuRG9jdW1lbnRGcmFnbWVudDtcbiAgdmFyIE5vZGUgPSB3aW5kb3cuTm9kZTtcbiAgdmFyIE5vZGVMaXN0ID0gd2luZG93Lk5vZGVMaXN0O1xuXG4gIGZ1bmN0aW9uIGZyYWdtZW50RnJvbUFueXRoaW5nKGl0ZW0pIHtcbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gKDAsIF9mcmFnbWVudEZyb21TdHJpbmcyW1wiZGVmYXVsdFwiXSkoaXRlbSk7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgIHJldHVybiAoMCwgX2ZyYWdtZW50RnJvbU5vZGUyW1wiZGVmYXVsdFwiXSkoaXRlbSk7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xuICAgICAgcmV0dXJuICgwLCBfZnJhZ21lbnRGcm9tQ29sbGVjdGlvbjJbXCJkZWZhdWx0XCJdKShpdGVtKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGl0ZW0ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gW10ucmVkdWNlLmNhbGwoaXRlbSwgZnVuY3Rpb24ocHJldiwgY3Vycikge1xuICAgICAgICBwcmV2LmFwcGVuZENoaWxkKGZyYWdtZW50RnJvbUFueXRoaW5nKGN1cnIpKTtcbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICB9LCBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59KS5jYWxsKHRoaXMpOyIsIi8vIHNyYy9iaW5kaW5nL2NvbnRlbnQvd3JhcC5qc1xuX19lMzU3MWZiOGJjNzJiNjhmOTUyZWNkZmVhNmM3YmEyOSA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfZXZlbnROb3RpZnkgPSBfXzllMTdlMzhiODE0Y2U3YTE0MDU3NzM4YjQ5YjVkN2FjO1xuICB2YXIgX2V2ZW50Tm90aWZ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50Tm90aWZ5KTtcbiAgdmFyIF91dGlsRmluZE5vZGVzQmV0d2VlbiA9IF9fZjgwYmQwYWYwYjEwYzcyNjI2ZDhiZGNlMDAzMTNiNmU7XG4gIHZhciBfdXRpbEZpbmROb2Rlc0JldHdlZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbEZpbmROb2Rlc0JldHdlZW4pO1xuICB2YXIgX3V0aWxGcmFnbWVudEZyb21Bbnl0aGluZyA9IF9fNWEzMDZkZjcxNmViMjIxMmZmODM0ODk0NjcyYmMzNzI7XG4gIHZhciBfdXRpbEZyYWdtZW50RnJvbUFueXRoaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxGcmFnbWVudEZyb21Bbnl0aGluZyk7XG4gIHZhciBfdXRpbEZyYWdtZW50RnJvbUNvbGxlY3Rpb24gPSBfXzMwYjQwMDY0N2M5MmI1ODdmM2Q3ZTc1ZGIxODJjOThlO1xuICB2YXIgX3V0aWxGcmFnbWVudEZyb21Db2xsZWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxGcmFnbWVudEZyb21Db2xsZWN0aW9uKTtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICBmdW5jdGlvbiBhZGREZWZhdWx0Tm9kZXMoKSB7XG4gICAgICBpZiAoIWNvbnRlbnQuX19pbml0aWFsaXNlZCkge1xuICAgICAgICBjb250ZW50Ll9faW5pdGlhbGlzZWQgPSB0cnVlO1xuICAgICAgICB2YXIgcmVmZXJlbmNlID0gY29udGVudC5fX3N0b3BOb2RlO1xuICAgICAgICByZWZlcmVuY2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY29udGVudC5fX2RlZmF1bHQuY2xvbmVOb2RlKHRydWUpLCByZWZlcmVuY2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFsbE5vZGVzKCkge1xuICAgICAgcmV0dXJuICgwLCBfdXRpbEZpbmROb2Rlc0JldHdlZW4yW1wiZGVmYXVsdFwiXSkoY29udGVudC5fX3N0YXJ0Tm9kZSwgY29udGVudC5fX3N0b3BOb2RlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVEZWZhdWx0Tm9kZXMoKSB7XG4gICAgICBpZiAoY29udGVudC5fX2luaXRpYWxpc2VkKSB7XG4gICAgICAgIGNvbnRlbnQuX19pbml0aWFsaXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIGdldEFsbE5vZGVzKCkuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3RpZnkoKSB7XG4gICAgICAoMCwgX2V2ZW50Tm90aWZ5MltcImRlZmF1bHRcIl0pKGNvbnRlbnQuX19lbGVtZW50LCBjb250ZW50Ll9fbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHtcbiAgICAgIGFjY2VwdDogZnVuY3Rpb24gYWNjZXB0KG5vZGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIG5vZGUgPSAoMCwgX3V0aWxGcmFnbWVudEZyb21Bbnl0aGluZzJbXCJkZWZhdWx0XCJdKShub2RlKTtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gY29udGVudC5nZXRBdHRyaWJ1dGUoXCJzZWxlY3RcIik7XG4gICAgICAgIHZhciB3cmFwID0gY29udGVudC5nZXRBdHRyaWJ1dGUoXCJ3cmFwXCIpO1xuXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIG5vZGUgPSAoMCwgX3V0aWxGcmFnbWVudEZyb21Db2xsZWN0aW9uMltcImRlZmF1bHRcIl0pKG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdyYXApIHtcbiAgICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBhKyspIHtcbiAgICAgICAgICAgIHZhciB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChub2RlLmNoaWxkcmVuW2FdKTtcbiAgICAgICAgICAgIG5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIG5vZGUuY2hpbGRyZW5bYV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgcmVtb3ZlRGVmYXVsdE5vZGVzKCk7XG4gICAgICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkRGVmYXVsdE5vZGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG5cbiAgICAgIGFwcGVuZDogZnVuY3Rpb24gYXBwZW5kKG5vZGUpIHtcbiAgICAgICAgdmFyIHJlZmVyZW5jZSA9IGNvbnRlbnQuX19zdG9wTm9kZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hY2NlcHQobm9kZSwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIHJlZmVyZW5jZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCByZWZlcmVuY2UpO1xuICAgICAgICAgIG5vdGlmeSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIGF0OiBmdW5jdGlvbiBhdChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1tpbmRleF07XG4gICAgICB9LFxuXG4gICAgICBjb250YWluczogZnVuY3Rpb24gY29udGFpbnMobm9kZSkge1xuICAgICAgICByZXR1cm4gY29udGVudC5fX3N0YXJ0Tm9kZS5wYXJlbnROb2RlID09PSBub2RlLnBhcmVudE5vZGU7XG4gICAgICB9LFxuXG4gICAgICBlYWNoOiBmdW5jdGlvbiBlYWNoKGZuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVzLmZvckVhY2goZm4pO1xuICAgICAgfSxcblxuICAgICAgZmluZDogZnVuY3Rpb24gZmluZChxdWVyeSkge1xuICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG9sZFF1ZXJ5ID0gcXVlcnk7XG5cbiAgICAgICAgICAgIHF1ZXJ5ID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICBmb3IgKHZhciBhIGluIG9sZFF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1bYV0gPT09IG9sZFF1ZXJ5W2FdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5maWx0ZXIocXVlcnkpO1xuICAgICAgfSxcblxuICAgICAgaW5kZXg6IGZ1bmN0aW9uIGluZGV4KG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICAgIH0sXG5cbiAgICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KG5vZGUsIGF0KSB7XG4gICAgICAgIHZhciByZWZlcmVuY2UgPSB0aGlzLm5vZGVzW2F0XSB8fCBjb250ZW50Ll9fc3RvcE5vZGU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYWNjZXB0KG5vZGUsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICByZWZlcmVuY2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgcmVmZXJlbmNlKTtcbiAgICAgICAgICBub3RpZnkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBtYXA6IGZ1bmN0aW9uIG1hcChmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5tYXAoZm4pO1xuICAgICAgfSxcblxuICAgICAgcHJlcGVuZDogZnVuY3Rpb24gcHJlcGVuZChub2RlKSB7XG4gICAgICAgIHZhciByZWZlcmVuY2UgPSB0aGlzLm5vZGVzWzBdIHx8IGNvbnRlbnQuX19zdG9wTm9kZTtcblxuICAgICAgICB0aGlzLmFjY2VwdChub2RlLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgcmVmZXJlbmNlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZmVyZW5jZSk7XG4gICAgICAgICAgbm90aWZ5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcblxuICAgICAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoZm4sIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5yZWR1Y2UoZm4sIGluaXRpYWxWYWx1ZSk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShub2RlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIG5vZGUgPSB0aGlzLm5vZGVzW25vZGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbnMobm9kZSkpIHtcbiAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgICAgbm90aWZ5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgYWRkRGVmYXVsdE5vZGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZUFsbDogZnVuY3Rpb24gcmVtb3ZlQWxsKCkge1xuICAgICAgICB0aGlzLm5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgICBub3RpZnkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkRGVmYXVsdE5vZGVzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGh0bWw6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3Vycikge1xuICAgICAgICAgICAgcmV0dXJuIHByZXYgKyBjdXJyLm91dGVySFRNTDtcbiAgICAgICAgICB9LCBcIlwiKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGwoKS5hcHBlbmQodmFsdWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcblxuICAgICAgbGVuZ3RoOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMubGVuZ3RoO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcblxuICAgICAgbm9kZXM6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0QWxsTm9kZXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0sXG5cbiAgICAgIHRleHQ6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3Vycikge1xuICAgICAgICAgICAgcmV0dXJuIHByZXYgKyBjdXJyLnRleHRDb250ZW50O1xuICAgICAgICAgIH0sIFwiXCIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbCgpLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvYmluZGluZy9jb250ZW50L21ha2UtcHJvcGVydHkuanNcbl9fM2I0MTc0MWM1ODdiMDcxN2ZmYmU0MTBkZWU1OTViNDAgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbW9kdWxlID0geyBleHBvcnRzOiB7fSB9O1xuICB2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIChvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICBcImRlZmF1bHRcIjogb2JqXG4gICAgfSk7XG4gIH1cblxuICB2YXIgX3dyYXAgPSBfX2UzNTcxZmI4YmM3MmI2OGY5NTJlY2RmZWE2YzdiYTI5O1xuICB2YXIgX3dyYXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd3JhcCk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHZhciBuYW1lID0gY29udGVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpIHx8IFwidGV4dENvbnRlbnRcIjtcbiAgICAgICAgdmFyIG5vZGVzID0gKDAsIF93cmFwMltcImRlZmF1bHRcIl0pKGNvbnRlbnQpO1xuXG4gICAgICAgIGlmIChuYW1lID09PSBcInRleHRDb250ZW50XCIgfHwgY29udGVudC5oYXNBdHRyaWJ1dGUoXCJ0ZXh0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzLnRleHQ7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJpbm5lckhUTUxcIiB8fCBjb250ZW50Lmhhc0F0dHJpYnV0ZShcImh0bWxcIikpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZXMuaHRtbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoY29udGVudC5oYXNBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKSA/IG5vZGVzIDogbm9kZXMubm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICB2YXIgbmFtZSA9IGNvbnRlbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcbiAgICAgICAgdmFyIHRleHQgPSBjb250ZW50Lmhhc0F0dHJpYnV0ZShcInRleHRcIik7XG4gICAgICAgICgwLCBfd3JhcDJbXCJkZWZhdWx0XCJdKShjb250ZW50KVsobmFtZSA9PT0gXCJ0ZXh0Q29udGVudFwiIHx8IHRleHQgPyBcInRleHRcIiA6IFwiaHRtbFwiKV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvdXRpbC90cmltLmpzXG5fXzg5NjFiNmM4ZjlkMjZkY2NkOTcyNzMyYzQ5ODVmOGM5ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICBmb3IgKHZhciBhID0gZWxlbS5jaGlsZE5vZGVzLmxlbmd0aCAtIDE7IGEgPiAtMTsgYS0tKSB7XG4gICAgICB2YXIgY2hpbGQgPSBlbGVtLmNoaWxkTm9kZXNbYV07XG5cbiAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gMyAmJiBjaGlsZC50ZXh0Q29udGVudC5tYXRjaCgvXlxccyokLykpIHtcbiAgICAgICAgZWxlbS5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvYmluZGluZy9jb250ZW50LmpzXG5fX2FmNGU2NzJlN2JlNmNkYmIxNzYzN2Y4NGNjZmUxY2Y5ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiAob2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgXCJkZWZhdWx0XCI6IG9ialxuICAgIH0pO1xuICB9XG5cbiAgdmFyIF9jb25zdGFudHMgPSBfX2NiMDBkNDBjNzNhNzE1MGMzMjhmOGE3ZDM5MzJhMDI5O1xuICB2YXIgX3V0aWxGcmFnbWVudEZyb21Db2xsZWN0aW9uID0gX18zMGI0MDA2NDdjOTJiNTg3ZjNkN2U3NWRiMTgyYzk4ZTtcbiAgdmFyIF91dGlsRnJhZ21lbnRGcm9tQ29sbGVjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsRnJhZ21lbnRGcm9tQ29sbGVjdGlvbik7XG4gIHZhciBfY29udGVudE1ha2VQcm9wZXJ0eSA9IF9fM2I0MTc0MWM1ODdiMDcxN2ZmYmU0MTBkZWU1OTViNDA7XG4gIHZhciBfY29udGVudE1ha2VQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb250ZW50TWFrZVByb3BlcnR5KTtcbiAgdmFyIF91dGlsVHJpbSA9IF9fODk2MWI2YzhmOWQyNmRjY2Q5NzI3MzJjNDk4NWY4Yzk7XG4gIHZhciBfdXRpbFRyaW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbFRyaW0pO1xuICB2YXIgX2NvbnRlbnRXcmFwID0gX19lMzU3MWZiOGJjNzJiNjhmOTUyZWNkZmVhNmM3YmEyOTtcbiAgdmFyIF9jb250ZW50V3JhcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb250ZW50V3JhcCk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihlbCwgdGFyZ2V0LCBpbml0aWFsQ29udGVudCkge1xuICAgIHZhciBuYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgfHwgX2NvbnN0YW50cy5ERUZBVUxUX0NPTlRFTlRfTkFNRTtcbiAgICB2YXIgcGFyZW50Tm9kZSA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgIHZhciBzdGFydE5vZGUgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KFwiXCIpO1xuICAgIHZhciBzdG9wTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJcIik7XG4gICAgKDAsIF91dGlsVHJpbTJbXCJkZWZhdWx0XCJdKSh0YXJnZXQpO1xuICAgIHRhcmdldC5fX2RlZmF1bHQgPSAoMCwgX3V0aWxGcmFnbWVudEZyb21Db2xsZWN0aW9uMltcImRlZmF1bHRcIl0pKHRhcmdldC5jaGlsZE5vZGVzKTtcbiAgICB0YXJnZXQuX19lbGVtZW50ID0gZWw7XG4gICAgdGFyZ2V0Ll9faW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICB0YXJnZXQuX19uYW1lID0gbmFtZTtcbiAgICB0YXJnZXQuX19zdGFydE5vZGUgPSBzdGFydE5vZGU7XG4gICAgdGFyZ2V0Ll9fc3RvcE5vZGUgPSBzdG9wTm9kZTtcblxuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gXCJDT05URU5UXCIpIHtcbiAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0YXJ0Tm9kZSwgdGFyZ2V0KTtcbiAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0b3BOb2RlLCB0YXJnZXQpO1xuICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdGFydE5vZGUpO1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0b3BOb2RlKTtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIG5hbWUsICgwLCBfY29udGVudE1ha2VQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSh0YXJnZXQpKTtcbiAgICAoMCwgX2NvbnRlbnRXcmFwMltcImRlZmF1bHRcIl0pKHRhcmdldCkuaHRtbCA9IGluaXRpYWxDb250ZW50O1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvYmluZGluZy9pZi5qc1xuX184NGY4NDI0MGMzNGU3N2ZhYWE5YWMwMTcwMzNmYzhmNCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfYXBpTGlzdGVuID0gX19jNWRkNmY4ZjU5YTAzZTBkZjdiY2U4NzNjMWE2YWVmODtcbiAgdmFyIF9hcGlMaXN0ZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBpTGlzdGVuKTtcbiAgdmFyIF91dGlsUHJvcFByb3h5ID0gX18wMTI2ZDNiZTg4ZTg1OWE3MzYwYTUzNjE1YzhjOTVkOTtcbiAgdmFyIF91dGlsUHJvcFByb3h5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxQcm9wUHJveHkpO1xuXG4gIGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24oZWwsIHRhcmdldCkge1xuICAgIHZhciBwcm9wTmFtZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJpZlwiKTtcbiAgICB2YXIgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlwiKTtcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCB0YXJnZXQpO1xuICAgICgwLCBfdXRpbFByb3BQcm94eTJbXCJkZWZhdWx0XCJdKShlbCwgcHJvcE5hbWUpO1xuXG4gICAgKDAsIF9hcGlMaXN0ZW4yW1wiZGVmYXVsdFwiXSkoZWwsIHByb3BOYW1lLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5kZXRhaWwudmFsdWUgJiYgIXRhcmdldC5wYXJlbnROb2RlKSB7XG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUodGFyZ2V0LCBwbGFjZWhvbGRlcik7XG4gICAgICB9IGVsc2UgaWYgKCFlLmRldGFpbC52YWx1ZSAmJiB0YXJnZXQucGFyZW50Tm9kZSkge1xuICAgICAgICB0YXJnZXQucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59KS5jYWxsKHRoaXMpOyIsIi8vIHNyYy9iaW5kaW5nL2lmbm90LmpzXG5fXzRlMjcyMzExZTAxYmU1M2ExOGVhMTE1ZGEwMDAyYjU5ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTtcbiAgdmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiAob2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgXCJkZWZhdWx0XCI6IG9ialxuICAgIH0pO1xuICB9XG5cbiAgdmFyIF9hcGlMaXN0ZW4gPSBfX2M1ZGQ2ZjhmNTlhMDNlMGRmN2JjZTg3M2MxYTZhZWY4O1xuICB2YXIgX2FwaUxpc3RlbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcGlMaXN0ZW4pO1xuICB2YXIgX3V0aWxQcm9wUHJveHkgPSBfXzAxMjZkM2JlODhlODU5YTczNjBhNTM2MTVjOGM5NWQ5O1xuICB2YXIgX3V0aWxQcm9wUHJveHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbFByb3BQcm94eSk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihlbCwgdGFyZ2V0KSB7XG4gICAgdmFyIHByb3BOYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImlmXCIpO1xuICAgIHZhciBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KFwiXCIpO1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIHRhcmdldCk7XG4gICAgKDAsIF91dGlsUHJvcFByb3h5MltcImRlZmF1bHRcIl0pKGVsLCBwcm9wTmFtZSk7XG5cbiAgICAoMCwgX2FwaUxpc3RlbjJbXCJkZWZhdWx0XCJdKShlbCwgcHJvcE5hbWUsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmRldGFpbC52YWx1ZSAmJiAhdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmICghZS5kZXRhaWwudmFsdWUgJiYgdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSh0YXJnZXQsIHBsYWNlaG9sZGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL2JpbmRpbmcvbmFtZS5qc1xuX184ZDM1NGNjYmVjODIxNGE5YjYxNDlmOTBjMWQzNjAwYyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfYXBpTGlzdGVuID0gX19jNWRkNmY4ZjU5YTAzZTBkZjdiY2U4NzNjMWE2YWVmODtcbiAgdmFyIF9hcGlMaXN0ZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBpTGlzdGVuKTtcbiAgdmFyIF9ldmVudExpc3RlbiA9IF9fNmVjMmFhMzNlOWFlNGU3NmQ0NGNjOWRlNDM4NDdiNjQ7XG4gIHZhciBfZXZlbnRMaXN0ZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnRMaXN0ZW4pO1xuICB2YXIgX3V0aWxQcm9wUHJveHkgPSBfXzAxMjZkM2JlODhlODU5YTczNjBhNTM2MTVjOGM5NWQ5O1xuICB2YXIgX3V0aWxQcm9wUHJveHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbFByb3BQcm94eSk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihlbCwgdGFyZ2V0KSB7XG4gICAgdmFyIHByb3BOYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgKDAsIF91dGlsUHJvcFByb3h5MltcImRlZmF1bHRcIl0pKGVsLCBwcm9wTmFtZSk7XG5cbiAgICAoMCwgX2FwaUxpc3RlbjJbXCJkZWZhdWx0XCJdKShlbCwgcHJvcE5hbWUsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHRhcmdldC52YWx1ZSA9IGUuZGV0YWlsLnZhbHVlIHx8IFwiXCI7XG4gICAgfSk7XG5cbiAgICAoMCwgX2V2ZW50TGlzdGVuMltcImRlZmF1bHRcIl0pKGVsLCBbXCJjaGFuZ2VcIiwgXCJrZXl1cFwiXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZWxbcHJvcE5hbWVdID0gdGFyZ2V0LnZhbHVlO1xuICAgIH0pO1xuXG4gICAgZWxbcHJvcE5hbWVdID0gdGFyZ2V0LnZhbHVlO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvYmluZGluZy9vbi5qc1xuX18yYWU5YWRmYjAxYjYzNzQ0ZWJhZjBlM2I0YzJiOTVmZSA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcbiAgICAgIHZhciBfYXJyID0gW107XG4gICAgICB2YXIgX24gPSB0cnVlO1xuICAgICAgdmFyIF9kID0gZmFsc2U7XG4gICAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kID0gdHJ1ZTtcbiAgICAgICAgX2UgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pXG4gICAgICAgICAgICBfaVtcInJldHVyblwiXSgpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZClcbiAgICAgICAgICAgIHRocm93IF9lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfYXJyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH1cblxuICB2YXIgX2V2ZW50RGlzcGF0Y2ggPSBfXzVhZDFiMGViZjBhNGQ3MGEyZThmYTY2ZmU2NjAzZTBhO1xuICB2YXIgX2V2ZW50RGlzcGF0Y2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnREaXNwYXRjaCk7XG5cbiAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbihlbCwgdGFyZ2V0KSB7XG4gICAgdGFyZ2V0LmdldEF0dHJpYnV0ZShcIm9uXCIpLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHBhaXIpIHtcbiAgICAgIHZhciBoYW5kbGVyRnVuYztcbiAgICAgIHZhciBfcGFpciRzcGxpdCA9IHBhaXIuc3BsaXQoXCI6XCIpO1xuICAgICAgdmFyIF9wYWlyJHNwbGl0MiA9IF9zbGljZWRUb0FycmF5KF9wYWlyJHNwbGl0LCAyKTtcbiAgICAgIHZhciBwcm9wTmFtZSA9IF9wYWlyJHNwbGl0MlswXTtcbiAgICAgIHZhciBoYW5kbGVyTmFtZSA9IF9wYWlyJHNwbGl0MlsxXTtcbiAgICAgIGhhbmRsZXJOYW1lID0gaGFuZGxlck5hbWUgfHwgXCJoYW5kbGVcIiArIChwcm9wTmFtZVswXS50b1VwcGVyQ2FzZSgpICsgcHJvcE5hbWUuc3Vic3RyaW5nKDEpKTtcblxuICAgICAgaGFuZGxlckZ1bmMgPSAoZWxbaGFuZGxlck5hbWVdIHx8IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgKDAsIF9ldmVudERpc3BhdGNoMltcImRlZmF1bHRcIl0pKHRoaXMsIGhhbmRsZXJOYW1lLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pLmJpbmQoZWwpO1xuXG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihwcm9wTmFtZSwgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBoYW5kbGVyRnVuYyhlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufSkuY2FsbCh0aGlzKTsiLCIvLyBzcmMvYmluZGluZy9zdHlsZS5qc1xuX19kNDk0ZjJlMTRlMmFlYmEzOThmOTg4MjUxMDZhZTg4OCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfYXBpTGlzdGVuID0gX19jNWRkNmY4ZjU5YTAzZTBkZjdiY2U4NzNjMWE2YWVmODtcbiAgdmFyIF9hcGlMaXN0ZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBpTGlzdGVuKTtcbiAgdmFyIF91dGlsUHJvcFByb3h5ID0gX18wMTI2ZDNiZTg4ZTg1OWE3MzYwYTUzNjE1YzhjOTVkOTtcbiAgdmFyIF91dGlsUHJvcFByb3h5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxQcm9wUHJveHkpO1xuXG4gIGZ1bmN0aW9uIHB4SWZOdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsID09PSBcIm51bWJlclwiID8gdmFsICsgXCJweFwiIDogdmFsKTtcbiAgfVxuXG4gIGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24oZWwsIHRhcmdldCkge1xuICAgIHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJzaC1zdHlsZVwiKS5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihwYXJ0KSB7XG4gICAgICB2YXIgcGFydHMgPSBwYXJ0LnNwbGl0KFwiOlwiKTtcbiAgICAgIHZhciBhdHRyTmFtZSA9IHBhcnRzWzBdO1xuICAgICAgdmFyIHByb3BOYW1lID0gcGFydHNbMV0gfHwgYXR0ck5hbWU7XG4gICAgICB0YXJnZXQuc3R5bGVbYXR0ck5hbWVdID0gcHhJZk51bWJlcihlbFtwcm9wTmFtZV0pO1xuICAgICAgKDAsIF91dGlsUHJvcFByb3h5MltcImRlZmF1bHRcIl0pKGVsLCBwcm9wTmFtZSk7XG5cbiAgICAgICgwLCBfYXBpTGlzdGVuMltcImRlZmF1bHRcIl0pKGVsLCBwcm9wTmFtZSwgZnVuY3Rpb24oZSkge1xuICAgICAgICB0YXJnZXQuc3R5bGVbYXR0ck5hbWVdID0gcHhJZk51bWJlcihlLmRldGFpbC52YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7IiwiLy8gc3JjL2JpbmRpbmcvdGV4dC5qc1xuX182ZDc3YjkwMTI2NGI5M2Y2OWRiZDBlZjNlYTg1MDNkYyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfYXBpTGlzdGVuID0gX19jNWRkNmY4ZjU5YTAzZTBkZjdiY2U4NzNjMWE2YWVmODtcbiAgdmFyIF9hcGlMaXN0ZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBpTGlzdGVuKTtcbiAgdmFyIF91dGlsUHJvcFByb3h5ID0gX18wMTI2ZDNiZTg4ZTg1OWE3MzYwYTUzNjE1YzhjOTVkOTtcbiAgdmFyIF91dGlsUHJvcFByb3h5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxQcm9wUHJveHkpO1xuXG4gIGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24oZWwsIHRhcmdldCkge1xuICAgIHZhciBwcm9wTmFtZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0ZXh0XCIpO1xuICAgIHRhcmdldC50ZXh0Q29udGVudCA9IGVsW3Byb3BOYW1lXTtcbiAgICAoMCwgX3V0aWxQcm9wUHJveHkyW1wiZGVmYXVsdFwiXSkoZWwsIHByb3BOYW1lKTtcblxuICAgICgwLCBfYXBpTGlzdGVuMltcImRlZmF1bHRcIl0pKGVsLCBwcm9wTmFtZSwgZnVuY3Rpb24oZSkge1xuICAgICAgdGFyZ2V0LnRleHRDb250ZW50ID0gZS5kZXRhaWwudmFsdWU7XG4gICAgfSk7XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59KS5jYWxsKHRoaXMpOyIsIi8vIHNyYy9pbmRleC5qc1xuX19kZmY2MmRjNWE4MDJhYmUzNDY0NmI0ZjQ4NGZjNmYzZiA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH07XG4gIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfYXBpQmluZCA9IF9fZWU3MWI2ZWZlNTY1ODBlM2IwNTc2ZTYxNDZiZjIwYWY7XG4gIHZhciBfYXBpQmluZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcGlCaW5kKTtcbiAgdmFyIF9hcGlCaW5kaW5ncyA9IF9fN2NkNDNmNjQ1MmU5ZWFiODQ0MzhhNGFkNjAyNWIzZTM7XG4gIHZhciBfYXBpQmluZGluZ3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBpQmluZGluZ3MpO1xuICB2YXIgX2FwaUxpc3RlbiA9IF9fYzVkZDZmOGY1OWEwM2UwZGY3YmNlODczYzFhNmFlZjg7XG4gIHZhciBfYXBpTGlzdGVuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FwaUxpc3Rlbik7XG4gIHZhciBfYXBpTm90aWZ5ID0gX185ZmM3YTQ5YjQxNmYwNWZiYmMzYzY1YzU4MGQwMDJhMjtcbiAgdmFyIF9hcGlOb3RpZnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBpTm90aWZ5KTtcbiAgdmFyIF9iaW5kaW5nQXR0ciA9IF9fYzM5NjI4MGJkYzQzMGQ5ZWE5MjJkZmQ1MGZiNzgyNzI7XG4gIHZhciBfYmluZGluZ0F0dHIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZGluZ0F0dHIpO1xuICB2YXIgX2JpbmRpbmdDaGVja2VkID0gX180NzcxYzVmMjJlNTFmZTcwMWE5OTQ2MzE3YTYyNmQzYjtcbiAgdmFyIF9iaW5kaW5nQ2hlY2tlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaW5kaW5nQ2hlY2tlZCk7XG4gIHZhciBfYmluZGluZ0NsYXNzID0gX18yYWQ0NTE4YTFmZjU5ZmQ3NDAzZDc1MWNhNTc5ZDdjYTtcbiAgdmFyIF9iaW5kaW5nQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZGluZ0NsYXNzKTtcbiAgdmFyIF9iaW5kaW5nQ29udGVudCA9IF9fYWY0ZTY3MmU3YmU2Y2RiYjE3NjM3Zjg0Y2NmZTFjZjk7XG4gIHZhciBfYmluZGluZ0NvbnRlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZGluZ0NvbnRlbnQpO1xuICB2YXIgX2JpbmRpbmdJZiA9IF9fODRmODQyNDBjMzRlNzdmYWFhOWFjMDE3MDMzZmM4ZjQ7XG4gIHZhciBfYmluZGluZ0lmMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2JpbmRpbmdJZik7XG4gIHZhciBfYmluZGluZ0lmbm90ID0gX180ZTI3MjMxMWUwMWJlNTNhMThlYTExNWRhMDAwMmI1OTtcbiAgdmFyIF9iaW5kaW5nSWZub3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZGluZ0lmbm90KTtcbiAgdmFyIF9iaW5kaW5nTmFtZSA9IF9fOGQzNTRjY2JlYzgyMTRhOWI2MTQ5ZjkwYzFkMzYwMGM7XG4gIHZhciBfYmluZGluZ05hbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZGluZ05hbWUpO1xuICB2YXIgX2JpbmRpbmdPbiA9IF9fMmFlOWFkZmIwMWI2Mzc0NGViYWYwZTNiNGMyYjk1ZmU7XG4gIHZhciBfYmluZGluZ09uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2JpbmRpbmdPbik7XG4gIHZhciBfYmluZGluZ1N0eWxlID0gX19kNDk0ZjJlMTRlMmFlYmEzOThmOTg4MjUxMDZhZTg4ODtcbiAgdmFyIF9iaW5kaW5nU3R5bGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZGluZ1N0eWxlKTtcbiAgdmFyIF9iaW5kaW5nVGV4dCA9IF9fNmQ3N2I5MDEyNjRiOTNmNjlkYmQwZWYzZWE4NTAzZGM7XG4gIHZhciBfYmluZGluZ1RleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZGluZ1RleHQpO1xuICB2YXIgX3V0aWxGcmFnbWVudEZyb21Db2xsZWN0aW9uID0gX18zMGI0MDA2NDdjOTJiNTg3ZjNkN2U3NWRiMTgyYzk4ZTtcbiAgdmFyIF91dGlsRnJhZ21lbnRGcm9tQ29sbGVjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsRnJhZ21lbnRGcm9tQ29sbGVjdGlvbik7XG4gIHZhciBfdXRpbEZyYWdtZW50RnJvbVN0cmluZyA9IF9fNzUyODhjOWVhZTQzYmU0ZjY5YTYwNWQ1NzQ4MTQzMjA7XG4gIHZhciBfdXRpbEZyYWdtZW50RnJvbVN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsRnJhZ21lbnRGcm9tU3RyaW5nKTtcbiAgdmFyIERvY3VtZW50RnJhZ21lbnQgPSB3aW5kb3cuRG9jdW1lbnRGcmFnbWVudDtcblxuICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgZnVuY3Rpb24gdGVtcGxhdGUoKSB7XG4gICAgICB2YXIgdG1wSHRtbCA9IChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBhcmd1bWVudHNbMF0pO1xuICAgICAgdG1wSHRtbCA9IHRtcEh0bWwudG9TdHJpbmcoKS50cmltKCk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgIHZhciBpbml0aWFsQ29udGVudDtcbiAgICAgICAgZWxlbSA9IGVsZW0gfHwgdGhpcztcbiAgICAgICAgZWxlbSA9ICh0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIiA/ICgwLCBfdXRpbEZyYWdtZW50RnJvbVN0cmluZzJbXCJkZWZhdWx0XCJdKShlbGVtKSA6IGVsZW0pO1xuICAgICAgICBlbGVtID0gKGVsZW0gaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50ID8gZWxlbS5jaGlsZHJlbi5pdGVtKDApIDogZWxlbSk7XG4gICAgICAgIGluaXRpYWxDb250ZW50ID0gKDAsIF91dGlsRnJhZ21lbnRGcm9tQ29sbGVjdGlvbjJbXCJkZWZhdWx0XCJdKShlbGVtLmNoaWxkTm9kZXMpO1xuICAgICAgICBlbGVtLmlubmVySFRNTCA9IHRtcEh0bWw7XG5cbiAgICAgICAgX2FwaUJpbmRpbmdzMltcImRlZmF1bHRcIl0uZm9yRWFjaChmdW5jdGlvbihiaW5kaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIGJpbmRpbmcoZWxlbSwgaW5pdGlhbENvbnRlbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZWxlbTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGVtcGxhdGUuYmluZCA9IF9hcGlCaW5kMltcImRlZmF1bHRcIl07XG4gICAgdGVtcGxhdGUuYmluZGluZ3MgPSBfYXBpQmluZGluZ3MyW1wiZGVmYXVsdFwiXTtcbiAgICB0ZW1wbGF0ZS5saXN0ZW4gPSBfYXBpTGlzdGVuMltcImRlZmF1bHRcIl07XG4gICAgdGVtcGxhdGUubm90aWZ5ID0gX2FwaU5vdGlmeTJbXCJkZWZhdWx0XCJdO1xuICAgIHRlbXBsYXRlLmJpbmQoXCJbYXR0cl1cIiwgX2JpbmRpbmdBdHRyMltcImRlZmF1bHRcIl0pO1xuICAgIHRlbXBsYXRlLmJpbmQoXCJbbmFtZV1bdHlwZT1cXFwiY2hlY2tib3hcXFwiXVwiLCBfYmluZGluZ0NoZWNrZWQyW1wiZGVmYXVsdFwiXSk7XG4gICAgdGVtcGxhdGUuYmluZChcImNvbnRlbnQsIFtjb250ZW50XVwiLCBfYmluZGluZ0NvbnRlbnQyW1wiZGVmYXVsdFwiXSk7XG4gICAgdGVtcGxhdGUuYmluZChcIltpZl1cIiwgX2JpbmRpbmdJZjJbXCJkZWZhdWx0XCJdKTtcbiAgICB0ZW1wbGF0ZS5iaW5kKFwiW2lmbm90XVwiLCBfYmluZGluZ0lmbm90MltcImRlZmF1bHRcIl0pO1xuICAgIHRlbXBsYXRlLmJpbmQoXCJ0ZXh0YXJlYVtuYW1lXSwgaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdW25hbWVdXCIsIF9iaW5kaW5nTmFtZTJbXCJkZWZhdWx0XCJdKTtcbiAgICB0ZW1wbGF0ZS5iaW5kKFwiW29uXVwiLCBfYmluZGluZ09uMltcImRlZmF1bHRcIl0pO1xuICAgIHRlbXBsYXRlLmJpbmQoXCJbc2gtY2xhc3NdXCIsIF9iaW5kaW5nQ2xhc3MyW1wiZGVmYXVsdFwiXSk7XG4gICAgdGVtcGxhdGUuYmluZChcIltzaC1zdHlsZV1cIiwgX2JpbmRpbmdTdHlsZTJbXCJkZWZhdWx0XCJdKTtcbiAgICB0ZW1wbGF0ZS5iaW5kKFwiW3RleHRdXCIsIF9iaW5kaW5nVGV4dDJbXCJkZWZhdWx0XCJdKTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICB2YXIgc2hhZGUgPSBjcmVhdGUoKTtcbiAgc2hhZGUuY3JlYXRlID0gY3JlYXRlO1xuICBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IHdpbmRvdy5zaGFkZSA9IHNoYWRlO1xuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn0pLmNhbGwodGhpcyk7Il19