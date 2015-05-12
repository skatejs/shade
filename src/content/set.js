import getContent from './get';

export default function (el, frag) {
  getContent(el).forEach(function (content) {
    var name = content.getAttribute('name');
    var multiple = content.hasAttribute('multiple');
    var selector = content.getAttribute('selector');

    if (selector) {
      el[name] = multiple ? frag.querySelectorAll(selector) : frag.querySelector(selector);
    } else {
      el[name] = frag;
    }
  });
}
