/* eslint-disable import/prefer-default-export */
/**
 * Returns sorted string array of validation errors
 * @param {object[]} errors - validation errors
 * @returns {string[]} errors
 */
export const mapErrors = (errors) => {
  // Sort errors to make sure their order matches the input field order of the sign-up form
  const order = ['firstName', 'lastName', 'emailAddress', 'password'];
  return [...errors]
    .sort((a, b) => order.indexOf(a.path) - order.indexOf(b.path))
    .map((error) => error.message);
};
