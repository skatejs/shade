import wrap from './wrap';

export default function (content) {
  return {
    configurable: true,
    get: function () {
      var name = content.getAttribute('name');
      var nodes = wrap(content);

      if (name === 'textContent' || content.hasAttribute('text')) {
        return nodes.text;
      } else if (name === 'innerHTML' || content.hasAttribute('html')) {
        return nodes.html;
      }

      return content.hasAttribute('multiple') ?
        nodes :
        nodes.nodes[0] || null;
    },
    set: function (value) {
      var name = content.getAttribute('name');
      var text = content.hasAttribute('text');
      wrap(content)[name === 'textContent' || text ? 'text' : 'html'] = value;
    }
  };
}
