import fragmentFromAnything from './util/fragment-from-anything';
import setContent from './content/set';
import setUpContent from './content/set-up';

export default window.shade = function (tmp) {
  var tmpFrag = fragmentFromAnything(tmp);

  return function (el) {
    var oldHtml = el.innerHTML;
    var oldFrag = fragmentFromAnything(oldHtml);

    el.innerHTML = '';
    el.appendChild(tmpFrag);
    setUpContent(el);
    setContent(el, oldFrag);

    return el;
  };
};
