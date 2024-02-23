import { headers } from '../headers.js';
import { save } from '../../storage/index.js';

/**
 * Attempts to log in a user with the provided email and password.
 * On success, stores the access token and user details in local storage.
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns {Promise<{accessToken: string, user: Object}>} An object containing the access token and user details.
 * @throws {Error} Throws an error if login is unsuccessful.
 */
export async function loginUser(email, password) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/auction/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: headers('application/json'),
    },
  );

  if (response.ok) {
    const { accessToken, ...user } = await response.json();
    save('token', accessToken);
    save('user', user);
    return { accessToken, user }; // Return the login data
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || response.statusText);
  }
}
