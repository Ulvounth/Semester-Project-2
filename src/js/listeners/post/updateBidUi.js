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
