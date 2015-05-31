import apiListen from '../api/listen';
import utilPropProxy from '../util/prop-proxy';

export default function (el, target) {
  var name = target.getAttribute('if');
  var parent = target.parentNode;
  var placeholder = document.createComment('');

  utilPropProxy(el, name);
  parent.insertBefore(placeholder, target);
  apiListen(el, name, function () {
    if (el[name] && !target.parentNode) {
      parent.insertBefore(target, placeholder);
    } else if (target.parentNode) {
      parent.removeChild(target);
    }
  });
}
