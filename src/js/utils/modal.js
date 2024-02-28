import { headers } from '../api/headers.js';
import { displayMessage } from './displayMessage.js';
/**
 * Displays the modal for editing a post.
 *
 * @param {Object} post - The post object to be edited.
 */
/* global bootstrap */
function editPost(post) {
  editModal(post);
  let modal = new bootstrap.Modal(
    document.getElementById(`editPostModal-${post.id}`),
  );
  modal.show();
}

/**
 * Creates and inserts the HTML for the edit post modal into the DOM.
 *
 * @param {Object} post - The post object to be edited, used to prefill modal form fields.
 */
function editModal(post) {
  // Generate a unique ID for the modal and form
  const modalId = `editPostModal-${post.id}`;
  const formId = `editPostForm-${post.id}`;

  const modalHTML = `
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="editPostLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editPostLabel">Edit Post</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="${formId}">
                <div class="mb-3">
                  <label for="postTitle" class="form-label">Title</label>
                  <input type="text" class="form-control" id="postTitle" value="${
                    post.title
                  }" required>
                </div>
                <div class="mb-3">
                  <label for="postBody" class="form-label">Body</label>
                  <textarea class="form-control" id="postBody" required>${post.description}</textarea>
                </div>
                <div class="mb-3">
                  <label for="postMedia" class="form-label">Media URL</label>
                  <input type="url" class="form-control" id="postMedia" value="${post.media || ''}">
                </div>
                <button type="submit" class="btn btn-primary">Edit Post</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Now set up the form submission
  editModalSubmission(post, formId, modalId);
}

/**
 * Set up form submission logic for editing a post.
 * Attaches an event listener to the form within the modal, handling the form submission,
 * validation, and sending a PUT request with the updated post data.
 *
 * @param {Object} post - The original post object being edited.
 * @param {string} formId - The ID of the form element within the modal.
 * @param {string} modalId - The ID of the modal element.
 */
function editModalSubmission(post, formId, modalId) {
  const form = document.getElementById(formId);
  form.onsubmit = async function (e) {
    e.preventDefault();

    // Get the values from the form
    const title = document.getElementById('postTitle').value;
    const description = document.getElementById('postBody').value;
    const media = document.getElementById('postMedia').value
      ? [document.getElementById('postMedia').value]
      : [];

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/listings/${post.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ title, description, media }),
          headers: headers('application/json'),
        },
      );

      if (response.ok) {
        // Handle successful update here...
        const modalElement = document.getElementById(modalId);
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        modalElement.remove();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating post:', error);

      displayMessage(
        '#editPostLabel',
        'alert-danger',
        'Error updating post, please try again.',
      );
    }
  };
}

export { editPost, editModal, editModalSubmission };
