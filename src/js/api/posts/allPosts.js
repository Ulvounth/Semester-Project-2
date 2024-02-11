import { headers } from '../headers.js';

export async function allPosts() {
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/listings`,
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
