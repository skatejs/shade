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

  var CustomEvent = window.CustomEvent;

  module.exports = function (name, opts) {
    opts = opts || {};

    if (opts.bubbles === undefined) {
      opts.bubbles = true;
    }

    return new CustomEvent(name, opts);
  };
});