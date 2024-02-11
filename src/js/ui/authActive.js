const container = document.getElementById('auth-container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add('auth-active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('auth-active');
});
