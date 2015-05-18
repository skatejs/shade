import apiListen from '../api/listen';
import apiNotify from '../api/notify';

export default function (el, target) {
  var src = target.getAttribute('src');
  var dests = target.getAttribute('dest').split(' ');

  apiListen(el, src, function () {
    dests.forEach(function (dest) {
      apiNotify(dest)(el);
    });
  });
}
