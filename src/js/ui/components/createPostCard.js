import { createElement, editPost } from '../../utils/index.js';
import { deletePost } from '../../api/deletePost.js';
import {
  createPostContent,
  createDeleteButton,
  createEditButton,
} from './index.js';
import { profile } from '../../api/auth/state.js';

/**
 * Creates a card element for a post with content, interaction elements, and optionally edit and delete buttons.
 *
 * @param {Object} options - The options for creating a post card.
 * @param {Object} options.post - The post data to create the card for.
 * @param {boolean} [options.withHref=true] - Whether the post content should be wrapped in a hyperlink.
 * @returns {HTMLElement} The created post card element.
 */
export function createPostCard({ post, withHref = true }) {
  const postCard = createElement('div', {
    className: 'col mb-5 rounded-4 d-flex justify-content-center',
    id: `post-${post.id}`, // Set a unique ID for each post card
  });

  const postContent = createPostContent({ post, withHref });

  const userData = profile();
  // Proceed only if userData is not null and contains the expected properties
  if (userData && userData.name && post.seller.name.includes(userData.name)) {
    // User is logged in and authorized, so add edit and delete buttons

    const editButton = createEditButton((e) => {
      e.preventDefault();
      e.stopPropagation();
      editPost(post);
    });

    const deleteButton = createDeleteButton(async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await deletePost(post.id);
    });

    postCard.appendChild(editButton);
    postContent.appendChild(deleteButton);
  }

  postCard.appendChild(postContent);

  return postCard;
}
