import { headers } from '../headers.js';

/**
 * Asynchronously fetches all posts from the API, including seller and bids information for each post.
 * This function makes a GET request to the API's listings endpoint, requesting data for all available posts.
 * It uses custom headers generated by the `headers` function to include any necessary authentication
 * or content type information in the request. If the fetch operation is successful and the server
 * responds with a status indicating success, the function returns the parsed JSON response.
 * In case of a non-successful response (e.g., a 4xx or 5xx status code), or if a network error occurs,
 * the function throws an error with a descriptive message.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of post objects fetched from the API.
 * @throws {Error} Throws an error if the response from the API is not ok (indicating an HTTP error response),
 * or if a network error occurs during the fetch operation.
 */
export async function allPosts() {
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true`,
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
