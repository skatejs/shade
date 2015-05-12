import collection from '../model/collection';
import findNodesBetween from '../util/find-nodes-between';
import fragmentFromCollection from '../util/fragment-from-collection';
import fragmentFromString from '../util/fragment-from-string';

var Node = window.Node;
var NodeList = window.NodeList;

export default function (content) {
  return {
    get: function () {
      var nodes = collection(content);
      return content.hasAttribute('multiple') ?
        nodes :
        nodes.at(0) || null;
    },

    set: function (value) {
      var coll = collection(content);
      var multiple = content.hasAttribute('multiple');
      var selector = content.getAttribute('select');

      // Initial creation of document fragment so that we can filter.
      if (typeof value === 'string') {
        value = fragmentFromString(value);
      } else if (typeof value.length === 'number') {
        value = fragmentFromCollection(value);
      } else {
        value = fragmentFromCollection([value]);
      }

      // Filtering of fragment nodes.
      if (multiple) {
        value = selector ? value.querySelectorAll(selector) : value.childNodes;
      } else {
        value = selector ? value.querySelector(selector) : value.childNodes[0];
      }

      // Creation of a new fragment that can be inserted.
      if (value instanceof NodeList) {
        value = fragmentFromCollection(value);
      } else if (value instanceof Node) {
        value = fragmentFromCollection([value]);
      } else {
        value = fragmentFromString(content.innerHTML);
      }

      // Value should default to the default content.
      if (!value.childNodes.length) {
        value = content.innerHTML;
      }

      coll.content(value);
    }
  };
}
