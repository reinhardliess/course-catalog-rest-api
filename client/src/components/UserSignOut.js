/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Redirect } from 'react-router-dom';
import withContext from '../Context';

/**
 * User sign-out component
 * @param {props} props
 */
const UserSignOut = ({ context }) => {
  context.actions.signOut();
  return <Redirect to="/" />;
};

export default withContext(UserSignOut);
