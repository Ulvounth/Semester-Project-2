export function createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach((attr) =>
    element.setAttribute(attr, attributes[attr]),
  );

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}
