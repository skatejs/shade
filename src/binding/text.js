import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';

export default function (el, target) {
  var propName = target.getAttribute('text');
  target.textContent = el[propName];
  utilPropProxy(el, propName);
  apiListen(el, propName, function (e) {
    target.textContent = e.detail.value;
  });
}
