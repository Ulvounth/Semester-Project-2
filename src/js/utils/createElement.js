/**
 * Utility function to create an HTML element with specified attributes and properties.
 *
 * @param {string} tag - The HTML tag to create.
 * @param {Object} props - An object containing key-value pairs of attributes and properties to set on the element.
 * @returns {HTMLElement} The created HTML element.
 */
function createElement(tag, props) {
  const element = document.createElement(tag);

  if (props) {
    Object.keys(props).forEach((key) => {
      element[key] = props[key];
    });
  }

  return element;
}

export { createElement };
