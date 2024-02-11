import { allPosts } from '../api/posts/allPosts.js';
import { createPostCard } from '../ui/components/createPostCard.js';
import { displayMessage } from '../ui/shared/displayMessage.js';

async function displayPosts(posts) {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.forEach((post) => {
    const postCard = createPostCard({ post });
    postsContainer.appendChild(postCard);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const posts = await allPosts();
    displayPosts(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    displayMessage(
      '#posts',
      'alert-danger',
      'There was an error fetching the posts.',
    );
  }
});
