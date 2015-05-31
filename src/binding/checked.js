import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';
import eventListen from '../event/listen';

export default function (el, target) {
  var name = target.getAttribute('name');
  utilPropProxy(el, name);
  apiListen(el, name, () => target.checked = !!el.checked);
  eventListen(target, 'change', () => el[name] = target.checked);
  el[name] = target.checked;
}
