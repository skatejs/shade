import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';

export default function (el, target) {
  var name = target.getAttribute('text');

  utilPropProxy(el, name);

  apiListen(el, name, function (e) {
    target.textContent = e.detail.value;
  });

  target.textContent = el[name];
}
