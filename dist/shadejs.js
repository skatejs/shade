// src/api/bindings.js
__7cd43f6452e9eab84438a4ad6025b3e3 = (function () {
  var module = {
    exports: {}
  };
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
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (el, selector) {
    return [].slice.call(el.querySelectorAll(selector));
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);

// src/api/bind.js
__ee71b6efe56580e3b0576e6146bf20af = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _bindings = __7cd43f6452e9eab84438a4ad6025b3e3;
  
  var _bindings2 = _interopRequireDefault(_bindings);
  
  var _utilFind = __e0d18491916c36edcd801fda020cbb64;
  
  var _utilFind2 = _interopRequireDefault(_utilFind);
  
  exports['default'] = function (selector, fn) {
    _bindings2['default'].push(function (el, initialContent) {
      _utilFind2['default'](el, selector).forEach(function (target) {
        fn(el, target, initialContent);
      });
    });
  
    return this;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/constants.js
__cb00d40c73a7150c328f8a7d3932a029 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var DEFAULT_CONTENT_NAME = 'textContent';
  exports.DEFAULT_CONTENT_NAME = DEFAULT_CONTENT_NAME;
  var PROPERTY_EVENT_NAME = 'shade.property';
  exports.PROPERTY_EVENT_NAME = PROPERTY_EVENT_NAME;
  
  return module.exports;
}).call(this);

// src/api/listen.js
__c5dd6f8f59a03e0df7bce873c1a6aef8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _constants = __cb00d40c73a7150c328f8a7d3932a029;
  
  exports['default'] = function (el, name, fn) {
    if (arguments.length === 2) {
      fn = name;
      name = undefined;
    }
  
    if (name) {
      el.addEventListener('' + _constants.PROPERTY_EVENT_NAME + '.' + name, fn);
    } else {
      el.addEventListener(_constants.PROPERTY_EVENT_NAME, fn);
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/event/event.js
__04e6a92dbc5b4950b19ebc85c5615cd3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var CustomEvent = window.CustomEvent;
  
  exports["default"] = function (name, opts) {
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
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _event = __04e6a92dbc5b4950b19ebc85c5615cd3;
  
  var _event2 = _interopRequireDefault(_event);
  
  exports['default'] = function (element, name, opts) {
    return element.dispatchEvent(_event2['default'](name, opts));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/event/notify.js
__9e17e38b814ce7a14057738b49b5d7ac = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _dispatch = __5ad1b0ebf0a4d70a2e8fa66fe6603e0a;
  
  var _dispatch2 = _interopRequireDefault(_dispatch);
  
  var _constants = __cb00d40c73a7150c328f8a7d3932a029;
  
  exports['default'] = function (el, name) {
    var opts = {
      bubbles: false,
      cancellable: false,
      detail: {
        name: name,
        value: el[name]
      }
    };
  
    _dispatch2['default'](el, _constants.PROPERTY_EVENT_NAME, opts);
  
    if (opts.detail.name) {
      _dispatch2['default'](el, '' + _constants.PROPERTY_EVENT_NAME + '.' + opts.detail.name, opts);
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/api/notify.js
__9fc7a49b416f05fbbc3c65c580d002a2 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _eventNotify = __9e17e38b814ce7a14057738b49b5d7ac;
  
  var _eventNotify2 = _interopRequireDefault(_eventNotify);
  
  exports['default'] = function (name) {
    return function (el) {
      _eventNotify2['default'](el, name);
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/util/parse-args.js
__8f8edeaa6f5d357c5d853d81d6c6186a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var regexArgComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var regexArgNames = /([^\s,]+)/g;
  
  exports['default'] = function (func) {
    var fnStr = func.toString().replace(regexArgComments, '');
  
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(regexArgNames);
  
    if (result === null) {
      result = [];
    }
  
    return result;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/util/prop-proxy.js
__0126d3be88e859a7360a53615c8c95d9 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  
  var _apiListen2 = _interopRequireDefault(_apiListen);
  
  var _eventNotify = __9e17e38b814ce7a14057738b49b5d7ac;
  
  var _eventNotify2 = _interopRequireDefault(_eventNotify);
  
  var _parseArgs = __8f8edeaa6f5d357c5d853d81d6c6186a;
  
  var _parseArgs2 = _interopRequireDefault(_parseArgs);
  
  exports['default'] = function (el, name) {
    var descriptor = Object.getOwnPropertyDescriptor(el.constructor.prototype, name);
    var links = [];
    var value = el.getAttribute(name);
  
    if (descriptor && !descriptor.configurable) {
      return;
    }
  
    if (descriptor && descriptor.get) {
      links = _parseArgs2['default'](descriptor.get);
      links.forEach(function (link) {
        _apiListen2['default'](el, link, _eventNotify2['default'].bind(null, el, name));
      });
    }
  
    return Object.defineProperty(el, name, {
      configurable: true,
      get: function get() {
        var that = this;
        if (descriptor && descriptor.get) {
          return descriptor.get.apply(this, links.map(function (link) {
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
  
        _eventNotify2['default'](this, name);
      }
    });
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/event/listen.js
__6ec2aa33e9ae4e76d44cc9de43847b64 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (el, names, callback) {
    names = Array.isArray(names) ? names : [names];
    names.forEach(function (name) {
      el.addEventListener(name, callback);
    });
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);

// src/binding/checked.js
__4771c5f22e51fe701a9946317a626d3b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  
  var _apiListen2 = _interopRequireDefault(_apiListen);
  
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);
  
  var _eventListen = __6ec2aa33e9ae4e76d44cc9de43847b64;
  
  var _eventListen2 = _interopRequireDefault(_eventListen);
  
  exports['default'] = function (el, target) {
    var name = target.getAttribute('name');
  
    _utilPropProxy2['default'](el, name);
  
    _apiListen2['default'](el, name, function () {
      target.checked = !!el.checked;
    });
  
    _eventListen2['default'](target, 'change', function () {
      el[name] = target.checked;
    });
  
    el[name] = target.checked;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/util/find-nodes-between.js
__f80bd0af0b10c72626d8bdce00313b6e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (startNode, stopNode) {
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

// src/util/fragment-from-collection.js
__30b400647c92b587f3d7e75db182c98e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (nodeList) {
    var frag = document.createDocumentFragment();
  
    [].slice.call(nodeList).forEach(function (node) {
      frag.appendChild(node);
    });
  
    return frag;
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);

// src/util/fragment-from-node.js
__dc8ac56fe453d355e4f05d4b7918bf1e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (node) {
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
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fragmentFromCollection = __30b400647c92b587f3d7e75db182c98e;
  
  var _fragmentFromCollection2 = _interopRequireDefault(_fragmentFromCollection);
  
  var specialMap = {
    caption: 'table',
    dd: 'dl',
    dt: 'dl',
    li: 'ul',
    tbody: 'table',
    td: 'tr',
    thead: 'table',
    tr: 'tbody'
  };
  
  function matchTag(dom) {
    var tag = dom.match(/\s*<([^\s>]+)/);
    return tag && tag[1] || 'div';
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
  
  exports['default'] = function (dom) {
    var par = resolveCorrectDomParent(dom);
    par.innerHTML = dom;
    return _fragmentFromCollection2['default'](par.childNodes);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/util/fragment-from-anything.js
__5a306df716eb2212ff834894672bc372 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = fragmentFromAnything;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
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
  
    if (typeof item === 'string') {
      return _fragmentFromString2['default'](item);
    }
  
    if (item instanceof DocumentFragment) {
      return item;
    }
  
    if (item instanceof Node) {
      return _fragmentFromNode2['default'](item);
    }
  
    if (item instanceof NodeList) {
      return _fragmentFromCollection2['default'](item);
    }
  
    if (typeof item.length === 'number') {
      return [].reduce.call(item, function (prev, curr) {
        prev.appendChild(fragmentFromAnything(curr));
        return prev;
      }, document.createDocumentFragment());
    }
  
    return item;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/content/wrap.js
__e3571fb8bc72b68f952ecdfea6c7ba29 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _eventNotify = __9e17e38b814ce7a14057738b49b5d7ac;
  
  var _eventNotify2 = _interopRequireDefault(_eventNotify);
  
  var _utilFindNodesBetween = __f80bd0af0b10c72626d8bdce00313b6e;
  
  var _utilFindNodesBetween2 = _interopRequireDefault(_utilFindNodesBetween);
  
  var _utilFragmentFromAnything = __5a306df716eb2212ff834894672bc372;
  
  var _utilFragmentFromAnything2 = _interopRequireDefault(_utilFragmentFromAnything);
  
  var _utilFragmentFromCollection = __30b400647c92b587f3d7e75db182c98e;
  
  var _utilFragmentFromCollection2 = _interopRequireDefault(_utilFragmentFromCollection);
  
  var _utilFragmentFromString = __75288c9eae43be4f69a605d574814320;
  
  var _utilFragmentFromString2 = _interopRequireDefault(_utilFragmentFromString);
  
  exports['default'] = function (content) {
    function addDefaultNodes() {
      if (!content.__initialised) {
        content.__initialised = true;
        var reference = content.__stopNode;
        reference.parentNode.insertBefore(_utilFragmentFromString2['default'](content.__default), reference);
      }
    }
  
    function getAllNodes() {
      return _utilFindNodesBetween2['default'](content.__startNode, content.__stopNode);
    }
  
    function removeDefaultNodes() {
      if (content.__initialised) {
        content.__initialised = false;
        getAllNodes().forEach(function (node) {
          node.parentNode.removeChild(node);
        });
      }
    }
  
    function notify() {
      _eventNotify2['default'](content.__element, content.__name);
    }
  
    return Object.defineProperties({
  
      accept: function accept(node, callback) {
        node = _utilFragmentFromAnything2['default'](node);
        var selector = content.getAttribute('select');
  
        if (selector) {
          node = _utilFragmentFromCollection2['default'](node.querySelectorAll(selector));
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
        return this.accept(node, function (node) {
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
        if (typeof query === 'object') {
          (function () {
            var oldQuery = query;
            query = function (item) {
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
        return this.accept(node, function (node) {
          reference.parentNode.insertBefore(node, reference);
          notify();
        });
      },
  
      map: function map(fn) {
        return this.nodes.map(fn);
      },
  
      prepend: function prepend(node) {
        var reference = this.nodes[0] || content.__stopNode;
        this.accept(node, function (node) {
          reference.parentNode.insertBefore(node, reference);
          notify();
        });
        return this;
      },
  
      reduce: function reduce(fn, initialValue) {
        return this.nodes.reduce(fn, initialValue);
      },
  
      remove: function remove(node) {
        if (typeof node === 'number') {
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
        this.nodes.forEach(function (node) {
          node.parentNode.removeChild(node);
          notify();
        });
        addDefaultNodes();
        return this;
      }
    }, {
      html: {
        get: function () {
          return this.nodes.reduce(function (prev, curr) {
            return prev + curr.outerHTML;
          }, '');
        },
        set: function (value) {
          this.removeAll().append(value);
        },
        configurable: true,
        enumerable: true
      },
      length: {
        get: function () {
          return this.nodes.length;
        },
        configurable: true,
        enumerable: true
      },
      nodes: {
        get: function () {
          return content.__initialised ? [] : getAllNodes();
        },
        configurable: true,
        enumerable: true
      },
      text: {
        get: function () {
          return this.nodes.reduce(function (prev, curr) {
            return prev + curr.textContent;
          }, '');
        },
        set: function (value) {
          this.removeAll().append(document.createTextNode(value));
        },
        configurable: true,
        enumerable: true
      }
    });
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/content/make-property.js
__3b41741c587b0717ffbe410dee595b40 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _wrap = __e3571fb8bc72b68f952ecdfea6c7ba29;
  
  var _wrap2 = _interopRequireDefault(_wrap);
  
  exports['default'] = function (content) {
    return {
      configurable: true,
      get: function get() {
        var name = content.__name;
        var nodes = _wrap2['default'](content);
  
        if (name === 'textContent') {
          return nodes.text;
        } else if (name === 'innerHTML') {
          return nodes.html;
        }
  
        return content.hasAttribute('multiple') ? nodes : nodes.nodes[0] || null;
      },
      set: function set(value) {
        _wrap2['default'](content).html = value;
      }
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/content.js
__af4e672e7be6cdbb17637f84ccfe1cf9 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _constants = __cb00d40c73a7150c328f8a7d3932a029;
  
  var _contentMakeProperty = __3b41741c587b0717ffbe410dee595b40;
  
  var _contentMakeProperty2 = _interopRequireDefault(_contentMakeProperty);
  
  var _contentWrap = __e3571fb8bc72b68f952ecdfea6c7ba29;
  
  var _contentWrap2 = _interopRequireDefault(_contentWrap);
  
  exports['default'] = function (el, target, initialContent) {
    var name = target.getAttribute('name') || _constants.DEFAULT_CONTENT_NAME;
    var parentNode = target.parentNode;
    var startNode = document.createComment('');
    var stopNode = document.createComment('');
  
    // Cache data to refer to in the wrapper.
    target.__default = target.innerHTML.trim();
    target.__element = el;
    target.__initialised = false;
    target.__name = name;
    target.__startNode = startNode;
    target.__stopNode = stopNode;
  
    // Set up placeholders.
    if (target.tagName === 'CONTENT') {
      parentNode.insertBefore(startNode, target);
      parentNode.insertBefore(stopNode, target);
      parentNode.removeChild(target);
    } else {
      target.innerHTML = '';
      target.appendChild(startNode);
      target.appendChild(stopNode);
    }
  
    Object.defineProperty(el, name, _contentMakeProperty2['default'](target));
  
    // Initialise.
    _contentWrap2['default'](target).html = initialContent;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/if.js
__84f84240c34e77faaa9ac017033fc8f4 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  
  var _apiListen2 = _interopRequireDefault(_apiListen);
  
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);
  
  exports['default'] = function (el, target) {
    var name = target.getAttribute('name');
    var parent = target.parentNode;
    var placeholder = document.createComment('');
  
    _utilPropProxy2['default'](el, name);
    parent.insertBefore(placeholder, target);
    _apiListen2['default'](el, name, function () {
      if (el[name] && !target.parentNode) {
        parent.insertBefore(target, placeholder);
      } else if (target.parentNode) {
        parent.removeChild(target);
      }
    });
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/name.js
__8d354ccbec8214a9b6149f90c1d3600c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  
  var _apiListen2 = _interopRequireDefault(_apiListen);
  
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);
  
  var _eventListen = __6ec2aa33e9ae4e76d44cc9de43847b64;
  
  var _eventListen2 = _interopRequireDefault(_eventListen);
  
  exports['default'] = function (el, target) {
    var name = target.getAttribute('name');
  
    _utilPropProxy2['default'](el, name);
  
    _apiListen2['default'](el, name, function () {
      target.value = el[name];
    });
  
    _eventListen2['default'](el, ['change', 'keyup'], function () {
      el[name] = target.value;
    });
  
    el[name] = target.value;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/text.js
__6d77b901264b93f69dbd0ef3ea8503dc = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  
  var _apiListen2 = _interopRequireDefault(_apiListen);
  
  var _utilPropProxy = __0126d3be88e859a7360a53615c8c95d9;
  
  var _utilPropProxy2 = _interopRequireDefault(_utilPropProxy);
  
  exports['default'] = function (el, target) {
    var name = target.getAttribute('text');
  
    _utilPropProxy2['default'](el, name);
  
    _apiListen2['default'](el, name, function (e) {
      target.textContent = e.detail.value;
    });
  
    target.textContent = el[name];
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/index.js
__dff62dc5a802abe34646b4f484fc6f3f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./api/bind": __ee71b6efe56580e3b0576e6146bf20af,
    "./api/bindings": __7cd43f6452e9eab84438a4ad6025b3e3,
    "./api/listen": __c5dd6f8f59a03e0df7bce873c1a6aef8,
    "./api/notify": __9fc7a49b416f05fbbc3c65c580d002a2,
    "./binding/checked": __4771c5f22e51fe701a9946317a626d3b,
    "./binding/content": __af4e672e7be6cdbb17637f84ccfe1cf9,
    "./binding/if": __84f84240c34e77faaa9ac017033fc8f4,
    "./binding/name": __8d354ccbec8214a9b6149f90c1d3600c,
    "./binding/text": __6d77b901264b93f69dbd0ef3ea8503dc,
    "./util/fragment-from-string": __75288c9eae43be4f69a605d574814320
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiBind = __ee71b6efe56580e3b0576e6146bf20af;
  
  var _apiBind2 = _interopRequireDefault(_apiBind);
  
  var _apiBindings = __7cd43f6452e9eab84438a4ad6025b3e3;
  
  var _apiBindings2 = _interopRequireDefault(_apiBindings);
  
  var _apiListen = __c5dd6f8f59a03e0df7bce873c1a6aef8;
  
  var _apiListen2 = _interopRequireDefault(_apiListen);
  
  var _apiNotify = __9fc7a49b416f05fbbc3c65c580d002a2;
  
  var _apiNotify2 = _interopRequireDefault(_apiNotify);
  
  var _bindingChecked = __4771c5f22e51fe701a9946317a626d3b;
  
  var _bindingChecked2 = _interopRequireDefault(_bindingChecked);
  
  var _bindingContent = __af4e672e7be6cdbb17637f84ccfe1cf9;
  
  var _bindingContent2 = _interopRequireDefault(_bindingContent);
  
  var _bindingIf = __84f84240c34e77faaa9ac017033fc8f4;
  
  var _bindingIf2 = _interopRequireDefault(_bindingIf);
  
  var _bindingName = __8d354ccbec8214a9b6149f90c1d3600c;
  
  var _bindingName2 = _interopRequireDefault(_bindingName);
  
  var _bindingText = __6d77b901264b93f69dbd0ef3ea8503dc;
  
  var _bindingText2 = _interopRequireDefault(_bindingText);
  
  var _utilFragmentFromString = __75288c9eae43be4f69a605d574814320;
  
  var _utilFragmentFromString2 = _interopRequireDefault(_utilFragmentFromString);
  
  function shade() {
    function define() {
      var tmpHtml = arguments[0] === undefined ? '' : arguments[0];
  
      tmpHtml = tmpHtml.toString().trim();
      return function (el) {
        var initialContent;
  
        if (typeof el === 'string') {
          el = _utilFragmentFromString2['default'](el).children[0];
        }
  
        initialContent = _utilFragmentFromString2['default'](el.innerHTML);
        el.innerHTML = tmpHtml;
  
        _apiBindings2['default'].forEach(function (binding) {
          binding(el, initialContent);
        });
  
        return el;
      };
    }
  
    define.bind = _apiBind2['default'];
    define.bindings = _apiBindings2['default'];
    define.listen = _apiListen2['default'];
    define.notify = _apiNotify2['default'];
  
    define.bind('input[name][type="checkbox"]', _bindingChecked2['default']);
    define.bind('content, [content]', _bindingContent2['default']);
    define.bind('[if]', _bindingIf2['default']);
    define.bind('input[name][type="text"]', _bindingName2['default']);
    define.bind('[text]', _bindingText2['default']);
  
    return define;
  }
  
  exports['default'] = window.shade = shade;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);