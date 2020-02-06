import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays validation messages
 * @param {object} props
 */
const ErrorsDisplay = ({ errors }) => {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error) => (
              <li key={`${error.type}${error.path}`}>{error.message}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
};

ErrorsDisplay.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      path: PropTypes.string,
      message: PropTypes.string,
    })
  ),
};

export default ErrorsDisplay;
