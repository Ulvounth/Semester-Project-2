import { createElement } from './createElement.js';

export function createImage(src, alt, className) {
  return createElement('img', { src, alt, class: className });
}
