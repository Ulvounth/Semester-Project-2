import { allPosts, getNewest, getActive } from '../api/posts/index.js';
import { createPostCard } from '../ui/components/createPostCard.js';
import { displayMessage } from '../utils/displayMessage.js';
import { updateLoginVisibility } from '../ui/auth.js';

/**
 * Displays a list of posts in the designated container.
 * @param {Array<Object>} posts An array of post objects to be displayed.
 */
async function displayPosts(posts) {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.forEach((post) => {
    const postCard = createPostCard({ post });
    postsContainer.appendChild(postCard);
  });
}

/**
 * Fetches posts based on the specified filter and displays them.
 * Handles fetching of all posts, newest posts, or active posts.
 * @param {string} filter A string indicating the type of posts to fetch: 'all', 'active', or 'newest'.
 */
async function fetchAndDisplayPosts(filter) {
  try {
    let posts;
    switch (filter) {
      case 'active':
        posts = await getActive();
        break;
      case 'newest':
        posts = await getNewest();
        break;
      default:
        posts = await allPosts();
    }
    displayPosts(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    displayMessage(
      '#posts',
      'alert-danger',
      'There was an error fetching the posts.',
    );
  }
}

/**
 * Initializes the page content by updating login visibility and setting up
 * the post filter functionality. Fetches and displays posts based on the
 * selected filter upon page load and when the filter selection changes.
 */
document.addEventListener('DOMContentLoaded', async () => {
  updateLoginVisibility();

  const filterSelect = document.getElementById('filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', () =>
      fetchAndDisplayPosts(filterSelect.value),
    );
  }

  // Initial fetch and display of posts based on default or initially selected filter
  fetchAndDisplayPosts(filterSelect ? filterSelect.value : 'all');
});
