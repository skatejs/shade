import getContent from './get';
import wrap from './wrap';

export default function (el, html) {
  getContent(el).forEach(function (content) {
    wrap(content).html = html;
  });
}
