import findNodesBetween from '../util/find-nodes-between';
import fragmentFromAnything from '../util/fragment-from-anything';

export default function (content) {
  return {
    get all () {
      return findNodesBetween(content.__startNode, content.__stopNode);
    },

    get length () {
      return this.all.length;
    },

    append: function (node) {
      var reference = content.__stopNode;
      reference.parentNode.insertBefore(fragmentFromAnything(node), reference);
      return this;
    },

    at: function (index) {
      return this.all[index];
    },

    clear: function () {
      this.all.forEach(function (item) {
        item.parentNode.removeChild(item);
      });
      return this;
    },

    content: function (content) {
      return this.clear().append(content);
    },

    index: function (node) {
      return this.all.indexOf(node);
    },

    insert: function (node, at) {
      var that = this;
      var reference = this.at(at) || content.__stopNode;
      reference.parentNode.insertBefore(fragmentFromAnything(node), reference);
      return this;
    },

    prepend: function (node) {
      var reference = this.at(0) || content.__stopNode;
      reference.parentNode.insertBefore(fragmentFromAnything(node), reference);
      return this;
    },

    remove: function (node) {
      node = fragmentFromAnything(node, this.all);
      var parent = node.parentNode;
      parent && parent.removeChild(node);
      return this;
    }
  };
}
