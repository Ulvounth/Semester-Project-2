import { createListing } from '../../api/posts/index.js';
import { displayMessage } from '../../utils/displayMessage.js';

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
