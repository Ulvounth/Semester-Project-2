import { loginListener } from './login.js';
import { registerListener } from './register.js';

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
