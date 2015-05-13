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
  
  exports['default'] = function (domString) {
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
  
    var tag = domString.match(/\s*<([^\s>]+)/);
    var div = document.createElement(tag && specialMap[tag[1]] || 'div');
  
    div.innerHTML = domString;
  
    return _fragmentFromCollection2['default'](div.childNodes);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/content/get.js
__44fc0bb6e1d23cb1b0a7c1a409626af2 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (el) {
    if (!el.__content) {
      el.__content = [].slice.call(el.querySelectorAll('content'));
    }
  
    return el.__content;
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

// src/content/wrap.js
__9a66ad47243c159dcb0602c99dcb9cf1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilFindNodesBetween = __f80bd0af0b10c72626d8bdce00313b6e;
  
  var _utilFindNodesBetween2 = _interopRequireDefault(_utilFindNodesBetween);
  
  var _utilFragmentFromAnything = __5a306df716eb2212ff834894672bc372;
  
  var _utilFragmentFromAnything2 = _interopRequireDefault(_utilFragmentFromAnything);
  
  var _utilFragmentFromCollection = __30b400647c92b587f3d7e75db182c98e;
  
  var _utilFragmentFromCollection2 = _interopRequireDefault(_utilFragmentFromCollection);
  
  var _utilFragmentFromString = __75288c9eae43be4f69a605d574814320;
  
  var _utilFragmentFromString2 = _interopRequireDefault(_utilFragmentFromString);
  
  var Element = window.Element;
  var elProto = window.HTMLElement.prototype;
  var matches = elProto.matches || elProto.mozMatchesSelctor || elProto.msMatchesSelctor || elProto.oMatchesSelctor || elProto.webkitMatchesSelctor;
  
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
        });
      },
  
      contains: function contains(node) {
        return content.__startNode.parentNode === node.parentNode;
      },
  
      insert: function insert(node, at) {
        var reference = this.nodes[at] || content.__stopNode;
        return this.accept(node, function (node) {
          reference.parentNode.insertBefore(node, reference);
        });
      },
  
      prepend: function prepend(node) {
        var reference = this.nodes[0] || content.__stopNode;
        this.accept(node, function (node) {
          reference.parentNode.insertBefore(node, reference);
        });
        return this;
      },
  
      remove: function remove(node) {
        if (typeof node === 'number') {
          node = this.nodes[node];
        }
  
        if (this.contains(node)) {
          node.parentNode.removeChild(node);
        }
  
        addDefaultNodes();
  
        return this;
      },
  
      removeAll: function removeAll() {
        this.nodes.forEach(function (item) {
          item.parentNode.removeChild(item);
        });
        addDefaultNodes();
        return this;
      }
    }, {
      elements: {
        get: function () {
          return this.nodes.filter(function (node) {
            return node.nodeType === 1;
          });
        },
        configurable: true,
        enumerable: true
      },
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

// src/content/set.js
__c021ee864a8581926f21313c93a3e63f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _get = __44fc0bb6e1d23cb1b0a7c1a409626af2;
  
  var _get2 = _interopRequireDefault(_get);
  
  var _wrap = __9a66ad47243c159dcb0602c99dcb9cf1;
  
  var _wrap2 = _interopRequireDefault(_wrap);
  
  exports['default'] = function (el, html) {
    _get2['default'](el).forEach(function (content) {
      _wrap2['default'](content).html = html;
    });
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
  
  return module.exports;
}).call(this);

// src/content/make-property.js
__eef66f402a853f9ffff7cd32379113bb = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _wrap = __9a66ad47243c159dcb0602c99dcb9cf1;
  
  var _wrap2 = _interopRequireDefault(_wrap);
  
  exports['default'] = function (content) {
    return {
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

// src/content/set-up.js
__3452ee3f8362cb4649c9b5d621e63079 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _constants = __cb00d40c73a7150c328f8a7d3932a029;
  
  var _get = __44fc0bb6e1d23cb1b0a7c1a409626af2;
  
  var _get2 = _interopRequireDefault(_get);
  
  var _makeProperty = __eef66f402a853f9ffff7cd32379113bb;
  
  var _makeProperty2 = _interopRequireDefault(_makeProperty);
  
  exports['default'] = function (el) {
    var contents = el.__contents = _get2['default'](el);
    contents.forEach(function (content) {
      var name = content.getAttribute('name') || _constants.DEFAULT_CONTENT_NAME;
      var parentNode = content.parentNode;
      var startNode = document.createComment('');
      var stopNode = document.createComment('');
  
      content.__default = content.innerHTML.trim();
      content.__initialised = false;
      content.__name = name;
      content.__startNode = startNode;
      content.__stopNode = stopNode;
      parentNode.insertBefore(startNode, content);
      parentNode.insertBefore(stopNode, content);
      parentNode.removeChild(content);
  
      Object.defineProperty(el, name, _makeProperty2['default'](content));
    });
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
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilFragmentFromString = __75288c9eae43be4f69a605d574814320;
  
  var _utilFragmentFromString2 = _interopRequireDefault(_utilFragmentFromString);
  
  var _contentSet = __c021ee864a8581926f21313c93a3e63f;
  
  var _contentSet2 = _interopRequireDefault(_contentSet);
  
  var _contentSetUp = __3452ee3f8362cb4649c9b5d621e63079;
  
  var _contentSetUp2 = _interopRequireDefault(_contentSetUp);
  
  exports['default'] = window.shade = function () {
    var tmpHtml = arguments[0] === undefined ? '' : arguments[0];
  
    tmpHtml = tmpHtml.toString().trim();
    return function (el) {
      var oldHtml;
  
      if (typeof el === 'string') {
        el = _utilFragmentFromString2['default'](el).children[0];
      }
  
      oldHtml = el.innerHTML;
      el.innerHTML = tmpHtml;
      _contentSetUp2['default'](el);
      _contentSet2['default'](el, oldHtml);
  
      return el;
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);