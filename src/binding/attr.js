import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';

export default function (el, target) {
  target.getAttribute('attr').split(' ').forEach(function (part) {
    var parts = part.split(':');
    var attrName = parts[0];
    var propName = parts[1] || attrName;
    var set = val => val ? target.setAttribute(attrName, val) : target.removeAttribute(attrName);

    utilPropProxy(el, propName);
    set(el[propName]);
    apiListen(el, propName, function (e) {
      set(e.detail.value);
    });
  });
}
