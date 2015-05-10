export default function (el) {
  if (!el.__content) {
    el.__content = [].slice.call(el.querySelectorAll('content'));
  }

  return el.__content;
}
