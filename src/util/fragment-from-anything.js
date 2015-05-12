import fragmentFromCollection from './fragment-from-collection';
import fragmentFromNode from './fragment-from-node';
import fragmentFromString from './fragment-from-string';

var NodeList = window.NodeList;

export default function fragmentFromAnything (item, search) {
  if (search && typeof item === 'number') {
    return fragmentFromNode(search[item]);
  }

  if (!item) {
    return document.createDocumentFragment();
  }

  if (typeof item === 'string') {
    return fragmentFromString(item);
  }

  if (item instanceof NodeList) {
    return fragmentFromCollection(item);
  }

  if (typeof item.length === 'number') {
    return [].reduce.call(item, function (prev, curr) {
      prev.appendChild(fragmentFromAnything(curr, search));
      return prev;
    }, document.createDocumentFragment());
  }

  return item;
}
