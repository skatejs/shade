import apiListen from '../api/listen';
import eventListen from '../event/listen';
import utilPropProxy from '../util/prop-proxy';

export default function (el, target) {
  var propName = target.getAttribute('name');
  utilPropProxy(el, propName);
  apiListen(el, propName, function (e) {
    target.value = e.detail.value || '';
  });
  eventListen(el, ['change', 'keyup'], () => el[propName] = target.value);
  el[propName] = target.value;
}
