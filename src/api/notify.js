import eventNotify from '../event/notify';

export default function (name) {
  return function (el) {
    eventNotify(el, name);
  };
}
