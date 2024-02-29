import { headers } from '../headers.js';

/**
 * Asynchronously creates a new listing on the API with the provided details.
 * This function sends a POST request to the API's listings endpoint, including the listing's title,
 * description, media (URLs to images or other relevant content), and the end date for the listing.
 * The request includes custom headers, which may contain necessary authentication details,
 * and specifies 'application/json' as the content type.
 *
 * If the request is successful and the server responds with a status indicating success,
 * the function returns the newly created listing as parsed JSON. If the request fails due to a server-side
 * error or other HTTP issue, it throws an error with the status text from the response.
 *
 * @param {string} title - The title of the listing.
 * @param {string} description - A detailed description of the listing.
 * @param {Array<string>} media - An array of strings, each representing a URL to an image or other media for the listing.
 * @param {string} endsAt - The end date and time for the listing, in a format recognized by the Date constructor.
 * @returns {Promise<Object>} A promise that resolves to the newly created listing object.
 * @throws {Error} Throws an error with the response status text if the API request is not successful.
 */
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
