import { headers } from '../headers.js';

/**
 * Asynchronously posts a bid to a specific listing identified by its ID.
 * This function sends a POST request to the API's endpoint for bids on a particular listing,
 * including the bid amount in the request body. Custom headers, potentially including authentication details,
 * are used for the request. The function parses and returns the JSON response from the API if the request is successful.
 * If the request fails due to a server-side error, other HTTP issues, or if the bid does not meet the listing's requirements,
 * it logs and throws an error with a descriptive message based on the API's response.
 *
 * @param {string} id - The unique identifier of the listing to which the bid is being made.
 * @param {number} amount - The amount of the bid being placed.
 * @returns {Promise<Object>} A promise that resolves to the bid object created on the API.
 * @throws {Error} Throws an error with the response status text if the API request is not successful, after logging additional error details.
 */
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
