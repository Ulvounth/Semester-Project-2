import { logout } from '../../api/auth/logout.js';
import { updateLoginVisibility } from '../../ui/auth.js';

/**
 * Attaches an event listener to the logout button. When clicked, it triggers the logout process.
 */
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
    updateLoginVisibility();
  }
});
