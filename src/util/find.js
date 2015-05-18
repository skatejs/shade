export default function (el, selector) {
  return [].slice.call(el.querySelectorAll(selector));
}
