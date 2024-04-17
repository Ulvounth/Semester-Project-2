import * as pages from './pages/index.js';
import * as listeners from './listeners/index.js';

/**
 * Routes the application to the correct view and initializes necessary event listeners
 * based on the current path.
 */
const path = location.pathname;

switch (path) {
  case '/':
    pages.initHomePage();
    listeners.logoutListener();
    break;

  case '/pages/auth/':
    listeners.loginListener();
    listeners.registerListener();
    break;

  case '/pages/profile/':
    pages.initProfilePage();
    listeners.logoutListener();
    break;

  case '/pages/listings/':
    pages.initPostsPage();
    listeners.logoutListener();
    break;

  case '/pages/listings/single-listing/':
    pages.initSinglePostPage();
    listeners.handleBidSubmission();
    listeners.logoutListener();
    break;

  case '/pages/sell/':
    listeners.logoutListener();
    listeners.submitCreateListingForm();
    break;
}
