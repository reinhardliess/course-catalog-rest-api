import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withContext from '../Context';
import Form from './Form';

/**
 * User sign-up form component
 */
class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    passwordConfirm: '',
    errors: [],
  };

  /**
   * Handler for form input text fields
   * @param {object} event - DOM event object
   */
  change = (event) => {
    const { name, value } = event.target;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  /**
   * Called when form is submitted
   */
  submit = async () => {
    const { context, history } = this.props;
    const { firstName, lastName, emailAddress, password } = this.state;
    const user = { firstName, lastName, emailAddress, password };

    const response = await context.api.createUser(user);
    if (response === null) {
      return;
    }
    if (response.ok) {
      console.log(
        `${emailAddress} has successfully signed up and is authenticated!`
      );
      if (await context.actions.signIn(emailAddress, password)) {
        history.push('/');
      }
    } else {
      this.setState({ errors: response.errors });
    }
  };

  cancel = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/');
  };

  /**
   * Enables submit button only if password and passwordConfirm are identical
   */
  handleSubmitEnabled = () => {
    const { password, passwordConfirm } = this.state;
    return password && password === passwordConfirm;
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      passwordConfirm,
      errors,
    } = this.state;

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
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  autoFocus
                  onChange={this.change}
                  placeholder="First Name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
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

export default withContext(UserSignUp);
