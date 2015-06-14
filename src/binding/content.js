import { DEFAULT_CONTENT_NAME } from '../constants';
import fragmentFromCollection from '../util/fragment-from-collection';
import makeProperty from './content/make-property';
import trim from '../util/trim';
import wrap from './content/wrap';

export default function (el, target, initialContent) {
  var name = target.getAttribute('name') || DEFAULT_CONTENT_NAME;
  var parentNode = target.parentNode;
  var startNode = document.createComment('');
  var stopNode = document.createComment('');

  trim(target);

  // Cache data to refer to in the wrapper.
  target.__default = fragmentFromCollection(target.childNodes);
  target.__element = el;
  target.__initialised = false;
  target.__name = name;
  target.__startNode = startNode;
  target.__stopNode = stopNode;

  // Set up placeholders.
  if (target.tagName === 'CONTENT') {
    parentNode.insertBefore(startNode, target);
    parentNode.insertBefore(stopNode, target);
    parentNode.removeChild(target);
  } else {
    target.innerHTML = '';
    target.appendChild(startNode);
    target.appendChild(stopNode);
  }

  Object.defineProperty(el, name, makeProperty(target));

  // Initialise.
  wrap(target).html = initialContent;
}
