/**
 * Send a request to delete a specific post by ID.
 *
 * @param {string|number} postId The ID of the post to be deleted.
 * @returns {Promise<void>} A promise that resolves when the post has been deleted.
 */
export async function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/listings/${postId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
