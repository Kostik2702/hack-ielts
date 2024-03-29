import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './ducks/auth.duck';
import appReducer from './ducks/app.duck';
import tasksReducer from './views/tasks/tasks.duck';
import vocabularyReducer from './views/vocabulary/vocabulary.duck';
import masterReducer from './views/masterVocabulary/master.duck';
import wordTranslatorReducer from './views/wordTranslator/wordTranslator.duck';
import listeningExerciseReducer from './views/listeningExercise/listeningExercise.duck';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  vocabulary: vocabularyReducer,
  translator: wordTranslatorReducer,
  master: masterReducer,
  form: formReducer,
  app: appReducer,
  listeningExercise: listeningExerciseReducer,
});

export default rootReducer;
