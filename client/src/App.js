import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import UserSignUp from './components/UserSignUp';

import './global.css';

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/signup" component={UserSignUp} />
      </Switch>
    </div>
  </Router>
);

export default App;
