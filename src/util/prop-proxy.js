import apiListen from '../api/listen';
import eventNotify from '../event/notify';
import utilParseArgs from './parse-args';

var getDescriptor = Object.getOwnPropertyDescriptor;

function resolveDescriptor (el, name) {
  return getDescriptor(el, name);
}

export default function (el, name) {
  var descriptor = resolveDescriptor(el, name);
  var links = [];
  var value = el.getAttribute(name);

  if (descriptor && !descriptor.configurable) {
    return;
  }

  if (descriptor && descriptor.get) {
    links = utilParseArgs(descriptor.get);
    links.forEach(function (link) {
      apiListen(el, link, eventNotify.bind(null, el, name));
    });
  }

  return Object.defineProperty(el, name, {
    configurable: true,
    get: function () {
      var that = this;
      if (descriptor && descriptor.get) {
        return descriptor.get.apply(this, links.map(function (link) {
          return that[link];
        }));
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

      eventNotify(this, name);
    }
  });
}
