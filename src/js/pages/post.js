import { getPost } from '../api/posts/index.js';
import { handleBidSubmission } from '../listeners/post/handleBidSubmission.js';
import { updateBidUi } from '../listeners/post/updateBidUi.js';
import { displayMessage, updateAuctionEndTime } from '../utils/index.js';

const documentTitle = document.querySelector('title');
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

/**
 * Fetches and displays the listing details for a specific post.
 * Updates various elements on the page with the listing's information,
 * including the title, description, image, seller information, and current bids.
 * Initializes bid submission handling.
 */
export async function displayListing() {
  try {
    const post = await getPost(postId);

    // Update the document title to the listing's title
    documentTitle.textContent = post.title;

    // Update the page content with the fetched data
    document.getElementById('listingTitle').textContent = post.title;
    document.getElementById('listingDescription').textContent =
      post.description;

    // Check if the post has an image, and use a placeholder if not
    const imageSrc = post.media[0] ?? `/images/placeholder.jpg`;
    document.getElementById('listingImage').src = imageSrc;

    // Update seller information
    document.querySelector('#sellerName').textContent =
      post.seller.name || 'N/A';
    document.querySelector('#sellerEmail').textContent =
      post.seller.email || 'No email provided';

    // Find the highest bid
    const highestBid = post.bids.reduce(
      (max, bid) => Math.max(max, bid.amount),
      0,
    );
    document.getElementById('currentBid').textContent =
      `Current bid: ${highestBid},-` || '0,-';

    // Update the auction end time
    updateAuctionEndTime(post.endsAt);
    updateBidUi(post);

    // Display bids or a default message if there are no bids
    const bidsContainer = document.querySelector('.list-group');
    bidsContainer.innerHTML = ''; // Clear existing bids
    if (post.bids.length === 0) {
      const noBidsMessage = document.createElement('div');
      noBidsMessage.className = 'list-group-item';
      noBidsMessage.textContent = 'No bids have been made yet.';
      bidsContainer.appendChild(noBidsMessage);
    } else {
      const sortedBids = post.bids.sort((a, b) =>
        new Date(b.created) > new Date(a.created) ? 1 : -1,
      );
      sortedBids.forEach((bid) => {
        const bidElement = document.createElement('div');
        bidElement.className = 'list-group-item d-flex justify-content-between';
        bidElement.innerHTML = `
          <p class="mb-0">Name: ${bid.bidderName}</p>
          <p class="mb-0">BID: ${bid.amount} Credits</p>
          <p class="mb-0">Date: ${new Date(bid.created).toLocaleDateString()}</p>
        `;
        bidsContainer.appendChild(bidElement);
      });
    }
  } catch (error) {
    console.error('Error fetching listing:', error);
    displayMessage(
      '#post',
      'alert-danger',
      'There was an error fetching the listing.',
    );
  }
}

// Call displayListing to initialize the page content
displayListing().then(() => {
  // Initialize bid submission handling after the listing is displayed
  handleBidSubmission();
});
