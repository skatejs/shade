var regexArgComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var regexArgNames = /([^\s,]+)/g;

export default function (func) {
  var fnStr = func
    .toString()
    .replace(regexArgComments, '');

  var result = fnStr
    .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    .match(regexArgNames);

  if (result === null) {
    result = [];
  }

  return result;
}
