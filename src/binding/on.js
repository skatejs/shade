import eventDispatch from '../event/dispatch';

export default function (el, target) {
  target.getAttribute('on').split(' ').forEach(function (pair) {
    var handlerFunc;
    var [ name, handlerName ] = pair.split(':');
    handlerName = handlerName || 'handle' + (name[0].toUpperCase() + name.substring(1));
    handlerFunc = (el[handlerName] || function (e) {
      eventDispatch(this, handlerName, {
        bubbles: true,
        cancelable: true
      });
      e.preventDefault();
    }).bind(el);
    target.addEventListener(name, function (e) {
      e.delegateTarget = target;
      handlerFunc(e);
    });
  });
}
