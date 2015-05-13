import { DEFAULT_CONTENT_NAME } from '../constants';
import getContent from './get';
import makeProperty from './make-property';

export default function (el) {
  var contents = el.__contents = getContent(el);
  contents.forEach(function (content) {
    var name = content.getAttribute('name') || DEFAULT_CONTENT_NAME;
    var parentNode = content.parentNode;
    var startNode = document.createComment('');
    var stopNode = document.createComment('');

    content.__default = content.innerHTML.trim();
    content.__initialised = false;
    content.__name = name;
    content.__startNode = startNode;
    content.__stopNode = stopNode;
    parentNode.insertBefore(startNode, content);
    parentNode.insertBefore(stopNode, content);
    parentNode.removeChild(content);

    Object.defineProperty(el, name, makeProperty(content));
  });
}
