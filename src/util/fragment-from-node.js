export default function (node) {
  var frag = document.createDocumentFragment();
  if (node) {
    frag.appendChild(node);
  }
  return frag;
}
