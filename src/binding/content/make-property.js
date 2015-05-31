import wrap from './wrap';

export default function (content) {
  return {
    configurable: true,
    get: function () {
      var name = content.__name;
      var nodes = wrap(content);

      if (name === 'textContent') {
        return nodes.text;
      } else if (name === 'innerHTML') {
        return nodes.html;
      }

      return content.hasAttribute('multiple') ?
        nodes :
        nodes.nodes[0] || null;
    },
    set: function (value) {
      wrap(content)[content.__name === 'textContent' ? 'text' : 'html'] = value;
    }
  };
}
