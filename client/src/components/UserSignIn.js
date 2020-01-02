import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withContext from '../Context';
import Form from './Form';

/**
 * User sign-in form component
 */
class UserSignIn extends Component {
  state = {
    email: '',
    password: '',
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
    const { context, history, location } = this.props;
    const { email, password } = this.state;
    const { from } = location.state || { from: { pathname: '/' } };

    const signedIn = await context.actions.signIn(email, password);
    if (signedIn === null) {
      return;
    }
    if (signedIn) {
      history.push(from);
      console.log(`SUCCESS! ${email} is now signed in!`);
    } else {
      this.setState(() => ({
        errors: [
          {
            path: 'password',
            type: 'Authentication Error',
            message: "Your email address and/or password don't match.",
          },
        ],
      }));
    }
  };

  cancel = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/');
  };

  /**
   * Enables submit button only if email and password are filled out
   */
  handleSubmitEnabled = () => {
    const { email, password } = this.state;
    return email && password;
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            isSubmitEnabled={this.handleSubmitEnabled}
            elements={() => (
              <>
                <input
                  id="email"
                  name="email"
                  autoFocus
                  type="text"
                  value={email}
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
              </>
            )}
          />
          <p>
            Don&apos;t have a user account? <Link to="/signup">Click here</Link>{' '}
            to sign up!
          </p>
        </div>
      </div>
    );
  }
}

export default withContext(UserSignIn);
