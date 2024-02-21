import { headers } from '../headers.js';

export async function getProfiles() {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/auction/profiles`,
    {
      headers: headers(),
    },
  );
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}

export async function getProfile(name) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/auction/profiles/${name}?_listings=true`,
    { headers: headers() },
  );
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
