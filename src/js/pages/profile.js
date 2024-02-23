import { getProfile } from '../api/profiles/profiles.js';
import { load } from '../storage/load.js';
import { displayMessage } from '../utils/displayMessage.js';

/**
 * Fetches and displays the user profile information. It retrieves the user's name from local storage,
 * fetches profile data using the `getProfile` function, and updates the UI with the user's information.
 * It also handles any errors that occur during the fetch process.
 */
async function fetchAndDisplayUserProfile() {
  // Retrieve user information from local storage
  const { name } = load('user');

  try {
    const profileData = await getProfile(name);

    // Update UI with basic profile info
    document.querySelector('.profile-info h3').textContent = profileData.name;
    document.querySelector('.profile-info p').textContent = profileData.email;
    document.getElementById('profileAvatar').src =
      profileData.avatar || '/images/placeholder.jpg';
    // Add a new paragraph for credits
    const creditsParagraph = document.createElement('p');
    creditsParagraph.textContent = `Credits: ${profileData.credits}`;
    document.querySelector('.profile-info').appendChild(creditsParagraph);

    // displayListings(profileData.name);
    // displayBids(profileData.name);
  } catch (error) {
    console.error('Failed to fetch profile:', error);

    displayMessage(
      '#avatarForm',
      'alert-danger',
      'There was an error fetching the profile.',
    );
  }
}

// Event listener to fetch and display user profile upon DOM content load
document.addEventListener('DOMContentLoaded', fetchAndDisplayUserProfile);
