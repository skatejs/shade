export default function (el, names, callback) {
  names = Array.isArray(names) ? names : [names];
  names.forEach(function (name) {
    el.addEventListener(name, callback);
  });
}
