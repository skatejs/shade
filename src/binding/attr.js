import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';

export default function (el, target) {
  target.getAttribute('attr').split(' ').forEach(function (part) {
    var parts = part.split(':');
    var attrName = parts[0];
    var propName = parts[1] || attrName;
    utilPropProxy(el, propName);
    apiListen(el, propName, () => target.setAttribute(attrName, el[propName]));
  });
}
