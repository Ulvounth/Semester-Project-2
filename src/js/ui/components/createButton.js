import { createElement } from './createElement.js';

export function createButton(text, className, onClick) {
  return createElement('button', { class: className, onclick: onClick }, text);
}
