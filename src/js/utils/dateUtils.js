function calculateDaysUntilExpiration(endDate) {
  const today = new Date();
  const timeDifference = new Date(endDate) - today;
  const millisecondsPerDay = 1000 * 3600 * 24;
  return Math.ceil(timeDifference / millisecondsPerDay);
}

function updateAuctionEndTime(endsAt) {
  const endsAtElement = document.getElementById('endsAt');
  const endTime = new Date(endsAt);
  const now = new Date();
  const timeLeft = endTime - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    endsAtElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes remaining`;
  } else {
    endsAtElement.textContent = 'Auction has ended';
  }
}

export { calculateDaysUntilExpiration, updateAuctionEndTime };
