import eventDispatch from '../event/dispatch';

export default function (el, target) {
  target.getAttribute('on').split(' ').forEach(function (pair) {
    var handlerFunc;
    var [ propName, handlerName ] = pair.split(':');
    handlerName = handlerName || 'handle' + (propName[0].toUpperCase() + propName.substring(1));
    handlerFunc = (el[handlerName] || function (e) {
      eventDispatch(this, handlerName, {
        bubbles: true,
        cancelable: true
      });
      e.preventDefault();
    }).bind(el);
    target.addEventListener(propName, function (e) {
      e.delegateTarget = target;
      handlerFunc(e);
    });
  });
}
