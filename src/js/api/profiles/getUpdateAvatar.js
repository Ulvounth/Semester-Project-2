import { headers } from '../headers.js';
import { profile } from '../auth/state.js';

export async function updateProfileImage(avatarUrl) {
  const user = profile();

  const response = await fetch(
    `https://api.noroff.dev/api/v1/auction/profiles/${user.name}/media`,
    {
      method: 'PUT',
      body: JSON.stringify({ avatar: avatarUrl }),
      headers: headers('application/json'),
    },
  );

  if (response.ok) {
    return await response.json();
  } else {
    // Optionally, parse and log the error response from the server
    const errorResponse = await response.json();
    console.error('Failed to update profile image:', errorResponse);
    throw new Error(response.statusText);
  }
}
