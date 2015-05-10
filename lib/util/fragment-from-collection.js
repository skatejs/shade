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

  module.exports = function (nodeList) {
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
});