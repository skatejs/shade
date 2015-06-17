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
    var attrName = parts[0];
    var propName = parts[1] || attrName;

    function toggle (value) {
      if (value) {
        classList(target).add(attrName);
      } else {
        classList(target).remove(attrName);
      }
    }

    toggle(el[propName]);
    el.addEventListener('skate.property', function (e) {
      if (propName !== e.detail.name) { return; }
      toggle(e.detail.newValue);
    });
  });
}
