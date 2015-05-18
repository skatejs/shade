import { PROPERTY_EVENT_NAME } from '../constants';

export default function (el, name, fn) {
  if (arguments.length === 2) {
    fn = name;
    name = undefined;
  }

  if (name) {
    el.addEventListener(`${PROPERTY_EVENT_NAME}.${name}`, fn);
  } else {
    el.addEventListener(PROPERTY_EVENT_NAME, fn);
  }
}
