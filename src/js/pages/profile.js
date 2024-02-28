import { getProfileAndListings } from '../api/profiles/profiles.js';
import { load } from '../storage/load.js';
import { createPostCard } from '../ui/components/index.js';
import { displayMessage } from '../utils/displayMessage.js';
import { updateLoginVisibility } from '../ui/auth.js';
import {
  createElement,
  createImage,
  createInput,
  createButton,
} from '../ui/components/index.js';

export async function initProfilePage() {
  updateLoginVisibility();
  const mainContainer = document.querySelector('#profileContainer');
  mainContainer.textContent = '';

  const { name } = load('user');

  try {
    const profileData = await getProfileAndListings(name);
    const img = createImage(
      profileData.avatar || '/images/placeholder.jpg',
      'Profile Image',
      'img-fluid rounded-circle',
    );
    img.style.maxWidth = '200px';
    img.style.height = 'auto';

    const input = createInput('text', 'Enter new avatar URL', 'form-control');
    input.id = 'avatarUrlInput';
    input.required = true;

    const button = createButton(
      'Change Profile Image',
      'btn btn-success btn-block my-3',
      null,
    );

    const form = createElement(
      'form',
      { id: 'avatarForm', class: 'mt-3' },
      createElement('div', { class: 'form-group' }, input),
      button,
    );

    const profileImageWrapper = createElement(
      'div',
      { class: 'profile-image-wrapper text-center' },
      img,
      form,
    );

    const profileInfo = createElement(
      'div',
      { class: 'profile-info py-3' },
      createElement('h3', {}, profileData.name),
      createElement('p', {}, profileData.email),
      createElement('p', {}, `Credits: ${profileData.credits}`),
    );

    const colImg = createElement(
      'div',
      { class: 'col-md-6' },
      profileImageWrapper,
    );
    const colInfo = createElement(
      'div',
      { class: 'col-md-6 bg-light' },
      profileInfo,
    );
    const row = createElement('div', { class: 'row' }, colImg, colInfo);
    const section = createElement('section', { class: 'container my-4' }, row);
    mainContainer.appendChild(section);

    if (profileData.listings && profileData.listings.length > 0) {
      const listingsContainer = createElement(
        'div',
        { class: 'row' },
        createElement('h3', { class: 'mb-4 border-bottom' }, 'My Listings'),
      );

      profileData.listings.forEach((listing) => {
        if (!listing.seller) {
          listing.seller = { name: profileData.name };
        }
        const listingElement = createPostCard({
          post: listing,
          withHref: true,
        });
        listingsContainer.appendChild(listingElement);
      });

      const listingSection = createElement(
        'section',
        { class: 'container my-5' },
        listingsContainer,
      );
      mainContainer.appendChild(listingSection);
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    displayMessage(
      '#profileContainer',
      'alert-danger',
      'There was an error fetching the profile.',
    );
  }
}
