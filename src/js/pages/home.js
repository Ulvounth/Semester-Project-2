import { getEndingSoon } from '../api/posts/getEndingSoon.js';
import { createPostCard } from '../ui/components/createPostCard.js';
import { displayMessage } from '../utils/index.js';
import { updateLoginVisibility } from '../ui/auth.js';

/**
 * Displays posts that are ending soon on the homepage.
 * It clears the previous posts and then iterates over the new posts to create
 * and append their corresponding card elements to the DOM.
 * @param {Object[]} posts An array of post objects to display.
 */
async function displayEndingSoon(posts) {
  const postsContainer = document.getElementById('endingSoon');
  postsContainer.innerHTML = '';

  posts.forEach((post) => {
    const postCard = createPostCard({ post });
    postsContainer.appendChild(postCard);
  });
}

/**
 * When the DOM content is fully loaded, fetches posts that are ending soon,
 * updates the display of these posts, and ensures that login-related UI elements
 * are shown or hidden based on the user's authentication status.
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const posts = await getEndingSoon();
    displayEndingSoon(posts);
    updateLoginVisibility();
  } catch (error) {
    console.error('Error fetching posts:', error);
    displayMessage(
      '#posts',
      'alert-danger',
      'There was an error fetching the posts.',
    );
  }
});
