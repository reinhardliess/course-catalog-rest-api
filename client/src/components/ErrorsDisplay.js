import React from 'react';
import PropTypes from 'prop-types';

const ErrorsDisplay = ({ errors }) => {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
};

ErrorsDisplay.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ErrorsDisplay;
