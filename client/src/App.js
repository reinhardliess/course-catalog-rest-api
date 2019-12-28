import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import './global.css';

const App = () => (
  <Router>
    <div>
      <Header />
    </div>
  </Router>
);

export default App;
