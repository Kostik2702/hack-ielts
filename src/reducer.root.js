import { combineReducers } from 'redux';

import appReducer from './ducks/app.duck';

const rootReducer = combineReducers({
	app: appReducer,
});

export default rootReducer;