import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';

export default function (el, target) {
  var propName = target.getAttribute('if');
  var parent = target.parentNode;
  var placeholder = document.createComment('');

  parent.insertBefore(placeholder, target);
  utilPropProxy(el, propName);
  apiListen(el, propName, function (e) {
    if (e.detail.value && !target.parentNode) {
      parent.insertBefore(target, placeholder);
    } else if (!e.detail.value && target.parentNode) {
      target.remove();
    }
  });
}
