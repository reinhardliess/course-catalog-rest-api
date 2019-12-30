import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';

import './global.css';

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signin" component={UserSignIn} />
      </Switch>
    </div>
  </Router>
);

export default App;
