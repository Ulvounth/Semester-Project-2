import { headers } from '../headers.js';

export async function getPost(id) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/auction/listings/${id}?_seller=true&_bids=true`,
    {
      headers: headers(),
    },
  );
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
