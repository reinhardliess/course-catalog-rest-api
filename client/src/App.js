import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import './global.css';

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signout" component={UserSignOut} />
      </Switch>
    </div>
  </Router>
);

export default App;
