import { loginListener } from './login.js';
import { registerListener } from './register.js';

/**
 * Attaches event listeners to the login and registration forms once the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', registerListener);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', loginListener);
  }
});
