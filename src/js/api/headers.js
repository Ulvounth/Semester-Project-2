import * as storage from '../storage/index.js';

/**
 * Generates an object containing HTTP headers for use in API requests.
 * This function dynamically constructs headers based on the presence of a content type and a stored authentication token.
 * The Content-Type header is set if a contentType argument is provided. If an authentication token is stored,
 * it adds an Authorization header with a Bearer token. This function is useful for making authenticated API requests
 * that require a content type specification and authorization.
 *
 * @param {string} [contentType] - The MIME type for the request's content, which will be used to set the Content-Type header.
 * @returns {Object} An object containing the constructed headers, which may include Content-Type and Authorization depending on the provided contentType and the presence of a stored token.
 */
export const headers = (contentType) => {
  const token = storage.load('token');
  const headers = {};

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
