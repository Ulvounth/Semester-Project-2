import { updateProfileImage } from '../../api/profiles/getUpdateAvatar.js';
import { displayMessage } from '../../utils/index.js';

/**
 * Initializes the avatar update functionality by setting up an event listener
 * for the avatar update form. Validates the avatar URL and attempts to update
 * the user's profile image through an API call upon form submission.
 */
export function initAvatarUpdateForm() {
  const form = document.getElementById('avatarForm');

  if (!form) return; // Exit if the form is not found on the current page

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
}
