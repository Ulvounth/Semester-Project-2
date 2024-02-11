import { headers } from '../headers.js';

export async function registerUser(name, email, password, avatar) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/auction/auth/register`,
    {
      method: 'post',
      body: JSON.stringify({ name, email, password, avatar }),
      headers: headers('application/json'),
    },
  );

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
