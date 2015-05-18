import apiNotify from '../api/notify';

export default function (el, name) {
  var descriptor = Object.getOwnPropertyDescriptor(el.constructor.prototype, name);
  var value;

  if (descriptor && !descriptor.configurable) {
    return;
  }

  return Object.defineProperty(el, name, {
    configurable: true,
    get: function () {
      if (descriptor && descriptor.get) {
        return descriptor.get.call(this);
      } else {
        return value;
      }
    },
    set: function (newValue) {
      if (descriptor && descriptor.set) {
        descriptor.set.call(this, newValue);
      } else {
        value = newValue;
      }

      apiNotify(name)(this);
    }
  });
}
