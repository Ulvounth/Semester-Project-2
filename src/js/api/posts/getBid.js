import { headers } from '../headers.js';

export async function getBid(id, amount) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/auction/listings/${id}/bids`,
    {
      method: 'POST',
      body: JSON.stringify({ amount }),
      headers: headers('application/json'),
    },
  );

  if (response.ok) {
    return await response.json();
  } else {
    const errorResponse = await response.json();
    console.error(`Failed to place a bid on listing ${id}:`, errorResponse);
    throw new Error(response.statusText);
  }
}
