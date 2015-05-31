export default function (elem) {
  for (let a = elem.childNodes.length - 1; a > -1; a--) {
    var child = elem.childNodes[a];
    if (child.nodeType === 3 && child.textContent.match(/^\s*$/)) {
      elem.removeChild(child);
    }
  }
}
