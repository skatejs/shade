import fragmentFromString from './util/fragment-from-string';
import setContent from './content/set';
import setUpContent from './content/set-up';

export default window.shade = function (tmpHtml = '') {
  tmpHtml = tmpHtml.toString().trim();
  return function (el) {
    var oldHtml;

    if (typeof el === 'string') {
      el = fragmentFromString(el).children[0];
    }

    oldHtml = el.innerHTML;
    el.innerHTML = tmpHtml;
    setUpContent(el);
    setContent(el, oldHtml);

    return el;
  };
};
