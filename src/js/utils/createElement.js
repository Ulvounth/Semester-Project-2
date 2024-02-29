/**
 * Utility function to create an HTML element with specified attributes and children.
 *
 * @param {string} tag - The HTML tag to create.
 * @param {Object} attributes - An object containing key-value pairs of attributes and properties to set on the element.
 * @param {...HTMLElement|string} children - Child elements or strings to append to the created element. Strings are converted to text nodes.
 * @returns {HTMLElement} The created HTML element, with the specified attributes/properties set, and any children appended.
 */
export function createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach((attr) => {
    if (attr in element) {
      // If it's a property of the element, set it directly
      element[attr] = attributes[attr];
    } else {
      // Otherwise, set it as an attribute
      element.setAttribute(attr, attributes[attr]);
    }
  });

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}
