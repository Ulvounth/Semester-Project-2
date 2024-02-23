import { updateProfileImage } from '../../api/profiles/getUpdateAvatar.js';
import { displayMessage } from '../../utils/index.js';

/**
 * Sets up an event listener for the avatar update form. When the form is submitted,
 * it prevents the default form submission, validates the avatar URL, and attempts
 * to update the user's profile image through an API call. It provides feedback to the user
 * about the success or failure of the image update operation.
 */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('avatarForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const avatarUrlInput = document.getElementById('avatarUrlInput');
    const avatarUrl = avatarUrlInput.value.trim();

    if (avatarUrl) {
      try {
        const response = await updateProfileImage(avatarUrl);

        document.getElementById('profileAvatar').src = response.avatar;

        avatarUrlInput.value = '';
        displayMessage(
          '#avatarForm',
          'alert-success',
          'Profile image updated successfully!',
        );
      } catch (error) {
        console.error('Error updating profile image:', error);
        displayMessage(
          '#avatarForm',
          'alert-danger',
          'Please enter a valid URL',
        );
      }
    }
  });
});
