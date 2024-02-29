/**
 * Displays a message within a specified parent element on the page. The message
 * and its type (e.g., success, error) are customizable.
 *
 * @param {string} parent The selector for the parent element where the message should be displayed.
 * @param {string} messageType The class indicating the type of message (e.g., 'alert-success', 'alert-danger').
 * @param {string} message The text content of the message to be displayed.
 */
export function displayMessage(parent, messageType, message) {
  const container = document.querySelector(parent);

  container.innerHTML = `<div class="alert ${messageType}">${message}</div>`;
}

/**
 * Clears any messages from a specified container. This is useful for removing
 * feedback messages before a new action is taken.
 *
 * @param {string} containerSelector The selector for the container element whose messages should be cleared.
 */
export function clearMessage(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (container) {
    container.innerHTML = '';
  }
}
