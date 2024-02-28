import {
  createElement,
  calculateDaysUntilExpiration,
} from '../../utils/index.js';

/**
 * Creates and returns the HTML content for a post. This content includes the post's title, media (if available),
 * and an expiration indicator showing how many days are left until the post expires or indicating if the post
 * has already expired. Optionally, the content can be wrapped in a hyperlink that directs to a detailed view of the post.
 *
 * @param {Object} options - Configuration options for creating post content.
 * @param {Object} options.post - The post data to be used in creating content.
 * @param {string} options.post.id - The unique identifier of the post.
 * @param {string} options.post.title - The title of the post.
 * @param {string} [options.post.media] - The URL to the media (e.g., image) associated with the post. Optional.
 * @param {string} options.post.endsAt - The expiration date of the post in a format recognized by the Date constructor.
 * @param {boolean} withHref - Determines if the post content should be wrapped in a hyperlink. If true, the content
 *                             will be enclosed within an anchor (`<a>`) element, making it clickable and redirecting
 *                             to a URL with the post's ID.
 * @returns {HTMLElement} The created post content element, wrapped in an anchor element if `withHref` is true. The
 *                        content includes the post's media (if available), title, and an expiration indicator.
 */
export function createPostContent({ post, withHref }) {
  const { id, title, media } = post;

  const postContent = createElement('div', {
    class: 'card position-relative shadow border-0',
  });

  let wrapper = postContent;

  if (withHref) {
    const baseUrl = window.location.origin;
    const postLinkHref = `${baseUrl}/pages/listings/single-listing/?postId=${id}`;

    const postLink = createElement('a', {
      class: 'text-decoration-none text-dark',
      href: postLinkHref,
    });
    postLink.appendChild(postContent);
    wrapper = postLink;
  }

  const img = createElement('img', {
    src: media[0] ?? `/images/placeholder.jpg`,
    class: 'card-img',
    alt: 'Post image',
    loading: 'lazy',
  });
  postContent.appendChild(img);

  const cardBody = createElement('div', {
    class: 'card-body',
  });

  const postTitle = createElement('h4', {
    class: 'card-title',
    textContent: title,
  });

  const buyButton = createElement('button', {
    class: 'btn btn-success py-1 m-1',
    textContent: 'Read More',
  });

  const expirationIndicator = createElement('p', {
    class: 'position-absolute top-0 end-0 bg-danger px-3 py-1 text-white',
  });

  const daysUntilExpiration = calculateDaysUntilExpiration(post.endsAt);

  if (daysUntilExpiration >= 0) {
    expirationIndicator.textContent = `${daysUntilExpiration} days left`;
  } else {
    expirationIndicator.textContent = 'Expired';
  }

  postContent.appendChild(cardBody);
  cardBody.appendChild(postTitle);
  cardBody.appendChild(expirationIndicator);
  postContent.appendChild(buyButton);

  return wrapper;
}
