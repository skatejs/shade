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
  function template (tmpHtml = '') {
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

  template.bind = apiBind;
  template.bindings = apiBindings;
  template.listen = apiListen;
  template.notify = apiNotify;

  template.bind('[attr]', bindingAttr);
  template.bind('[name][type="checkbox"]', bindingChecked);
  template.bind('content, [content]', bindingContent);
  template.bind('[if]', bindingIf);
  template.bind('[ifnot]', bindingIfnot);
  template.bind('textarea[name], input[type="text"][name]', bindingName);
  template.bind('[on]', bindingOn);
  template.bind('[sh-class]', bindingClass);
  template.bind('[sh-style]', bindingStyle);
  template.bind('[text]', bindingText);

  return template;
}

var shade = create();
shade.create = create;
export default window.shade = shade;
