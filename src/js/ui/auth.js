import { load } from '../storage/index.js';

/**
 * Toggles the 'logged-in' class on the body element based on the user's login status.
 * This class can be used in CSS to show or hide elements depending on whether the user is logged in.
 * The login status is determined by the presence of a 'token' in the local storage.
 */
export function updateLoginVisibility() {
  const token = load('token');
  document.body.classList[token ? 'add' : 'remove']('logged-in');
}
