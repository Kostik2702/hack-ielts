import { combineReducers } from 'redux';

import authReducer from './ducks/auth.duck';
import tasksReducer from './views/tasks/tasks.duck';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

export default rootReducer;
