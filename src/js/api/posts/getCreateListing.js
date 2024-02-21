import { headers } from '../headers.js';

export async function createListing(title, description, media, endsAt) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/auction/listings`,
    {
      method: 'POST',
      body: JSON.stringify({ title, description, media, endsAt }),
      headers: headers('application/json'),
    },
  );

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
