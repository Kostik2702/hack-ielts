import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './ducks/auth.duck';
import appReducer from './ducks/app.duck';
import tasksReducer from './views/tasks/tasks.duck';
import vocabularyReducer from './views/vocabulary/vocabulary.duck';
import masterReducer from './views/masterVocabulary/master.duck';
import wordTranslatorReducer from './views/wordTranslator/wordTranslator.duck';
import writingWordTranslatorReducer from './views/writingWordTranslator/writingWordTranslator.duck';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  vocabulary: vocabularyReducer,
  translator: wordTranslatorReducer,
  writingTranslator: writingWordTranslatorReducer,
  master: masterReducer,
  form: formReducer,
  app: appReducer,
});

export default rootReducer;
