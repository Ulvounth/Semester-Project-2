/**
 * Calculates the number of days remaining until a specified end date.
 * @param {string | Date} endDate The end date as a string or Date object.
 * @returns {number} The number of days until the end date. Rounds up to the nearest whole number.
 */
function calculateDaysUntilExpiration(endDate) {
  const today = new Date();
  const timeDifference = new Date(endDate) - today;
  const millisecondsPerDay = 1000 * 3600 * 24;
  return Math.ceil(timeDifference / millisecondsPerDay);
}

/**
 * Updates the text content of an element with the ID 'endsAt' to show the remaining time
 * until the auction ends. Displays the time in days, hours, and minutes if the auction
 * is still active, or indicates that the auction has ended.
 * @param {string | Date} endsAt The end date and time of the auction as a string or Date object.
 */
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
