import { createElement } from '../../utils/index.js';

/**
 * Creates and returns a button element designed for editing posts.
 * The button includes an icon and is styled with Bootstrap classes.
 * An event listener for the 'click' event is attached to the button,
 * calling the provided `onClick` callback function when the button is clicked.
 *
 * @param {Function} onClick - The callback function to execute when the button is clicked.
 * @return {HTMLElement} The created edit button element with an attached click event listener.
 */
export function createEditButton(onClick) {
  const editButton = createElement('button', {
    class: 'edit-post btn btn-secondary me-2 mt-2',
    ariaLabel: 'Edit post',
  });

  const icon = createElement('i', {
    class: 'fa-solid fa-pencil',
  });

  editButton.appendChild(icon);

  editButton.addEventListener('click', onClick);

  return editButton;
}
