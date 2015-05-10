import fragmentFromCollection from './fragment-from-collection';

export default function (domString) {
  var specialMap = {
    caption: 'table',
    dd: 'dl',
    dt: 'dl',
    li: 'ul',
    tbody: 'table',
    td: 'tr',
    thead: 'table',
    tr: 'tbody'
  };

  var tag = domString.match(/\s*<([^\s>]+)/);
  var div = document.createElement(tag && specialMap[tag[1]] || 'div');

  div.innerHTML = domString;

  return fragmentFromCollection(div.childNodes);
}
