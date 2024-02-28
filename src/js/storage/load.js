/**
 * Retrieves and parses a JSON stored value from localStorage by a specified key.
 * If the key does not exist or if parsing fails, the function returns null.
 *
 * This function is useful for safely retrieving objects or arrays that have been
 * stringified and stored in localStorage.
 *
 * @param {string} key - The key under which the JSON value is stored in localStorage.
 * @returns {Object|null} The parsed JSON object from localStorage if available and valid; otherwise, null.
 */
export const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};
