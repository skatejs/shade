import eventListen from '../event/listen';

export default function (el, target) {
  var name = target.getAttribute('name');
  el.addEventListener('skate.property', function (e) {
    if (name !== e.detail.name) { return; }
    target.value = e.detail.newValue || '';
  });
  eventListen(el, ['change', 'keyup'], () => el[name] = target.value);
  el[name] = target.value;
}
