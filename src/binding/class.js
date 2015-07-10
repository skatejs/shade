import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';

function classList (el) {
  return el.classList || (function () {
    function classNames () {
      return el.className.split(' ');
    }

    return {
      add: function (className) {
        if (classNames().indexOf(className) === -1) {
          el.className = el.className ? ' ' + className : className;
        }
      },
      remove: function (className) {
        var names = classNames();
        var index = names.indexOf(className);

        if (index > -1) {
          names.splice(index, 1);
          el.className = names.join(' ');
        }
      }
    };
  }());
}

export default function (el, target) {
  target.getAttribute('sh-class').split(' ').forEach(function (part) {
    var parts = part.split(':');
    var propName = parts[0];
    var className = parts[1];

    function toggle (value) {
      if (value) {
        classList(target).add(className || value);
      } else {
        classList(target).remove(className);
      }
    }

    toggle(el[propName]);
    utilPropProxy(el, propName);
    apiListen(el, propName, function (e) {
      toggle(e.detail.value);
    });
  });
}
