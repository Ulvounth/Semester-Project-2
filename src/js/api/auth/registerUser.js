import { headers } from '../headers.js';

/**
 * Registers a new user with the provided details.
 * @param {string} name The user's name.
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @param {string} avatar The URL to the user's avatar image.
 * @returns {Promise<Object>} The response object from the registration API.
 * @throws {Error} Throws an error if registration fails.
 */
export async function registerUser(name, email, password, avatar) {
  console.log({ name, email, password, avatar });
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/auth/register`,
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password, avatar }),
        headers: headers('application/json'),
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      // If the response is not ok, read the response body as JSON to get more error information
      const error = await response.json();
      // Log the error or handle it as you see fit
      console.error('API Error:', error);
      // Throw an Error object with the detailed error message
      throw new Error(`API Error: ${error.message || response.statusText}`);
    }
  } catch (error) {
    // This catches network errors and errors thrown from the above block
    console.error('Network or other error:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
