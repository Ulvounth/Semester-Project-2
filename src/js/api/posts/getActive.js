import { headers } from '../headers.js';

export async function getActive() {
  try {
    const response = await fetch(
      'https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true&_active=true&sort=created',
      {
        method: 'GET',
        headers: headers(),
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error('Network error: Unable to fetch posts.');
  }
}
