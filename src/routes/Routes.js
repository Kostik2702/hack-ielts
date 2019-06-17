import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Listening from '../views/tasks/listening/ListeningContainer';
import Reading from '../views/tasks/reading/ReadingContainer';
import Vocabulary from '../views/vocabulary/VocabularyContainer';
import NotFound from './NotFound';
// import AppliedRoute from './AppliedRoute'
import AuthenticatedRoute from './AuthenticatedRoute';
// import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) => (
  <Switch>
    <Redirect exact path="/" to="/reading" />
    <AuthenticatedRoute path="/reading" exact component={Reading} props={childProps} />
    <AuthenticatedRoute path="/listening" exact component={Listening} props={childProps} />
    <AuthenticatedRoute path="/vocabulary" exact component={Vocabulary} props={childProps} />

    {/* <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} /> */ }
    {/* <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} /> */ }
    {/* <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} /> */ }
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
);
