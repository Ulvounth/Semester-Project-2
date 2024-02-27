export function createListingElement(listing) {
  const listingElement = document.createElement('div');
  listingElement.className = 'listing';

  const title = document.createElement('h4');
  title.textContent = listing.title;

  const description = document.createElement('p');
  description.textContent = listing.description;

  const deadline = document.createElement('p');
  deadline.textContent = `Deadline: ${new Date(listing.deadline).toLocaleDateString()}`;

  // Add more details as needed
  listingElement.appendChild(title);
  listingElement.appendChild(description);
  listingElement.appendChild(deadline);

  return listingElement;
}
