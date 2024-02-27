import { getProfileAndListings } from '../api/profiles/profiles.js';
import { load } from '../storage/load.js';
import { createPostCard } from '../ui/components/index.js';
import { displayMessage } from '../utils/displayMessage.js';
import { updateLoginVisibility } from '../ui/auth.js';

export async function initProfilePage() {
  updateLoginVisibility();

  const mainContainer = document.querySelector('#profileContainer');
  mainContainer.textContent = ''; // Clear existing content safely

  // Retrieve user information from local storage
  const { name } = load('user');

  try {
    const profileData = await getProfileAndListings(name);

    // Profile Image Section
    const profileImageWrapper = document.createElement('div');
    profileImageWrapper.className = 'profile-image-wrapper text-center';

    const img = document.createElement('img');
    img.src = profileData.avatar || '/images/placeholder.jpg';
    img.alt = 'Profile Image';
    img.className = 'img-fluid rounded-circle';
    img.style.maxWidth = '200px';
    img.style.height = 'auto';

    const form = document.createElement('form');
    form.id = 'avatarForm';
    form.className = 'mt-3';

    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'avatarUrlInput';
    input.className = 'form-control';
    input.placeholder = 'Enter new avatar URL';
    input.required = true;

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'btn btn-success btn-block my-3';
    button.textContent = 'Change Profile Image';

    formGroup.appendChild(input);
    form.appendChild(formGroup);
    form.appendChild(button);

    profileImageWrapper.appendChild(img);
    profileImageWrapper.appendChild(form);

    // Profile Information Section
    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info py-3';

    const username = document.createElement('h3');
    username.textContent = profileData.name;

    const userEmail = document.createElement('p');
    userEmail.textContent = profileData.email;

    const creditsParagraph = document.createElement('p');
    creditsParagraph.textContent = `Credits: ${profileData.credits}`;

    profileInfo.appendChild(username);
    profileInfo.appendChild(userEmail);
    profileInfo.appendChild(creditsParagraph);

    // Constructing the layout for profile info
    const colImg = document.createElement('div');
    colImg.className = 'col-md-6';
    colImg.appendChild(profileImageWrapper);

    const colInfo = document.createElement('div');
    colInfo.className = 'col-md-6 bg-light';
    colInfo.appendChild(profileInfo);

    const row = document.createElement('div');
    row.className = 'row';
    row.appendChild(colImg);
    row.appendChild(colInfo);

    const section = document.createElement('section');
    section.className = 'container my-4';
    section.appendChild(row);

    mainContainer.appendChild(section);

    // Listings Section
    if (profileData.listings && profileData.listings.length > 0) {
      const listingSection = document.createElement('section');
      listingSection.className = 'container my-5';

      const listingsContainer = document.createElement('div');
      listingsContainer.className = 'row';
      listingSection.appendChild(listingsContainer);

      const listingsTitle = document.createElement('h3');
      listingsTitle.className = 'mb-4 border-bottom';
      listingsTitle.textContent = 'My Listings';
      listingsContainer.appendChild(listingsTitle);

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
