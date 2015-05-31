import apiBind from './api/bind';
import apiBindings from './api/bindings';
import apiListen from './api/listen';
import apiNotify from './api/notify';
import bindingAttr from './binding/attr';
import bindingChecked from './binding/checked';
import bindingContent from './binding/content';
import bindingIf from './binding/if';
import bindingName from './binding/name';
import bindingText from './binding/text';
import fragmentFromCollection from './util/fragment-from-collection';
import fragmentFromString from './util/fragment-from-string';

function create () {
  function define (tmpHtml = '') {
    tmpHtml = tmpHtml.toString().trim();
    return function (el) {
      var initialContent;

      if (typeof el === 'string') {
        el = fragmentFromString(el).children[0];
      }

      initialContent = fragmentFromCollection(el.childNodes);
      el.innerHTML = tmpHtml;

      apiBindings.forEach(function (binding) {
        binding(el, initialContent);
      });

      return el;
    };
  }

  define.bind = apiBind;
  define.bindings = apiBindings;
  define.listen = apiListen;
  define.notify = apiNotify;

  define.bind('[attr]', bindingAttr);
  define.bind('input[name][type="checkbox"]', bindingChecked);
  define.bind('content, [content]', bindingContent);
  define.bind('[if]', bindingIf);
  define.bind('input[name][type="text"]', bindingName);
  define.bind('[text]', bindingText);

  return define;
}

var shade = create();
shade.create = create;
export default window.shade = shade;
