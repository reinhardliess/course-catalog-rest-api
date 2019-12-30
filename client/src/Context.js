import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Api from './Api';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  constructor() {
    super();
    this.api = new Api();
  }

  signIn = async (username, password) => {
    const user = await this.api.getUser(username, password);
    if (user) {
      this.setState(() => ({ authenticatedUser: user }));
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  };

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      api: this.api,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    const { children } = this.props;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }
}

export const { Consumer } = Context;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
