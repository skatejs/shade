export default function (el, target) {
  var name = target.getAttribute('text');
  target.textContent = el[name];
  el.addEventListener('skate.property', function (e) {
    if (name !== e.detail.name) { return; }
    target.textContent = e.detail.newValue;
  });
}
