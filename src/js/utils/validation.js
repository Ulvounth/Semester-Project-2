/**
 * Checks if the provided email address is a valid Noroff email. A valid Noroff email
 * must end with '@stud.noroff.no' or '@noroff.no'.
 *
 * @param {string} email The email address to validate.
 * @returns {boolean} True if the email is a valid Noroff email, false otherwise.
 */
export function isValidNoroffEmail(email) {
  return email.endsWith('@stud.noroff.no') || email.endsWith('@noroff.no');
}
