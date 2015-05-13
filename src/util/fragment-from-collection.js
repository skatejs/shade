export default function (nodeList) {
  var frag = document.createDocumentFragment();

  [].slice.call(nodeList).forEach(function (node) {
    frag.appendChild(node);
  });

  return frag;
}
