import fragmentFromString from './util/fragment-from-string';
import setContent from './content/set';
import setUpContent from './content/set-up';

export default window.shade = function (templateString) {
  templateString = templateString && templateString.trim() || '';

  return function (el) {
    var originalHtml;

    if (typeof el === 'string') {
      el = fragmentFromString(el).childNodes[0];
    }

    originalHtml = el.innerHTML;
    el.innerHTML = templateString;

    setUpContent(el);
    setContent(el, originalHtml);

    return el;
  };
};
