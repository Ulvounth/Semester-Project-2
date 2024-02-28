import { createElement } from './createElement.js';

export function createInput(type, placeholder, className) {
  return createElement('input', { type, placeholder, class: className });
}
