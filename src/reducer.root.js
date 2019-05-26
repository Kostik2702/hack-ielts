import { combineReducers } from 'redux';

import authReducer from './ducks/auth.duck';
import tasksReducer from './views/tasks/tasks.duck';

const rootReducer = combineReducers({
	app: authReducer,
	tasks: tasksReducer,
});

export default rootReducer;