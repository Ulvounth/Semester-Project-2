/**
 * Stores a value in localStorage under the specified key after converting it to a JSON string.
 * This function allows for storing complex objects in localStorage, which can only store strings natively.
 * The value is stringified using JSON.stringify to ensure it can be stored and later retrieved in its original format.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {Object|Array|string|number|boolean} value - The value to store in localStorage. Can be an object, array, string, number, or boolean.
 */
export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
