import { getProfileAndListings } from '../api/profiles/profiles.js';
import { load } from '../storage/load.js';
import { createPostCard } from '../ui/components/index.js';
import { displayMessage } from '../utils/displayMessage.js';
import { updateLoginVisibility } from '../ui/auth.js';
import { createElement } from '../utils/createElement.js';

/**
 * Initializes the profile page by updating login visibility, fetching user profile and listings data,
 * and dynamically creating and appending profile information and listings to the main container.
 * This function constructs the user's profile section, including the avatar, name, email, credit information,
 * and a form to update the avatar. It also generates a list of the user's listings if any are available.
 * Each listing is represented as a card that can be interacted with. The function ensures accessibility
 * by using semantic HTML and includes performance optimizations such as lazy loading images to improve page load times.
 *
 * Uses the `updateLoginVisibility` to adjust UI elements based on user authentication status,
 * `load` to retrieve the user's name from storage, `getProfileAndListings` to fetch profile data from the API,
 * and various `createElement` calls to construct HTML elements dynamically.
 *
 * Error handling is implemented to catch and display messages if fetching profile data fails.
 */
export async function initProfilePage() {
  updateLoginVisibility();
  const mainContainer = document.querySelector('#profileContainer');
  mainContainer.textContent = '';

  const { name } = load('user');

  try {
    const profileData = await getProfileAndListings(name);

    const img = createElement('img', {
      src: profileData.avatar || '/images/placeholder.jpg',
      alt: 'Profile Image',
      className: 'img-fluid rounded-circle',
      style: 'max-width: 200px; height: auto;',
      loading: 'lazy',
    });

    const input = createElement('input', {
      type: 'text',
      className: 'form-control',
      placeholder: 'Enter new avatar URL',
      id: 'avatarUrlInput',
      required: true,
    });

    const button = createElement('button', {
      type: 'submit',
      className: 'btn btn-success btn-block my-3',
      textContent: 'Change Profile Image',
    });

    const formGroup = createElement('div', { className: 'form-group' }, input);
    const form = createElement(
      'form',
      { id: 'avatarForm', className: 'mt-3' },
      formGroup,
      button,
    );

    const profileImageWrapper = createElement(
      'div',
      { className: 'profile-image-wrapper text-center' },
      img,
      form,
    );
    const profileInfo = createElement(
      'div',
      { className: 'profile-info py-3' },
      createElement('h3', {}, profileData.name),
      createElement('p', {}, profileData.email),
      createElement('p', {}, `Credits: ${profileData.credits}`),
    );

    const colImg = createElement(
      'div',
      { className: 'col-md-6' },
      profileImageWrapper,
    );
    const colInfo = createElement(
      'div',
      { className: 'col-md-6 bg-light' },
      profileInfo,
    );
    const row = createElement('div', { className: 'row' }, colImg, colInfo);
    const section = createElement(
      'section',
      { className: 'container my-4' },
      row,
    );
    mainContainer.appendChild(section);

    if (profileData.listings && profileData.listings.length > 0) {
      const listingsTitle = createElement(
        'h3',
        { className: 'mb-4 border-bottom' },
        'My Listings',
      );
      const listingsContainer = createElement(
        'div',
        { className: 'row' },
        listingsTitle,
      );

      profileData.listings.forEach((listing) => {
        if (!listing.seller) listing.seller = { name: profileData.name };
        const listingElement = createPostCard({
          post: listing,
          withHref: true,
        });
        listingsContainer.appendChild(listingElement);
      });

      const listingSection = createElement(
        'section',
        { className: 'container my-5' },
        listingsContainer,
      );
      mainContainer.appendChild(listingSection);
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    displayMessage('#profileContainer', 'alert-danger', error);
  }
}
