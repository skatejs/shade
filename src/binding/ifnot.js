export default function (el, target) {
  var name = target.getAttribute('if');
  var parent = target.parentNode;
  var placeholder = document.createComment('');

  parent.insertBefore(placeholder, target);
  el.addEventListener('skate.property', function (e) {
    if (name !== e.detail.name) {
      return;
    }

    if (e.detail.newValue && !target.parentNode) {
      target.remove();
    } else if (!e.detail.newValue && target.parentNode) {
      parent.insertBefore(target, placeholder);
    }
  });
}
