import {createAction} from 'redux-actions';
import {takeEvery, put} from 'redux-saga/effects';
import { Auth } from 'aws-amplify'

export const UPDATE_STATE = 'UPDATE_STATE';
export const HANDLE_FB_AUTH = 'HANDLE_FB_AUTH';

export const updateState = createAction(UPDATE_STATE);
export const handleFBAuth = createAction(HANDLE_FB_AUTH);

const initialState = {
	isAuthenticating: true,
	isAuthenticated: false
};

export default function authReducer(state = initialState, {type, payload}) {
	switch (type) {
		case UPDATE_STATE:
			return { ...state, ...payload };
		default:
			return state;
	}
}

export function* handleFBAuthSaga(data) {
	const { payload } = data;


	const { email, accessToken: token, expiresIn } = payload;
	const expires_at = expiresIn * 1000 + new Date().getTime();


	try {
		const user = { email };

		yield Auth.federatedSignIn(
			"facebook",
			{ token, expires_at },
			user
		);

		yield put({ type: UPDATE_STATE, payload: { isAuthenticated: true } });
	} catch (e) {
		console.log('invalid auth', e);
	}

	//
	// this.setState({ isLoading: true });
	//
	// try {
	// 	const response = await Auth.federatedSignIn(
	// 		"facebook",
	// 		{ token, expires_at },
	// 		user
	// 	);
	// 	this.setState({ isLoading: false });
	// 	this.props.onLogin(response);
	// } catch (e) {
	// 	this.setState({ isLoading: false });
	// 	this.handleError(e);
	// }

	// const tasks = yield API.get("tasks", "/writing-tasks");
	// console.log('tasks', tasks);
}


export function* watchAuthSagas() {
	yield takeEvery(HANDLE_FB_AUTH, handleFBAuthSaga);
}
