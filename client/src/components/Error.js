import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

export default withRouter(Error);
