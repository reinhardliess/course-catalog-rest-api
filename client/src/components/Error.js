import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

/**
 * Generic error component
 */
class Error extends Component {
  handleButton = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/');
  };

  render() {
    const { heading, children } = this.props;

    return (
      <div className="bounds">
        <h1>{heading}</h1>
        {children}
        <button
          className="button button-secondary"
          type="button"
          onClick={this.handleButton}
        >
          Home
        </button>
      </div>
    );
  }
}

Error.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(Error);
