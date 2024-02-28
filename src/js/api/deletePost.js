import { headers } from './headers.js';

/**
 * Send a request to delete a specific post by ID.
 *
 * @param {string|number} postId The ID of the post to be deleted.
 * @returns {Promise<void>} A promise that resolves when the post has been deleted.
 */
export async function deletePost(id) {
  if (confirm('Are you sure you want to delete this post?')) {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/listings/${id}`,
      {
        method: 'DELETE',
        headers: headers(),
      },
    );

    if (response.ok) {
      window.location.reload();
    } else {
      const errorData = await response.json();
      throw new Error(`Error deleting post: ${errorData.message}`);
    }
  }
}
