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
  
    if (Array.isArray(nodeList)) {
      var nodeListLength = nodeList.length;
      for (var a = 0; a < nodeListLength; a++) {
        frag.appendChild(nodeList[a]);
      }
    } else {
      while (nodeList && nodeList.length) {
        frag.appendChild(nodeList[0]);
      }
    }
  
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
  
  var NodeList = window.NodeList;
  
  function fragmentFromAnything(item, search) {
    if (search && typeof item === 'number') {
      return _fragmentFromNode2['default'](search[item]);
    }
  
    if (!item) {
      return document.createDocumentFragment();
    }
  
    if (typeof item === 'string') {
      return _fragmentFromString2['default'](item);
    }
  
    if (item instanceof NodeList) {
      return _fragmentFromCollection2['default'](item);
    }
  
    if (typeof item.length === 'number') {
      return [].reduce.call(item, function (prev, curr) {
        prev.appendChild(fragmentFromAnything(curr, search));
        return prev;
      }, document.createDocumentFragment());
    }
  
    return item;
  }
  
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
  
  var _utilFragmentFromString = __75288c9eae43be4f69a605d574814320;
  
  var _utilFragmentFromString2 = _interopRequireDefault(_utilFragmentFromString);
  
  var _get = __44fc0bb6e1d23cb1b0a7c1a409626af2;
  
  var _get2 = _interopRequireDefault(_get);
  
  exports['default'] = function (el, frag) {
    _get2['default'](el).forEach(function (content) {
      var name = content.getAttribute('name');
      var multiple = content.hasAttribute('multiple');
      var selector = content.getAttribute('selector');
  
      if (selector) {
        el[name] = multiple ? frag.querySelectorAll(selector) : frag.querySelector(selector);
      } else {
        el[name] = frag;
      }
    });
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

// src/model/collection.js
__3e91116445359d0611b4191935b2268f = (function () {
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
  
  exports['default'] = function (content) {
    return Object.defineProperties({
  
      append: function append(node) {
        var reference = content.__stopNode;
        reference.parentNode.insertBefore(_utilFragmentFromAnything2['default'](node), reference);
        return this;
      },
  
      at: function at(index) {
        return this.all[index];
      },
  
      clear: function clear() {
        this.all.forEach(function (item) {
          item.parentNode.removeChild(item);
        });
        return this;
      },
  
      content: function content(_content) {
        return this.clear().append(_content);
      },
  
      index: function index(node) {
        return this.all.indexOf(node);
      },
  
      insert: function insert(node, at) {
        var that = this;
        var reference = this.at(at) || content.__stopNode;
        reference.parentNode.insertBefore(_utilFragmentFromAnything2['default'](node), reference);
        return this;
      },
  
      prepend: function prepend(node) {
        var reference = this.at(0) || content.__stopNode;
        reference.parentNode.insertBefore(_utilFragmentFromAnything2['default'](node), reference);
        return this;
      },
  
      remove: function remove(node) {
        node = _utilFragmentFromAnything2['default'](node, this.all);
        var parent = node.parentNode;
        parent && parent.removeChild(node);
        return this;
      }
    }, {
      all: {
        get: function () {
          return _utilFindNodesBetween2['default'](content.__startNode, content.__stopNode);
        },
        configurable: true,
        enumerable: true
      },
      length: {
        get: function () {
          return this.all.length;
        },
        configurable: true,
        enumerable: true
      }
    });
  };
  
  module.exports = exports['default'];
  
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
  
  var _modelCollection = __3e91116445359d0611b4191935b2268f;
  
  var _modelCollection2 = _interopRequireDefault(_modelCollection);
  
  var _utilFindNodesBetween = __f80bd0af0b10c72626d8bdce00313b6e;
  
  var _utilFindNodesBetween2 = _interopRequireDefault(_utilFindNodesBetween);
  
  var _utilFragmentFromCollection = __30b400647c92b587f3d7e75db182c98e;
  
  var _utilFragmentFromCollection2 = _interopRequireDefault(_utilFragmentFromCollection);
  
  var _utilFragmentFromString = __75288c9eae43be4f69a605d574814320;
  
  var _utilFragmentFromString2 = _interopRequireDefault(_utilFragmentFromString);
  
  var Node = window.Node;
  var NodeList = window.NodeList;
  
  exports['default'] = function (content) {
    return {
      get: function get() {
        var nodes = _modelCollection2['default'](content);
        return content.hasAttribute('multiple') ? nodes : nodes.at(0) || null;
      },
  
      set: function set(value) {
        var coll = _modelCollection2['default'](content);
        var multiple = content.hasAttribute('multiple');
        var selector = content.getAttribute('select');
  
        // Initial creation of document fragment so that we can filter.
        if (typeof value === 'string') {
          value = _utilFragmentFromString2['default'](value);
        } else if (typeof value.length === 'number') {
          value = _utilFragmentFromCollection2['default'](value);
        } else {
          value = _utilFragmentFromCollection2['default']([value]);
        }
  
        // Filtering of fragment nodes.
        if (multiple) {
          value = selector ? value.querySelectorAll(selector) : value.childNodes;
        } else {
          value = selector ? value.querySelector(selector) : value.childNodes[0];
        }
  
        // Creation of a new fragment that can be inserted.
        if (value instanceof NodeList) {
          value = _utilFragmentFromCollection2['default'](value);
        } else if (value instanceof Node) {
          value = _utilFragmentFromCollection2['default']([value]);
        } else {
          value = _utilFragmentFromString2['default'](content.innerHTML);
        }
  
        _modelCollection2['default'](content).content(value);
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
  
  var _get = __44fc0bb6e1d23cb1b0a7c1a409626af2;
  
  var _get2 = _interopRequireDefault(_get);
  
  var _makeProperty = __eef66f402a853f9ffff7cd32379113bb;
  
  var _makeProperty2 = _interopRequireDefault(_makeProperty);
  
  var DEFAULT_PROPERTY = 'textContent';
  
  exports['default'] = function (el) {
    var contents = el.__contents = _get2['default'](el);
    contents.forEach(function (content) {
      var name = content.getAttribute('name') || DEFAULT_PROPERTY;
      var parentNode = content.parentNode;
      var startNode = document.createComment('');
      var stopNode = document.createComment('');
  
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
  
  var _utilFragmentFromAnything = __5a306df716eb2212ff834894672bc372;
  
  var _utilFragmentFromAnything2 = _interopRequireDefault(_utilFragmentFromAnything);
  
  var _contentSet = __c021ee864a8581926f21313c93a3e63f;
  
  var _contentSet2 = _interopRequireDefault(_contentSet);
  
  var _contentSetUp = __3452ee3f8362cb4649c9b5d621e63079;
  
  var _contentSetUp2 = _interopRequireDefault(_contentSetUp);
  
  exports['default'] = window.shade = function (tmp) {
    var tmpFrag = _utilFragmentFromAnything2['default'](tmp);
  
    return function (el) {
      var oldHtml = el.innerHTML;
      var oldFrag = _utilFragmentFromAnything2['default'](oldHtml);
  
      if (typeof el === 'string') {
        el = _utilFragmentFromAnything2['default'](el).children[0];
      }
  
      el.innerHTML = '';
      el.appendChild(tmpFrag);
      _contentSetUp2['default'](el);
      _contentSet2['default'](el, oldFrag);
  
      return el;
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);