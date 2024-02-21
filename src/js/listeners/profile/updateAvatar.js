import { updateProfileImage } from '../../api/profiles/getUpdateAvatar.js';
import { displayMessage } from '../../utils/index.js';

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
        alert('Profile image updated successfully!');
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
