import { createListing } from '../../api/posts/getCreateListing.js';
import { displayMessage } from '../../utils/displayMessage.js';

/**
 * Initializes the event listener for the listing creation form submission.
 * This function can be called to dynamically attach the event listener
 * when the create listing form is present on the current route.
 */
export function submitCreateListingForm() {
  const form = document.getElementById('createListingForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      // Extract individual values from formData
      const title = formData.get('title');
      const description = formData.get('description');
      // Convert media URL string to an array of URLs
      const media = formData.get('media') ? [formData.get('media')] : [];
      const endsAt = formData.get('endsAt');

      // Validate endsAt to ensure it is in the future
      const endsAtDate = new Date(endsAt);
      const now = new Date();
      if (endsAtDate <= now) {
        displayMessage(
          '#createListingForm',
          'alert-danger',
          'End date must be in the future.',
        );
        return;
      }

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
  }
}
