import { headers } from '../headers.js';

/**
 * Asynchronously fetches the newest active listings from the API, including seller and bids information for each listing.
 * Listings are sorted by their creation date to ensure the newest listings are retrieved first. This function makes
 * a GET request to the API's listings endpoint with specific query parameters to include seller and bids information,
 * only active listings, and to sort the listings by creation date. Custom headers, potentially including authentication,
 * are used for the request.
 *
 * If the fetch operation is successful and the server responds with an OK status, the function returns the parsed JSON response.
 * In the case of a non-successful response (e.g., a 4xx or 5xx status code), or if a network error occurs, the function
 * throws an error with a descriptive message.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of the newest active post objects fetched from the API.
 * @throws {Error} Throws an error if the response from the API is not OK (indicating an HTTP error response) or if a network error occurs during the fetch operation.
 *
 * @example
 * // Fetch the newest active listings and log them
 * getNewest().then(posts => console.log(posts)).catch(error => console.error(error));
 */
export async function getNewest() {
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
