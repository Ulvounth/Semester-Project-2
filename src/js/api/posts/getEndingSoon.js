import { headers } from '../headers.js';

/**
 * Asynchronously fetches listings that are ending soon from the API, including detailed information about the seller and bids for each listing.
 * This function constructs a GET request to the API's listings endpoint with specific query parameters to include only active listings,
 * sorted by their ending date in ascending order, thereby prioritizing listings that are about to close. It limits the results to the top 4 listings.
 * Custom headers, potentially including authentication details, are used for the request.
 *
 * If the fetch operation succeeds and the server responds with a status indicating success, the function returns the parsed JSON response.
 * In case of a non-successful response (e.g., a 4xx or 5xx status code), or if a network error occurs, the function throws an error with a descriptive message.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of listings that are ending soon, fetched from the API.
 * @throws {Error} Throws an error if the response from the API is not OK (indicating an HTTP error response),
 *                 or if a network error occurs during the fetch operation.
 */
export async function getEndingSoon() {
  try {
    const response = await fetch(
      'https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true&_active=true&sort=endsAt&sortOrder=asc&limit=4',
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
