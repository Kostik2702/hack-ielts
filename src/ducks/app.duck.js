import {createAction} from 'redux-actions';
import {takeEvery, select, put} from 'redux-saga/effects';
import {API} from "aws-amplify";

export const FETCH_USER_NOTES = 'FETCH_USER_NOTES';

export const fetchUserNotes = createAction(FETCH_USER_NOTES);

const initialState = {
	modalOpen: false,
	drawerOpen: false,
	popupContent: null
};

export default function appReducer(state = initialState, {type, payload}) {
	switch (type) {
		case FETCH_USER_NOTES:
			console.log('FETCH_USER_NOTES action');
			return state;
		default:
			return state;
	}
}

export function* fetchNotesSaga() {
	const tasks = yield API.get("tasks", "/writing-tasks");
	console.log('tasks', tasks);
}

export function* watchAppSagas() {
	yield takeEvery(FETCH_USER_NOTES, fetchNotesSaga);
}
