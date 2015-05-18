import fragmentFromCollection from './fragment-from-collection';

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

function matchTag (dom) {
  var tag = dom.match(/\s*<([^\s>]+)/);
  return tag && tag[1] || 'div';
}

function resolveCorrectDomParent (dom) {
  return resolveCorrectTagParents(matchTag(dom));
}

function resolveCorrectTagParents (tag) {
  var mapped;
  var parent = document.createElement(tag);

  while (mapped = specialMap[parent.tagName.toLowerCase()]) {
    let tempParent = document.createElement(mapped);
    tempParent.appendChild(parent);
    parent = tempParent;
  }

  return parent;
}

export default function (dom) {
  var par = resolveCorrectDomParent(dom);
  par.innerHTML = dom;
  return fragmentFromCollection(par.childNodes);
}
