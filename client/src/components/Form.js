import React from 'react';
import PropTypes from 'prop-types';
import ErrorsDisplay from './ErrorsDisplay';

/**
 * Basic form component for sign-in/sign-up & create/update course
 * @param {object} props - React props
 */
const Form = (props) => {
  const {
    cancel,
    errors,
    submit,
    isSubmitEnabled = () => true,
    submitButtonText,
    elements,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    cancel();
  };

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="grid-100 pad-bottom">
          <button
            className="button"
            type="submit"
            disabled={!isSubmitEnabled()}
          >
            {submitButtonText}
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  cancel: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      path: PropTypes.string,
      message: PropTypes.string,
    })
  ),
  submit: PropTypes.func.isRequired,
  isSubmitEnabled: PropTypes.func,
  submitButtonText: PropTypes.string.isRequired,
  elements: PropTypes.func.isRequired,
};

export default Form;
