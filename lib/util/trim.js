(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "module"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.unknown = mod.exports;
  }
})(this, function (exports, module) {
  "use strict";

  module.exports = function (elem) {
    for (var a = elem.childNodes.length - 1; a > -1; a--) {
      var child = elem.childNodes[a];
      if (child.nodeType === 3 && child.textContent.match(/^\s*$/)) {
        elem.removeChild(child);
      }
    }
  };
});