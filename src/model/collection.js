import findNodesBetween from '../util/find-nodes-between';
import fragmentFromString from '../util/fragment-from-string';

function normalize (itemOrCollection) {
  if (!itemOrCollection) {
    return [];
  }

  if (typeof itemOrCollection === 'string') {
    itemOrCollection = fragmentFromString(itemOrCollection).childNodes[0];
  }

  if (typeof itemOrCollection.length === 'number') {
    return itemOrCollection;
  }

  return [itemOrCollection];
}

export default function (content) {
  return {
    get all () {
      return findNodesBetween(content.__startNode, content.__stopNode);
    },

    get length () {
      return this.all.length;
    },

    append: function (nodes) {
      normalize(nodes).forEach(function (node) {
        var reference = content.__stopNode;
        reference.parentNode.insertBefore(node, reference);
      });
      return this;
    },

    at: function (index) {
      return this.all[index];
    },

    clear: function () {
      return this.each(function (item) {
        item.parentNode.removeChild(item);
      });
    },

    content: function (content) {
      return this.clear().append(content);
    },

    each: function (fn) {
      this.all.forEach(fn);
      return this;
    },

    index: function (item) {
      return this.all.indexOf(item);
    },

    prepend: function (nodes) {
      normalize(nodes).forEach(function (node) {
        var reference = content.__startNode;
        reference.parentNode.insertBefore(node, reference);
      });
      return this;
    },

    remove: function (itemOrIndex) {
      if (typeof itemOrIndex === 'number') {
        itemOrIndex = [this.at(itemOrIndex)];
      }

      normalize(itemOrIndex).forEach(function (item) {
        item.parentNode.removeChild(item);
      });

      return this;
    }
  };
}
