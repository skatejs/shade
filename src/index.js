import apiBind from './api/bind';
import apiBindings from './api/bindings';
import apiListen from './api/listen';
import apiNotify from './api/notify';
import utilPropProxy from './util/prop-proxy';
import bindingChecked from './binding/checked';
import bindingContent from './binding/content';
import bindingLink from './binding/link';
import bindingName from './binding/name';
import bindingText from './binding/text';
import fragmentFromString from './util/fragment-from-string';

function shade (bindings = shade.bindings) {
  function define (tmpHtml = '') {
    tmpHtml = tmpHtml.toString().trim();
    return function (el) {
      var initialContent;

      if (typeof el === 'string') {
        el = fragmentFromString(el).children[0];
      }

      initialContent = fragmentFromString(el.innerHTML);
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
  define.prop = utilPropProxy;

  define.bind('input[name][type="checkbox"]', bindingChecked);
  define.bind('content, [data-content]', bindingContent);
  define.bind('link[rel="property"]', bindingLink);
  define.bind('input[name][type="text"]', bindingName);
  define.bind('[text]', bindingText);

  return define;
}

export default window.shade = shade;
