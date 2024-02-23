// Import necessary functions from other modules
import { loginUser } from '../../api/auth/loginUser.js';
import { displayMessage, isValidNoroffEmail } from '../../utils/index.js';

/**
 * Handles the login form submission. Validates the input and attempts to log the user in.
 * @param {Event} event The form submission event.
 */
export async function loginListener(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);
  const email = data.get('email');
  const password = data.get('password');

  // Validate email
  if (!isValidNoroffEmail(email)) {
    displayMessage(
      '#message',
      'alert-danger',
      'Please use a valid Noroff email address',
    );
    return;
  }

  // Try to login the user
  try {
    const result = await loginUser(email, password);
    if (result && result.accessToken) {
      window.location.href = '/index.html';
    } else {
      displayMessage('#message', 'alert-danger', 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    displayMessage(
      '#message',
      'alert-danger',
      'An error occurred during login.',
    );
  }
}
