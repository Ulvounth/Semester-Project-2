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

export function clearMessage(formSelector) {
  const messageDiv = document.querySelector(`${formSelector} .message`);
  if (messageDiv) {
    messageDiv.textContent = '';
  }
}
