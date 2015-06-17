function pxIfNumber (val) {
  return typeof val === 'number' ? val + 'px' : val;
}

export default function (el, target) {
  target.getAttribute('sh-style').split(' ').forEach(function (part) {
    var parts = part.split(':');
    var attrName = parts[0];
    var propName = parts[1] || attrName;

    target.style[attrName] = pxIfNumber(el[propName]);
    el.addEventListener('skate.property', function (e) {
      if (propName !== e.name) { return; }
      target.style[attrName] = pxIfNumber(e.detail.newValue);
    });
  });
}
