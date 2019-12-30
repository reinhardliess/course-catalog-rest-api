/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    passwordConfirm: '',
    errors: [],
  };

  change = (event) => {
    const { name, value } = event.target;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {};

  cancel = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/');
  };

  handleSubmitEnabled = () => {
    const { password, passwordConfirm } = this.state;
    return password && password === passwordConfirm;
  };

  render() {
    const { name, username, password, passwordConfirm, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            isSubmitEnabled={this.handleSubmitEnabled}
            submitButtonText="Sign Up"
            elements={() => (
              <>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  autoFocus
                  onChange={this.change}
                  placeholder="Name"
                />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.change}
                  placeholder="User Name"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={this.change}
                  placeholder="Confirm Password"
                />
              </>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}

UserSignUp.propTypes = {
  context: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
