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
  
  exports['default'] = function (el, html) {
    var frag = _utilFragmentFromString2['default'](html);
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
  
  var _utilFragmentFromString = __75288c9eae43be4f69a605d574814320;
  
  var _utilFragmentFromString2 = _interopRequireDefault(_utilFragmentFromString);
  
  function normalize(itemOrCollection) {
    if (!itemOrCollection) {
      return [];
    }
  
    if (typeof itemOrCollection === 'string') {
      itemOrCollection = _utilFragmentFromString2['default'](itemOrCollection).childNodes[0];
    }
  
    if (typeof itemOrCollection.length === 'number') {
      return itemOrCollection;
    }
  
    return [itemOrCollection];
  }
  
  exports['default'] = function (content) {
    return Object.defineProperties({
  
      append: function append(nodeNodesOrHtml) {
        normalize(nodeNodesOrHtml).forEach(function (node) {
          var reference = content.__stopNode;
          reference.parentNode.insertBefore(node, reference);
        });
        return this;
      },
  
      at: function at(index) {
        return this.all[index];
      },
  
      clear: function clear() {
        return this.each(function (item) {
          item.parentNode.removeChild(item);
        });
      },
  
      content: function content(_content) {
        return this.clear().append(_content);
      },
  
      each: function each(fn) {
        this.all.forEach(fn);
        return this;
      },
  
      index: function index(item) {
        return this.all.indexOf(item);
      },
  
      insert: function insert(nodeNodesOrHtml, at) {
        var that = this;
        normalize(nodeNodesOrHtml).forEach(function (node, index) {
          var reference = that.at(at + index);
          reference.parentNode.insertBefore(node, reference);
        });
        return this;
      },
  
      prepend: function prepend(nodeNodesOrHtml) {
        normalize(nodeNodesOrHtml).forEach(function (node) {
          var reference = content.__startNode;
          reference.parentNode.insertBefore(node, reference);
        });
        return this;
      },
  
      remove: function remove(nodeNodesOrIndicies) {
        var that = this;
        normalize(nodeNodesOrIndicies).forEach(function (item) {
          if (typeof item === 'number') {
            item = that.at(item);
          }
          item.parentNode.removeChild(item);
        });
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
  
  var _utilFragmentFromString = __75288c9eae43be4f69a605d574814320;
  
  var _utilFragmentFromString2 = _interopRequireDefault(_utilFragmentFromString);
  
  var _contentSet = __c021ee864a8581926f21313c93a3e63f;
  
  var _contentSet2 = _interopRequireDefault(_contentSet);
  
  var _contentSetUp = __3452ee3f8362cb4649c9b5d621e63079;
  
  var _contentSetUp2 = _interopRequireDefault(_contentSetUp);
  
  exports['default'] = window.shade = function (templateString) {
    templateString = templateString && templateString.trim() || '';
  
    return function (el) {
      var originalHtml;
  
      if (typeof el === 'string') {
        el = _utilFragmentFromString2['default'](el).childNodes[0];
      }
  
      originalHtml = el.innerHTML;
      el.innerHTML = templateString;
  
      _contentSetUp2['default'](el);
      _contentSet2['default'](el, originalHtml);
  
      return el;
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);