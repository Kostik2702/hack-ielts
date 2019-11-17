import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Listening from '../views/tasks/listening/ListeningContainer';
import Reading from '../views/tasks/reading/ReadingContainer';
import Vocabulary from '../views/vocabulary/VocabularyContainer';
import Index from '../views/index/Index';
import WordTranslator from '../views/wordTranslator/WordTranslatorCotainer';
import NotFound from './NotFound';
// import AppliedRoute from './AppliedRoute'
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import MasterVocabularyContainer
  from '../views/masterVocabulary/MasterVocabularyContainer';
import MasterUnitContainer
  from '../views/masterVocabulary/masterUnit/MasterUnitContainer';
import ListeningExerciseContainer from '../views/listeningExercise/ListeningExerciseContainer';

export default ({ childProps }) => (
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Index} props={childProps} />
    <AuthenticatedRoute path="/reading" exact component={Reading} props={childProps} />
    <AuthenticatedRoute path="/listening" exact component={Listening} props={childProps} />
    <AuthenticatedRoute path="/vocabulary" exact component={Vocabulary} props={childProps} />
    <AuthenticatedRoute path="/master" exact component={MasterVocabularyContainer} props={childProps} />
    <AuthenticatedRoute path="/master/:unit" exact component={MasterUnitContainer} props={childProps} />
    <AuthenticatedRoute path="/translation/exercise/:unit" exact component={WordTranslator} props={childProps} />
    <AuthenticatedRoute path="/audition" exact component={ListeningExerciseContainer} props={childProps} />
    {/* <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} /> */ }
    {/* <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} /> */ }
    {/* <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} /> */ }
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
);
