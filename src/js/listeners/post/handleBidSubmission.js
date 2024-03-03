import { displayMessage } from '../../utils/displayMessage.js';
import { isLoggedIn } from '../../api/auth/state.js';
import { getBid } from '../../api/posts/getBid.js';

/**
 * Attaches an event listener to the bid submission form. Validates user authentication,
 * submits the bid, and updates the UI based on the response.
 */
export function handleBidSubmission() {
  const bidForm = document.getElementById('bidForm'); // Changed the form ID to be unique

  bidForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('postId');

    const form = event.target;
    const data = new FormData(form);
    const amountValue = data.get('amount');

    if (!isLoggedIn()) {
      displayMessage(
        '#messageFeedback',
        'alert-danger',
        'Please log in to place bid',
      );
      return;
    }

    try {
      await getBid(id, Number(amountValue));
      displayMessage(
        '#messageFeedback',
        'alert-success',
        'Your bid is now the highest!',
      );

      setTimeout(() => window.location.reload(), 1500); // Adjusted timeout for user to read the message
    } catch (error) {
      console.error('Bid submission error:', error);
      displayMessage('#messageFeedback', 'alert-danger', error);
    }
  });
}
