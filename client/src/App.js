import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseCreate from './components/CourseCreate';
import CourseUpdate from './components/CourseUpdate';
import CourseDetail from './components/CourseDetail';
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
        <Route exact path="/" component={Courses} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signout" component={UserSignOut} />
        <PrivateRoute path="/courses/create" component={CourseCreate} />
        <PrivateRoute
          path="/courses/:courseId/update"
          component={CourseUpdate}
        />
        <Route path="/courses/:courseId" component={CourseDetail} />
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
        <Route
          path="/notfound"
          render={() => (
            <>
              <Error heading="Not Found">
                <p>Sorry! We couldn't find the page you were looking for.</p>
              </Error>
            </>
          )}
        />
        <Route
          render={() => (
            <>
              <Redirect to="/notfound" />
            </>
          )}
        />
      </Switch>
    </div>
  </Router>
);

export default App;
