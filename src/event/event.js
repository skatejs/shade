var CustomEvent = window.CustomEvent;

export default function (name, opts) {
  opts = opts || {};

  if (opts.bubbles === undefined) {
    opts.bubbles = true;
  }

  return new CustomEvent(name, opts);
}
