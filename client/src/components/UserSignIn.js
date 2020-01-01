import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withContext from '../Context';
import Form from './Form';

class UserSignIn extends Component {
  state = {
    username: '',
    password: '',
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

  submit = async () => {
    const { context, history, location } = this.props;
    const { username, password } = this.state;
    const { from } = location.state || { from: { pathname: '/authenticated' } };

    const signedIn = await context.actions.signIn(username, password);
    if (signedIn === null) {
      return;
    }
    if (signedIn) {
      history.push(from);
      console.log(`SUCCESS! ${username} is now signed in!`);
    } else {
      this.setState(() => ({
        errors: ["Your email address and/or password don't match."],
      }));
    }
  };

  cancel = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/');
  };

  render() {
    const { username, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <>
                <input
                  id="username"
                  name="username"
                  autoFocus
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
