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
 * Initializes the homepage by fetching posts that are ending soon,
 * updating the display of these posts, and ensuring that login-related UI elements
 * are shown or hidden based on the user's authentication status.
 */
async function initHomePage() {
  try {
    const posts = await getEndingSoon();
    await displayEndingSoon(posts);
    updateLoginVisibility();
  } catch (error) {
    console.error('Error fetching posts:', error);
    displayMessage('#endingSoon', 'alert-danger', error);
  }
}

export { initHomePage };
