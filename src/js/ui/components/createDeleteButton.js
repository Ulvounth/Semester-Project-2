import { createElement } from '../../utils/index.js';

/**
 * Creates a delete button for a post and sets up a click event listener.
 *
 * @param {function} onClick - The function to be called when the button is clicked.
 * @returns {HTMLElement} The created delete button element.
 */
export function createDeleteButton(onClick) {
  const deleteButton = createElement('button', {
    class: 'btn btn-danger mt-2',
    textContent: 'Delete Post',
  });

  deleteButton.addEventListener('click', onClick);

  return deleteButton;
}
