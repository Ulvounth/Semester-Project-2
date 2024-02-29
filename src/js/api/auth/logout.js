import { remove } from '../../storage/index.js';

/**
 * Logs out the current user by removing their details from local storage and redirecting to the homepage.
 */
export function logout() {
  remove('token');
  remove('user');
  window.location.href = '/';
}
