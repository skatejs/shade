export default function (nodeList) {
  var frag = document.createDocumentFragment();

  if (Array.isArray(nodeList)) {
    let nodeListLength = nodeList.length;
    for (let a = 0; a < nodeListLength; a++) {
      frag.appendChild(nodeList[a]);
    }
  } else {
    while (nodeList && nodeList.length) {
      frag.appendChild(nodeList[0]);
    }
  }

  return frag;
}
