import dispatch from '../event/dispatch';
import { PROPERTY_EVENT_NAME } from '../constants';

export default function (name) {
  return function (el) {
    var opts = {
      bubbles: false,
      cancellable: false,
      detail: {
        name: name,
        value: el[name]
      }
    };

    dispatch(el, PROPERTY_EVENT_NAME, opts);

    if (opts.detail.name) {
      dispatch(el, `${PROPERTY_EVENT_NAME}.${opts.detail.name}`, opts);
    }
  };
}
