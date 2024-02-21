import { registerUser } from '../../api/auth/registerUser.js';
import { displayMessage, isValidNoroffEmail } from '../../utils/index.js';

export async function registerListener(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  console.log(data);

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
    window.location.href = '/index.html'; // Redirect or handle successful registration
  } catch (error) {
    // Handle errors from registration attempt
    console.error('Registration error:', error);
    displayMessage(
      '#message-registration',
      'alert-danger',
      error.message || 'There was a problem creating your account',
    );
  }
}
