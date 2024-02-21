import { createElement } from '../../utils/index.js';

export function createEditButton(onClick) {
  const editButton = createElement('button', {
    className:
      'edit-post btn btn-secondary position-absolute top-0 end-0 me-2 mt-2',
    ariaLabel: 'Edit post',
  });

  const icon = createElement('i', {
    className: 'fa-solid fa-pencil',
  });

  editButton.appendChild(icon);

  editButton.addEventListener('click', onClick);

  return editButton;
}
