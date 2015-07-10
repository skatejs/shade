import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';

function pxIfNumber (val) {
  return typeof val === 'number' ? val + 'px' : val;
}

export default function (el, target) {
  target.getAttribute('sh-style').split(' ').forEach(function (part) {
    var parts = part.split(':');
    var attrName = parts[0];
    var propName = parts[1] || attrName;

    target.style[attrName] = pxIfNumber(el[propName]);
    utilPropProxy(el, propName);
    apiListen(el, propName, function (e) {
      target.style[attrName] = pxIfNumber(e.detail.value);
    });
  });
}
