/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Redirect } from 'react-router-dom';
import withContext from '../Context';

const UserSignOut = ({ context }) => {
  context.actions.signOut();
  return <Redirect to="/" />;
};

export default withContext(UserSignOut);
