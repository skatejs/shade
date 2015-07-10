import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';
import eventListen from '../event/listen';

export default function (el, target) {
  var propName = target.getAttribute('name');
  utilPropProxy(el, propName);
  apiListen(el, propName, () => target.checked = !!el.checked);
  eventListen(target, 'change', () => el[propName] = target.checked);
  el[propName] = target.checked;
}
