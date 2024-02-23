/**
 * Updates the bidding UI based on the current state of the post.
 * Disables the bid button and updates its text if the auction has ended.
 * @param {Object} post The post object containing details about the auction.
 */
export function updateBidUi(post) {
  const bidButton = document.getElementById('placeBidButton');
  const bidAmountInput = document.getElementById('bidAmount');
  const endTime = new Date(post.endsAt);
  const now = new Date();

  const auctionEnded = endTime <= now;
  bidButton.textContent = auctionEnded ? 'SOLD' : 'BID';
  bidButton.disabled = auctionEnded;
  bidButton.classList.toggle('btn-success', !auctionEnded);
  bidButton.classList.toggle('btn-secondary', auctionEnded);
  bidAmountInput.disabled = auctionEnded;
}
