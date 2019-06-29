import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './ducks/auth.duck';
import appReducer from './ducks/app.duck';
import tasksReducer from './views/tasks/tasks.duck';
import vocabularyReducer from './views/vocabulary/vocabulary.duck';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  vocabulary: vocabularyReducer,
  form: formReducer,
  app: appReducer,
});

export default rootReducer;
