export default function (el, target) {
  target.getAttribute('attr').split(' ').forEach(function (part) {
    var parts = part.split(':');
    var attrName = parts[0];
    var propName = parts[1] || attrName;
    var set = val => val ? target.setAttribute(attrName, val) : target.removeAttribute(attrName);

    set(el[propName]);
    el.addEventListener('skate.property', function (e) {
      if (propName !== e.detail.name) { return; }
      set(e.detail.newValue);
    });
  });
}
