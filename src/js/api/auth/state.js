import { load } from '../../storage/index.js';

/**
 * Checks if a user is currently logged in by verifying the presence of a token in local storage.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
export const isLoggedIn = () => Boolean(load('token'));

/**
 * Retrieves the currently logged-in user's details from local storage.
 * @returns {Object|null} The user's details if logged in, null otherwise.
 */
export const profile = () => load('user');
