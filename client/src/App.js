/* eslint-disable react/jsx-indent */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Error from './components/Error';

import './global.css';

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signout" component={UserSignOut} />
        <Route
          path="/forbidden"
          render={() => (
            <>
              <Error heading="Forbidden">
                <p>Sorry! You're not authorized to access this page.</p>
              </Error>
            </>
          )}
        />
        <Route
          path="/error"
          render={() => (
            <>
              <Error heading="Error">
                <p>Sorry! We just encountered an unexpected error.</p>
              </Error>
            </>
          )}
        />
        {/* <Route
          render={() => (
            <>
              <Error heading="Not Found">
                <p>Sorry! We couldn't find the page you were looking for.</p>
              </Error>
            </>
          )}
        /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
