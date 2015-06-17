import apiBind from './api/bind';
import apiBindings from './api/bindings';
import apiListen from './api/listen';
import apiNotify from './api/notify';
import bindingAttr from './binding/attr';
import bindingChecked from './binding/checked';
import bindingClass from './binding/class';
import bindingContent from './binding/content';
import bindingIf from './binding/if';
import bindingIfnot from './binding/ifnot';
import bindingName from './binding/name';
import bindingOn from './binding/on';
import bindingStyle from './binding/style';
import bindingText from './binding/text';
import fragmentFromCollection from './util/fragment-from-collection';
import fragmentFromString from './util/fragment-from-string';

var DocumentFragment = window.DocumentFragment;

function create () {
  function define (tmpHtml = '') {
    tmpHtml = tmpHtml.toString().trim();
    return function (elem) {
      var initialContent;
      elem = elem || this;
      elem = typeof elem === 'string' ? fragmentFromString(elem) : elem;
      elem = elem instanceof DocumentFragment ? elem.children.item(0) : elem;
      initialContent = fragmentFromCollection(elem.childNodes);
      elem.innerHTML = tmpHtml;
      apiBindings.forEach(binding => binding(elem, initialContent));
      return elem;
    };
  }

  define.bind = apiBind;
  define.bindings = apiBindings;
  define.listen = apiListen;
  define.notify = apiNotify;

  define.bind('[attr]', bindingAttr);
  define.bind('[name][type="checkbox"]', bindingChecked);
  define.bind('content, [content]', bindingContent);
  define.bind('[if]', bindingIf);
  define.bind('[ifnot]', bindingIfnot);
  define.bind('textarea[name], input[type="text"][name]', bindingName);
  define.bind('[on]', bindingOn);
  define.bind('[sh-class]', bindingClass);
  define.bind('[sh-style]', bindingStyle);
  define.bind('[text]', bindingText);

  return define;
}

var shade = create();
shade.create = create;
export default window.shade = shade;
