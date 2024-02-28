/**
 * Removes an item from localStorage by its key.
 * This function provides a direct way to delete a specific value stored in localStorage,
 * identified by the provided key. It does not return any value.
 *
 * @param {string} key - The key of the item to remove from localStorage.
 */
export const remove = (key) => localStorage.removeItem(key);
