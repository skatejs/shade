import bindings from './bindings';
import find from '../util/find';

export default function (selector, fn) {
  bindings.push(function (el, initialContent) {
    find(el, selector).forEach(function (target) {
      fn(el, target, initialContent);
    });
  });

  return this;
}
