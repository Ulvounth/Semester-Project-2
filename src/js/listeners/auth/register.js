import { registerUser } from '../../api/auth/registerUser.js';
import { displayMessage, isValidNoroffEmail } from '../../utils/index.js';

/**
 * Handles the registration form submission. Validates the input and attempts to register the user.
 * @param {Event} event The form submission event.
 */
export async function registerListener() {
  const form = document.querySelector('#registerForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const form = e.target;
      const data = new FormData(form);

      const name = data.get('username');
      const email = data.get('email');
      const password = data.get('password');
      const avatar = data.get('avatar');

      // Validation
      if (name.includes('.') || name.includes(' ')) {
        displayMessage(
          '#message-includes',
          'alert-danger',
          'Username should not contain punctuation or spaces apart from underscores.',
        );
        return;
      }
      if (!isValidNoroffEmail(email)) {
        displayMessage(
          '#message-endswith',
          'alert-danger',
          'Please use a valid Noroff email address.',
        );
        return;
      }
      if (password.length < 8) {
        displayMessage(
          '#message-length',
          'alert-danger',
          'Password must be at least 8 characters.',
        );
        return;
      }

      // Attempt to register the user
      try {
        await registerUser(name, email, password, avatar);

        // If the registration is successful
        alert('Registration successful!');
        window.location.href = '/';
      } catch (error) {
        // Handle errors from registration attempt
        console.error('Registration error:', error);
        displayMessage(
          '#message-registration',
          'alert-danger',
          error || 'There was a problem creating your account',
        );
      }
    });
  }
}
