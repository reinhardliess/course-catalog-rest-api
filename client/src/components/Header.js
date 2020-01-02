import React from 'react';
import { Link } from 'react-router-dom';
import withContext from '../Context';

const Header = ({ context }) => {
  const { authenticatedUser } = context;

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {authenticatedUser ? (
            <>
              <span>
                Welcome,{' '}
                {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}
                !
              </span>
              <Link to="/signout">Sign Out</Link>
            </>
          ) : (
            <>
              <Link className="signup" to="/signup">
                Sign Up
              </Link>
              <Link className="signin" to="/signin">
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default withContext(Header);
