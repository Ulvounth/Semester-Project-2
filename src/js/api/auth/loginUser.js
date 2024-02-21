import { headers } from '../headers.js';
import { save } from '../../storage/index.js';

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
