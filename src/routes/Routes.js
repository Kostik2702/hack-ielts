import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Writing from '../views/tasks/writing/WritingContainer'
import Reading from '../views/tasks/reading'
import NotFound from './NotFound'
// import AppliedRoute from './AppliedRoute'
import AuthenticatedRoute from './AuthenticatedRoute'
// import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <Redirect exact path="/" to="/reading"/>
    <AuthenticatedRoute path="/reading" exact component={ Reading } props={ childProps }/>
    <AuthenticatedRoute path="/writing" exact component={ Writing } props={ childProps }/>

    {/*<UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />*/ }
    {/*<UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />*/ }
    {/*<AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />*/ }
    { /* Finally, catch all unmatched routes */ }
    <Route component={ NotFound }/>
  </Switch>;
