import { DEFAULT_CONTENT_NAME } from '../constants';
import makeProperty from './content/make-property';
import wrap from './content/wrap';

export default function (el, target, initialContent) {
  var name = target.getAttribute('name') || DEFAULT_CONTENT_NAME;
  var parentNode = target.parentNode;
  var startNode = document.createComment('');
  var stopNode = document.createComment('');

  // Cache data to refer to in the wrapper.
  target.__default = target.innerHTML.trim();
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
