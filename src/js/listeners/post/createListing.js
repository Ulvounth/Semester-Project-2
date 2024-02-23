import { createListing } from '../../api/posts/index.js';
import { displayMessage } from '../../utils/displayMessage.js';

/**
 * Event listener for the listing creation form submission.
 * Extracts data from the form, attempts to create a listing via the API, and handles the UI response.
 */
const form = document.getElementById('createListingForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  // Extract individual values from formData
  const title = formData.get('title');
  const description = formData.get('description');
  // Convert media URL string to an array of URLs
  const media = formData.get('media') ? [formData.get('media')] : [];
  const endsAt = formData.get('endsAt');

  try {
    // Pass individual values as arguments, ensuring media is an array
    await createListing(title, description, media, endsAt);

    displayMessage(
      '#createListingForm',
      'alert-success',
      'Listing created successfully!',
    );
  } catch (error) {
    console.error('Error creating listing:', error);
    displayMessage(
      '#createListingForm',
      'alert-danger',
      'There was an error creating the listing',
    );
  }
});
