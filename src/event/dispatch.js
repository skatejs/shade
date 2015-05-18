import event from './event';

export default function (element, name, opts) {
  return element.dispatchEvent(event(name, opts));
}
