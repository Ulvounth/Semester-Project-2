import { remove } from '../../storage/index.js';

export function logout() {
  remove('token');
  remove('user');
  window.location.href = '/index.html';
}
