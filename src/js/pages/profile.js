import { getProfile } from '../api/profiles/profiles.js';
import { load } from '../storage/load.js';

async function fetchAndDisplayUserProfile() {
  // Retrieve user information from local storage
  const { name } = load('user');

  try {
    const profileData = await getProfile(name); // Assuming `getProfile` uses the profile name to fetch data

    // Update UI with basic profile info
    document.querySelector('.profile-info h3').textContent = profileData.name;
    document.querySelector('.profile-info p').textContent = profileData.email;
    document.getElementById('profileAvatar').src =
      profileData.avatar || '/images/placeholder.jpg';
    // Add a new paragraph for credits
    const creditsParagraph = document.createElement('p');
    creditsParagraph.textContent = `Credits: ${profileData.credits}`;
    document.querySelector('.profile-info').appendChild(creditsParagraph);

    // Assuming you have functions to fetch and display listings and bids
    // displayListings(profileData.name);
    // displayBids(profileData.name);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    // Handle the error appropriately
  }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayUserProfile);
